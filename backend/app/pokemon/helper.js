const pool = require('../../databasePool.js');
const PokemonTable = require('./table.js');
const Pokemon = require('./index.js');

const getPokemonWithTraits = ({ pokemonId }) => {
    return Promise.all([
        PokemonTable.getPokemon({ pokemonId }),
        new Promise((resolve, reject) => {
            pool.query(
                `SELECT "traitType", "traitValue" 
                FROM trait 
                INNER JOIN pokemonTrait ON  trait.id = pokemonTrait."traitId" 
                WHERE pokemonTrait."pokemonId" = $1`,
                [pokemonId],
                (error, response) => {
                    if (error) return reject(error);

                    resolve(response.rows);

                }
            )
        })
    ])
        .then(([pokemon, pokemonTraits]) => {
            return new Pokemon({
                ...pokemon, pokemonId, traits: pokemonTraits
            })
        })
        .catch(error => console.error(error));

};

const getPublicPokemons = () => {
    return new Promise((resolve, reject) => {
        pool.query(
            'SELECT id from pokemon WHERE "isPublic" = TRUE',
            (error, response) => {
                if (error) return reject(error)

                const publicPokemonRows = response.rows;

                Promise.all(
                    publicPokemonRows.map(
                        ({ id }) => 
                            getPokemonWithTraits({ pokemonId: id })
                        )
                )
                .then(pokemons => resolve({ pokemons}))
                .catch(error => reject(error));
            }
        )
    })
}
/*

getPokemonWithTraits({pokemonId: 1})
.then(pokemon => console.log('pokemon', pokemon))
.catch(error => console.error('error', error));

*/

// getPublicPokemons()
// .then(({pokemons}) => console.log('pokemon', pokemons))
// .catch(error => console.error('error', error));


module.exports = { getPokemonWithTraits, getPublicPokemons };