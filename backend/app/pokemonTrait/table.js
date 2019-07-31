const pool = require('../../databasePool.js');
const traitTable = require('../trait/table.js')

class PokemonTraitTable {
    static storePokemonTrait({ pokemonId, traitType, traitValue }) {
        return new Promise((resolve, reject) => {
            traitTable.getTraitId({ traitType, traitValue })
                .then(({ traitId }) => {
                    pool.query(
                        'INSERT INTO pokemonTrait("traitId","pokemonId") VALUES($1, $2)',
                        [traitId, pokemonId],
                        (error, response) => {
                            if (error) return reject(error);

                            resolve();
                        }
                    )
                });
        });
    }
}

module.exports = PokemonTraitTable;