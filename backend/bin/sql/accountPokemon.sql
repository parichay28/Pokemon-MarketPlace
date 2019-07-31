CREATE TABLE accountPokemon(
    "accountId" INTEGER REFERENCES account(id),
    "pokemonId" INTEGER REFERENCES pokemon(id),
    PRIMARY KEY ("accountId", "pokemonId")
);