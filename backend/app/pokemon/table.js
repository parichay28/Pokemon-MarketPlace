const pool = require('../../databasePool.js');
const PokemonTraitTable = require('../pokemonTrait/table.js')
class PokemonTable {
    static storePokemon(pokemon) {
        const { birthdate, nickname, generationId, isPublic, saleValue,sireValue } = pokemon;

        return new Promise((resolve, reject) => {
            pool.query(
                'INSERT INTO pokemon(birthdate, nickname, "generationId", "isPublic", "saleValue", "sireValue") VALUES($1, $2, $3, $4, $5, $6) RETURNING id',
                [birthdate, nickname, generationId, isPublic, saleValue, sireValue],
                (error, response) => {
                    if (error) return reject(error);

                    const pokemonId = response.rows[0].id;


                    Promise.all(pokemon.traits.map(({ traitType, traitValue }) => {
                        return PokemonTraitTable.storePokemonTrait({
                            pokemonId, traitType, traitValue
                        });
                    }))
                        .then(() => resolve({ pokemonId }))
                        .catch(error => reject(error));

                }
            )
        });
    }

    static getPokemon({ pokemonId }) {
        return new Promise((resolve, reject) => {
            pool.query(
                'SELECT birthdate, nickname, "generationId", "isPublic", "saleValue", "sireValue" FROM pokemon WHERE pokemon.id = $1',
                [pokemonId],
                (error, response) => {
                    if (error) return reject(error);
                    if (response.rows.length === 0) return reject(new Error('No Pokemon'))
                    resolve(response.rows[0]);
                }
            )
        })
    }

    static updatePokemon({pokemonId, nickname, isPublic, saleValue, sireValue}){
        const settingMap = {nickname, isPublic, saleValue, sireValue};

        const validQueries = Object.entries(settingMap).filter(([settingKey, settingValue]) => {
            //console.log('settingKey',settingKey, 'settingValue', settingValue);


            if(settingValue !== undefined){
                return new Promise((resolve, reject) => {
                    pool.query(
                        `UPDATE pokemon SET "${settingKey}" = $1 WHERE id =$2`,
                        [settingValue, pokemonId],
                        (error, response) => {
                            if(error) return reject(error);
            
                            resolve();
                        }
                    )
                });
            }
        });
        
        return Promise.all(validQueries);

        // return new Promise((resolve, reject) => {
        //     pool.query(
        //         'UPDATE pokemon SET nickname = $1, "isPublic" = $2, "saleValue" = $3 WHERE id=$4',
        //         [nickname, isPublic, saleValue, pokemonId],
        //         (error, response) => {
        //             if(error) return reject(error);

        //             resolve();
        //         }
        //     )
        // })
    }
}


PokemonTable.getPokemon({pokemonId: 1, nickname: 'g'})
.then(() => console.log('success'))
.catch(error => console.error('error', error));


module.exports = PokemonTable;