const { Router } = require('express');
const { authenticatedAccount } = require('./helper')
const AccountPokemonTable = require('../accountPokemon/table');
const router = new Router();
const PokemonTable = require('../pokemon/table.js');
const { getPokemonWithTraits, getPublicPokemons } = require('../pokemon/helper');
const AccountTable = require('../account/table');
const Breeder = require('../pokemon/breeder');


router.get('/new', (req, res, next) => {
    let accountId, pokemon;
    authenticatedAccount({ sessionString: req.cookies.sessionString })
        .then(({ account }) => {
            accountId = account.id;
            pokemon = req.app.locals.engine.generation.newPokemon({accountId});
            return PokemonTable.storePokemon(pokemon)
        })
        .then(({ pokemonId }) => {
            pokemon.pokemonId = pokemonId;
            return AccountPokemonTable.storeAccountPokemon({ accountId, pokemonId });
        })
        .then(() => res.json({ pokemon }))
        .catch((error) => next(error));

});

router.put('/update', (req, res, next) => {
    const { pokemonId, nickname, isPublic, saleValue, sireValue } = req.body;

    PokemonTable.updatePokemon({ pokemonId, nickname, isPublic, saleValue, sireValue })
        .then(() => res.json({ message: 'Successfully updated pokemon' }))
        .catch(error => next(error));
});


router.get('/public-pokemons', (req, res, next) => {
    getPublicPokemons()
        .then(({ pokemons }) => res.json({ pokemons }))
        .catch(error => next(error));
});

router.post('/buy', (req, res, next) => {
    const { pokemonId, saleValue } = req.body;
    let buyerId;
    PokemonTable.getPokemon({ pokemonId })
        .then(pokemon => {
            if (pokemon.saleValue !== saleValue) {
                throw new Error('Sale value is not correct');
            }

            if (!pokemon.isPublic) {
                throw new Error('Pokemon must be public');
            }

            return authenticatedAccount({ sessionString: req.cookies.sessionString });
        })
        .then(({ account, authenticated }) => {
            if (!authenticated) {
                throw new Error('Unauthenticated');
            }

            if (saleValue > account.balance) {
                throw new Error('Sale value exceeds balance');
            }

            buyerId = account.id;
            return AccountPokemonTable.getPokemonAccount({ pokemonId })
                ;
        })
        .then(({ accountId }) => {
            if (accountId === buyerId) {
                throw new Error('Cannot but your own Pokemon');
            }

            const sellerId = accountId;

            return Promise.all([
                AccountTable.updateBalance({
                    accountId: buyerId, value: -saleValue
                }),
                AccountTable.updateBalance({
                    accountId: sellerId, value: saleValue
                }),
                AccountPokemonTable.updatePokemonAccount({ accountId: buyerId, pokemonId }),

                PokemonTable.updatePokemon({ pokemonId, isPublic: false })
            ])
        })
        .then(() => res.json({ message: 'success' }))
        .catch(error => next(error));
});

router.post('/mate', (req, res, next) => {

    // matronPokemon is the requester pokemon(private)
    // patronPokemon is the requested pokemon for mating(public)
    const { matronPokemonId, patronPokemonId } = req.body;
    if (matronPokemonId === patronPokemonId) {
        throw new Error('Cannot breed with the same pokemon');
    }

    let matronPokemon, patronPokemon, patronSireValue;
    let matronAccountId, patronAccountId;

    getPokemonWithTraits({ pokemonId: patronPokemonId })
        .then(pokemon => {
            if (!pokemon.isPublic) {
                throw new Error('Pokemon must be public');
            }
            patronPokemon = pokemon;
            patronSireValue = pokemon.sireValue;

            console.log('here pokemon: ', pokemon);
            console.log('sire value: ', patronSireValue);
            return getPokemonWithTraits({ pokemonId: matronPokemonId })
        })
        .then(pokemon => {
            matronPokemon = pokemon;

            console.log('Private Pokemon ID: ', matronPokemon);


            return authenticatedAccount({ sessionString: req.cookies.sessionString })
        })
        .then(({account, authenticated, username}) => {
            console.log('Private Pokemon Acccount: ', account);
            console.log('Private Pokemon Acccount Username: ', username);
            console.log('Private Pokemon Acccount Authenticated: ', authenticated);


            if (!authenticated) {
                throw new Error('Unauthenticated');
            }

            if (patronSireValue > account.balance) {
                throw new Error('Sire value exceeds balance');
            }

            matronAccountId = account.id;

            return AccountPokemonTable.getPokemonAccount({ pokemonId: patronPokemonId })
        })
        .then(({ accountId }) => {
            patronAccountId = accountId;

            if (matronAccountId === patronAccountId) {
                throw new Error('Cannot breed your own pokemons');
            }

            const pokemon = Breeder.breedPokemon({ matron: matronPokemon, patron: patronPokemon })

            return PokemonTable.storePokemon(pokemon);
        })
        .then(({ pokemonId }) => {
            Promise.all([
                AccountTable.updateBalance({
                    accountId: matronAccountId,
                    value: -patronSireValue
                }),

                AccountTable.updateBalance({
                    accountId: patronAccountId,
                    value: patronSireValue
                }),

                AccountPokemonTable.storeAccountPokemon({
                    accountId: matronAccountId,
                    pokemonId
                })

            ])

        })
        .then(() => res.json({ message: 'success' }))
        .catch(error => next(error));
});


module.exports = router;