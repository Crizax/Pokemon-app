import React from 'react'

const PokemonCard = ({pokemonData}) => {
  return (
    <li className='pokemon-card'>
        <figure>
            <img src={pokemonData.sprites.other.dream_world.front_default} alt={pokemonData.name} className='pokemon-image' />
        </figure>
        <h1 className='pokemon-name font-montserrat'>{pokemonData.name}</h1>
        <div className='pokemon-info pokemon-highlight'>
            <p >
                {pokemonData.types.map((curType)=> curType.type.name).join("", "")}
            </p>
        </div>

        <div className="grid-three-cols">
            <p className='pokemon-info ability'>
                <span>Height: </span>{pokemonData.height}
            </p>
            <p className='pokemon-info ability'>
                <span>Weight:</span>{pokemonData.weight}
            </p>
            <p className='pokemon-info ability'>
                <span>Speed:</span>{pokemonData.stats[5].base_stat}
            </p>
        </div>

        <div className="grid-three-cols">
            <p className='pokemon-info ability'>

                <span>Experience: </span>
                {pokemonData.base_experience} 
            </p>
            <p className='pokemon-info ability'>
                
                <span>Attack: </span>
                {pokemonData.weight}
            </p>
            <p className='pokemon-info ability'>
                
                <span>Ability:</span>
                {pokemonData.abilities.map((abilityInfo) => abilityInfo.ability.name).slice(0,1).join("","")}
            </p>
        </div>

    </li>
  )
}

export default PokemonCard