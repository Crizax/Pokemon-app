import React from 'react'
import { useState, useEffect } from 'react'
import PokemonCard from './PokemonCard'


const Pokemon = () => {

    const [pokemon, setPokemon] = useState([])
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState(null)
    const [search, setSearch] = useState("")

    const API  = "https://pokeapi.co/api/v2/pokemon?limit=124"


    const fetchPokemon = async () => {
        try {
            // To get the data of the current Pokemon and link to it's further details
            const response = await fetch(API)
            const data = await response.json()
           
            // To get the detailed data of each Pokemon
            const detailedPokemonData = data.results.map(async (curPokemon) => {
                const detailedResponse = await fetch(curPokemon.url)
                const detailedData = await detailedResponse.json()
                return detailedData
            })

            // To set the detailed data of each Pokemon into the state
            const detailedResponses = await Promise.all(detailedPokemonData)
            setPokemon(detailedResponses)
            setLoading(false)
            
            
        } catch (error) {
            setError(error)
            setLoading(false)
        }
    }

    //To deal with the infinite loop error of fetch funtion
    useEffect(() => {
    fetchPokemon()
    
    }, [])

    // Handling the input form
    const handleSearch = (e) => {
        setSearch(e.target.value)
    }

    // Filtering the data based on the search input
    const searchData = pokemon.filter((curPokemon) => 
    curPokemon.name.toLowerCase().includes(search.toLowerCase()))

    
    if(loading){
        return (
            <div>
                <h1>Loading.....</h1>
            </div>
        )
    }

    
    if(error){
        return (
            <div>
                <h1>Error: {error.message}</h1>
            </div>
        )
    }
    
  // Rendering the list of Pokemon cards with search functionality  - Ends here
  return (
    <section className='container'>
        <header>
            <h1 className='font-montserrat'>Lets Catch Pokémon</h1>
        </header>
        <div className="pokemon-search">
            <input type="text" value={search} placeholder='Search Pokemon' onChange={(e)=> {handleSearch(e)}}/>
        </div>
        <div>
            <ul className='cards'>
                {searchData.map((curPokemon)=> {
                    return(
                        <PokemonCard key={curPokemon.key} pokemonData = {curPokemon}/>
                    )
                })}
            </ul>
        </div>
    </section>
  )
}

export default Pokemon