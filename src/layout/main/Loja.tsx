import React, {useState, useEffect, ChangeEvent} from 'react';
import Product from './Product';
import Api from '../../Api';

///////////////////////////////////////////////////////////////////////////////

//Especificando o tipo do array de pokémon na função Loja,
//conforme exigência do typescript
export interface Poke {
    id: string;
    name: string;
    price: number;
    sprites: {
        front_default: string;
    }
    types: [{
            type: {
                name: string;
            }    
    }]
}

//////////////////////////////////////////////////////////////////////////////// 
const Loja = () => {   
    //Abastecimento da loja com produtos/pokémon
    const [pokemon] = Api();
    //Autoriza a exibição de pokémon na tela
    const [loadingApi, setloadingApi] = useState(true); 
    //Valor digitado no campo de busca
    const [searchTerm, setSearchTerm] = useState(""); 
    //Recebe também o array inicial mas tem a condição de somente apresentar na tela o que for digitado na busca
    const [searchResults, setSearchResults] = useState<Array<Poke>>([]); 
    //Array utilizado no carrinho de compras
    const [cart, setCart] = useState<Array<Poke>>([]);  
    //Flag que informa se o botão para finalizar foi clicado
    const [final, setFinal] = useState(false);
    //Variável auxiliar para armazenar inicialmente o array da Api  

    useEffect(()=>{
        setTimeout(() => {
            setSearchResults(pokemon)
            setloadingApi(false);
        }, 5000);        
    }, [])   

    //Capturando a palavra digitada no campo de busca e armazenado-a em searchTerm
    const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
        setSearchTerm(event.target.value);        
    }

    //Atualização de pokemon a cada valor de searchTerm, que é a palavra digitada
    useEffect(() => {        
        const results = pokemon.filter((item) =>
            item.name.toLowerCase().includes(searchTerm.trim().toLowerCase()));        
          if(results){
            setSearchResults(results);
          }                                                 
    }, [searchTerm])
   
    //Adicionando o pokemon ao carrinho conforme onClick "Adicionar ao carrinho"
    const addToCart = (index: number) => {
        setFinal(false);      
        setCart(cart.concat(searchResults[index]));        
      }

    //Removendo elementos do carrinho
    const removeToCart = (index: number) => {     
        cart.splice(index, 1)     
        setCart(cart.slice(0));        
    }

    //Função para indicar a finalização da compra zerando o carrinho e exibindo a mensagem de agradecimento
    const finalizaCompra = () => {  
        if(cart.length === 0){ //carro sem elementos
            setFinal(false); 
        }else{                 //carro com elementos
            const limpaCarro: Array<Poke> = [];
            setCart(limpaCarro);
            setFinal(true); //Autoriza exibição de frase de agradecimento
        }       
    }   

      //Calculando o valor total no carrinho
    const calculatePrice = () => {
        return cart.reduce((price, product) => price + product.price, 0);
    }
       
    //---------------------------------------------------------------------
    return (
        <div className="main-tela"> 
        {/*Campo de busca------------------------------------------------------------------------*/}
            
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
            
            {/*Produtos------------------------------------------------------------------------------*/}
            <div className="main-pokemon">
                <div className="pokemons">
                {
                    loadingApi? <div className="pokemon-carregando">Procurando pokémon ...</div> : 
                    searchResults.map((product, index) => (                        
                        <div className="lista-compras" key={index}>                        
                            <Product product={product} key={index} >
                                <button className="button" onClick={() => addToCart(index)}>ADICIONAR AO CARRINHO</button>
                            </Product>
                        </div> 
                        ))                                           
                }     
                </div>              
            </div>  
           

             {/*Carrinho ------------------------------------------------------------------------------------*/}
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

export default Loja;