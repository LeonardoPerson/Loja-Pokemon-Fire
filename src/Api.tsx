import {useEffect, useState} from 'react'
import {Poke} from './layout/main/Loja'

//Aqui temos o controle da quantidade de pokemon a ser retornada
const numeroTotalPokemon: string = "900";
//URL responsável pela busca de pokémon
const baseURL = `https://pokeapi.co/api/v2/pokemon/?limit=${numeroTotalPokemon}`;
//Define o tipo de pokémon, pode ser alterado para outros tipos e o retorno ocorrerá normalmente
const tipoPokemon = "fire";

//função responsável pela busca de pokémon
const Api = () => {
  const listaAuxiliar: Array<Poke> = []
  const [pokemon, setPokemon] = useState<Array<Poke>>(listaAuxiliar) 
 
  useEffect(() => {
    fetch(baseURL)
        .then((response) => response.json())
        .then((data) => data.results.map((item: Response) => {
            fetch(item.url)
            .then((response) => response.json())
            .then((allpokemon) => {                    
                if(allpokemon.types[0].type.name === tipoPokemon){                 
                listaAuxiliar.push(allpokemon);  
                }       
            }).catch(err => err.text)                            
            setPokemon(listaAuxiliar)        
                             
        })
        );           
  }, []);  

  return [pokemon]

}

export default Api



   




