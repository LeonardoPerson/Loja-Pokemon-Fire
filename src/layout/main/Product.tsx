import React from 'react';
import {Poke} from './Loja';
//Definindo um valor para o preço de cada pokémon 
//pois o array oriundo da Api não tem essa informação
const price = 75;

//Função que renderiza o conjunto de pokémon na tela, assim como os itens do carrinho
const Product = (props: { product: Poke; children: any; }) => {
    const { product, children } = props;
    let image = product.sprites.front_default;
    let imageAlt = product.name;
    if(!image){
        image = 'https://assets.pokemon.com/assets/cms2-pt-br/img/misc/gus/buttons/logo-pokemon-79x45.png'
        imageAlt = 'Imagem real não disponível';
    }
    
    return (                  
        <div className="pokemon">            
            <img className="pokemon-image" src={image} alt={product.name}/>                                                     
            <div className="pokemon-brand">Nome: {product.name}</div>
            <div className="pokemon-brand">Id: {product.id}</div> 
            <div className="pokemon-brand">Tipo: {product.types[0].type.name}</div> 
            <div className="pokemon-price">R${product.price = price}</div>
            {children}
        </div>                  
    );
  };

  export default Product;