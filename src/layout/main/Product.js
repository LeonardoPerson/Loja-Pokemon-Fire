import React from 'react';
//Definindo um valor para o preço de cada pokémon 
//pois o array oriundo da Api não tem essa informação
const price = 75;

//Função que renderiza o conjunto de pokémon na tela, assim como os itens do carrinho
const Product = props => {
    const { product, children } = props;
    return (                  
        <div className="pokemon">            
            <img className="pokemon-image" src={product.sprites.front_default} alt={product.name}/>                                                     
            <div className="pokemon-brand">Nome: {product.name}</div>
            <div className="pokemon-brand">Id: {product.id}</div> 
            <div className="pokemon-brand">Tipo: {product.types[0].type.name}</div> 
            <div className="pokemon-price">R${product.price = price}</div>
            {children}
        </div>                  
    );
  };

  export default Product;