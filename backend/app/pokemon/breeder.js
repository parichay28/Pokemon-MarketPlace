const Pokemon = require('./index');
const base64 = require('base-64');
class Breeder {

    //Two incoming traits: matronTrait and patronTrait

    /*
    Both matron and patron trait values are encoded
    Both matron and patron encoded trait characters are summed up
    Then this summed value is used to get the range
    Then a random number is obtained in the range
    If the number is less than the matron's encoded trait character sum then pick matron's trait or else pick patron trait
    */

    
    static pickTrait({ matronTrait, patronTrait }) {

        if(matronTrait === patronTrait) return matronTrait;

        const matronTraitCharSum = Breeder.charSum(base64.encode(matronTrait));
        const patronTraitCharSum = Breeder.charSum(base64.encode(patronTrait));

        const randNum = Math.floor(Math.random() * (matronTraitCharSum + patronTraitCharSum))

        return randNum < matronTraitCharSum ? matronTrait: patronTrait;


    }
    static breedPokemon({ matron, patron }) {
        const matronTraits = matron.traits;
        const patronTraits = patron.traits;

        const babyTraits = [];

        matronTraits.forEach(({ traitType, traitValue }) => {
            const matronTrait = traitValue;

            const patronTrait = patronTraits.find(
                trait => {
                    return trait.traitType === traitType
                }).traitValue;

            babyTraits.push({
                traitType,
                traitValue: Breeder.pickTrait({ matronTrait, patronTrait })
            });
        });
        return new Pokemon({ nickname: 'unnamed baby', traits: babyTraits })
    }

    static charSum(string){
        return string.split('').reduce((sum, character) => sum += character.charCodeAt(), 0);
    }
}
const matron = new Pokemon();
const patron = new Pokemon();

const baby = Breeder.breedPokemon({matron, patron});

console.log('matron', matron);
console.log('patron', patron);
console.log('baby', baby);


module.exports = Breeder;