const pool = require('../../databasePool');

class AccountPokemonTable {
    static storeAccountPokemon({ accountId, pokemonId }) {
        return new Promise((resolve, reject) => {
            pool.query(
                'INSERT INTO accountPokemon("accountId", "pokemonId") VALUES($1, $2)',
                [accountId, pokemonId],
                (error, response) => {
                    if (error) return reject(error);

                    resolve();
                }
            )
        });
    }

    static getAccountPokemons({ accountId }) {
        return new Promise((resolve, reject) => {
            pool.query(
                'SELECT "pokemonId" FROM accountPokemon WHERE "accountId" = $1',
                [accountId],
                (error, response) => {
                    if (error) return reject(error);

                    resolve({ accountPokemons: response.rows });
                }
            );
        })
    }

    static getPokemonAccount({ pokemonId }) {
        return new Promise((resolve, reject) => {
            pool.query('SELECT "accountId" FROM accountPokemon WHERE "pokemonId" = $1',
                [pokemonId],
                (error, response) => {
                    if (error) return reject(error);

                    resolve({ accountId: response.rows[0].accountId });
                })
        });
    }

    static updatePokemonAccount({ accountId, pokemonId }) {
        return new Promise((resolve, reject) => {
            pool.query('UPDATE accountPokemon SET "accountId" = $1  WHERE "pokemonId" = $2',
                [accountId, pokemonId],
                (error, response) => {
                    if (error) return reject(error);
                    resolve();
                })
        });
    }
}



module.exports = AccountPokemonTable;

