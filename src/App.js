import React from 'react';
import Header from './layout/header';
import Main from './layout/main/Main';
import Footer from './layout/footer';

function App() {
  return (       
        <div className="grid-container">
            <Header />                      
            <Main />             
            <Footer />
        </div>     
    
  );

}

export default App;
