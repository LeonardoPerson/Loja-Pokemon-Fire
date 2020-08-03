import React from 'react';
import {Switch, Route} from 'react-router-dom';
import HomeScreen from './HomeScreen';

function Main(){
    return (         
            <main className="main">                
                    {/*Compomente Routes contém as telas HomeScreen e ProductScreen*/}
                <Switch>
                    <Route path="/" exact={true} component={HomeScreen} /> 
                </Switch>                                
            </main>  
    )
}

export default Main