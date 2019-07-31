import React, { Component } from 'react';
import { skinny, patchy, slender, plain, sporty, spotty, stocky, striped } from '../../assets';

const propertyMap = {
    bgColor: {
        black: '#263238',
        white: '#cfd8dc',
        green: '#a5d6a7',
        blue: '#0277bd'
    },
    build: { slender, stocky, sporty, skinny },
    pattern: { patchy, plain, spotty, striped },
    size: { small: 80, medium: 120, large: 160, gigantic: 200 }
};

class PokemonAvatar extends Component {

    get PokemonImage() {
        const pokemonPropertyMap = {};

        this.props.pokemon.traits.forEach(trait => {
            const { traitType, traitValue } = trait;
            pokemonPropertyMap[traitType] = propertyMap[traitType][traitValue];
        })

        const { bgColor, build, pattern, size } = pokemonPropertyMap;
        const sizing = { width: size, height: size };
        return (
            <div className='pokemon-avatar-image-wrapper'>
                <div className='pokemon-avatar-image-background' style={{ backgroundColor: bgColor, width: sizing.width, height: sizing.height }}></div>
                <img className='pokemon-avatar-image-pattern' src={pattern} style={{ width: sizing.width, height: sizing.height }} />
                <img className='pokemon-avatar-image' src={build} style={{ width: sizing.width, height: sizing.height }} />


            </div>
        );
    }
    render() {
        const { generationId, pokemonId, traits } = this.props.pokemon;
        //console.log(this.props.pokemon);
        if (!pokemonId) {
            return <div></div>
        }
        return (


            <div>
                <span>GID: {generationId}.</span>
                <span>PID: {pokemonId}.</span>
                {traits.map(trait => trait.traitValue).join(', ')}
                {this.PokemonImage}
            </div>
        )
    }

}

export default PokemonAvatar;