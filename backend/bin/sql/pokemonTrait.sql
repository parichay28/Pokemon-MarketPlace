CREATE TABLE pokemonTrait (
    "traitId" INTEGER,
    "pokemonId" INTEGER,
    FOREIGN KEY ("traitId") REFERENCES trait(id),
    FOREIGN KEY ("pokemonId") REFERENCES pokemon(id)
);