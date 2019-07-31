const { REFRESH_RATE, SECONDS } = require('../config.js');
const Pokemon = require('../pokemon/index.js')

const refreshRate = REFRESH_RATE * SECONDS;

class Generation {
    constructor() {
        this.accountIds = new Set();
        this.expiration = this.calculateExpiration();
        this.generationId = undefined;
    }

    calculateExpiration(){
        const expirationPeriod = Math.floor(Math.random() * (refreshRate / 2));
        const msUntilExpiration = Math.random() < 0.5 ?
            refreshRate - expirationPeriod :
            refreshRate + expirationPeriod;

        return new Date(Date.now() + msUntilExpiration);

    }

    newPokemon({accountId }){
        if(Date.now()>this.expiration){
            throw new Error('This generation has expired on'+this.expiration);
        }
        if(this.accountIds.has(accountId)){
            throw new Error('You already have a pokemon from this generation');
        }
        this.accountIds.add(accountId)
        return new Pokemon({ generationId: this.generationId });
    }
}

module.exports = Generation;