#!/bin/bash

# change the following fields according to your environment
# 1. PGPASSWORD
# 2. Replace 'username' with your own psql username
# 3. Replace 'database' with your own database name

export PGPASSWORD='password'
echo "configuring pokemon database"

dropdb -U username database
createdb -U username database

psql -U username database < ./bin/sql/account.sql
psql -U username database < ./bin/sql/generation.sql
psql -U username database < ./bin/sql/pokemon.sql
psql -U username database < ./bin/sql/trait.sql
psql -U username database < ./bin/sql/pokemonTrait.sql
psql -U username database < ./bin/sql/accountPokemon.sql

node ./bin/insertTraits.js


echo "pokemon database configured"
