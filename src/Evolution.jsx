import { animated } from '@react-spring/web'
import { useFadeIn, useWiggle, useFadeInOut } from './utils/animations.jsx'
import { capitalize } from './utils/utils.jsx'
import { useFetchEvolutionChain } from './utils/hooks/useFetchEvolutionChain.jsx'
import loadingImage from './assets/pokeball.png'
import errorImage from './assets/error.png'

export default function Evolution({pokemon, onPokemonClick}){

    const { evolutionChain, isLoading, error } = useFetchEvolutionChain(pokemon);
    
    const fadeIn = useFadeIn();

    const wiggle = useWiggle()

    const fadeInOut = useFadeInOut()

    if (isLoading || !pokemon){
        return(
            <animated.div style={fadeIn} className='flex flex-col items-center justify-center h-48 gap-4 px-8 pt-5 lg:px-26 lg:h-58'>
                <animated.img style={wiggle} className='w-12' src={loadingImage} alt='loading'/>
                <animated.p style={fadeInOut}>Loading data...</animated.p>
            </animated.div>
        ) 
    }

    if (error){
        return(
            <div className='flex flex-col items-center justify-center w-full m-2 lg:w-64'>
                <img className='w-24 h-24 lg:w-40 lg:h-40' src={errorImage} alt='error'/>
                <p className='font-bold text-red-500 lg:text-2xl'>Error fetching data</p>
                <p className='lg:text-2xl'>The page crash!</p>
            </div>
        )
    }

    return(
        <animated.div style={fadeIn} className='flex flex-row items-end justify-around h-48 gap-4 px-8 pb-10 lg:px-26 lg:h-58'>
            {evolutionChain.map((pokemon)=>(
                <div key={pokemon.name} onClick={() => onPokemonClick(pokemon.id)}>
                    <img style={{width: '8rem'}} src={pokemon.sprites.other['official-artwork'].front_default}/>
                    <p className='text-center text-black'>{capitalize(pokemon.name)}</p>
                </div>
            ))}
        </animated.div>
    );
}