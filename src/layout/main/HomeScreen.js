import React, {useState, useEffect} from 'react';
import {baseURL} from '../../Api';
import Product from './Product';
//------------------------------------------------------------------------
//Define o tipo de pokémon, pode ser alterado para outros tipos
//e o retorno ocorrerá normalmente
const tipoPokemon = "fire";
//------------------------------------------------------------------------  
function HomeScreen(){          
    //recebe o array inicial
    const [pokemon, setPokemon] = useState([]); 
    //Autoriza a exibição de pokémon na tela
    const [loadingApi, setloadingApi] = useState(true); 
    //Valor digitado no campo de busca
    const [searchTerm, setSearchTerm] = useState(""); 
    //recebe também o array inicial mas tem a condição de somente apresentar na tela o que for digitado na busca
    const [searchResults, setSearchResults] = useState([]); 
    //Array utilizado no carrinho de compras para adicionar, somar e iterar os itens de compra
    const [cart, setCart] = useState([]);  
    //Flag que informa se o botão para finalizar foi clicado
    const [final, setFinal] = useState(false);
    //Variável auxiliar para armazenar inicialmente o array da Api
    const listaAuxiliar = [];    
    
    //Extraindo a baseURL da api e armazenando em variáveis
    useEffect(() => {
        fetch(baseURL)
            .then((response) => response.json())
            .then((data) => data.results.map((item) => {
                fetch(item.url)
                .then((response) => response.json())
                .then((allpokemon) => {    
                    if(allpokemon.types[0].type.name === tipoPokemon){                  
                    listaAuxiliar.push(allpokemon);  
                    }       
                });                               
                setPokemon(listaAuxiliar);  
                setSearchResults(listaAuxiliar);  
                setTimeout(() => {
                    setloadingApi(false);
                    }, 5000);                 
            })
            );           
    }, []);  

    //Capturando a palavra digitada no campo de busca e armazenado-a em searchTerm
    const handleChange = event => {
        setSearchTerm(event.target.value);        
    };

    //Atualização de pokemon a cada valor de searchTerm, que é a palavra digitada
    useEffect(() => {        
        const results = pokemon.filter(item => 
            item.name.toLowerCase().includes(searchTerm.trim().toLowerCase()));        
          if(results){
            setSearchResults(results);
          }                                                 
    }, [searchTerm])    
   
    //Adicionando o pokemon ao carrinho conforme onClick "Adicionar ao carrinho"
    const addToCart = index => {
        setFinal(false);      
        setCart(cart.concat(searchResults[index]));        
      }; 

    //Removendo elementos do carrinho
    const removeToCart = index => {     
        cart.splice(index, 1)     
        setCart(cart.slice(0));        
    }

    //Função para indicar a finalização da compra zerando o carrinho e exibindo a mensagem de agradecimento
    const finalizaCompra = () => {  
        if(cart.length === 0){ //carro sem elementos
            setFinal(false); 
        }else{                 //carro com elementos
            const limpaCarro = [];
            setCart(limpaCarro);
            setFinal(true); //Autoriza exibição de frase de agradecimento
        }       
    }   

      //Calculando o valor total no carrinho
    const calculatePrice = () => {
        return cart.reduce((price, product) => price + product.price, 0);
    };   
       
    //---------------------------------------------------------------------
    return (
        <div className="main-tela"> 
        {/*Campo de busca-------------------------------------------------*/}
            <div className="main-search">
                <form className="search">
                    <input                    
                        className="search-input" 
                        placeholder="Digite o nome do Pokémon aqui"
                        value={searchTerm}
                        onChange={handleChange}
                        type="search" 
                        />                    
                </form>        
            </div> 

            {/*Renderização de produtos pokémon conforme importação de Product-------------------------------------------------*/}
            <div className="main-pokemon">
                <div className="pokemons">
                {
                    loadingApi? <div className="pokemon-carregando">Procurando pokémon {tipoPokemon} ...</div> : 
                    searchResults.map((product, index) => (                        
                        <div className="lista-compras" key={product.name}>                        
                            <Product product={product} key={index} >
                                <button className="button" onClick={() => addToCart(index)}>ADICIONAR AO CARRINHO</button>
                            </Product>
                        </div> 
                        ))                                           
                }     
                </div>              
            </div> 

             {/*Renderização do carrinho conforme importação do Product -------------------------------------------------*/}
            <div className="main-carrinho">
                <h3 className="titulo-carrinho">CARRINHO</h3>                   
                <div className="total">Total: R${calculatePrice()}</div>                    
                    {final ? <div  className="agradecimento">OBRIGADO POR COMPRAR CONOSCO!</div>:                       
                        cart.map((product, index) => (
                        <Product product={product} key={index} >
                            <button className="button" onClick={() => removeToCart(index)}>REMOVER</button>                    
                        </Product>
                        )) 
                    } 
                <div className="button-finalizar"> 
                    <button className="button" onClick={()=>finalizaCompra()}>FINALIZAR COMPRA</button>  
                </div>                    
            </div>                    
        </div>
    )
}

export default HomeScreen;