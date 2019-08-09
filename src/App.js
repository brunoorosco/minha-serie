import React     from   'react';
import Header     from './Header';
import Generos    from './Generos';
import EditarGenero    from './EditarGenero';
import Serie      from './Serie';
import NovoGenero from './NovoGenero';
import NovaSerie from  './NovaSerie';
import InfoSerie  from './InfoSerie';

import {
    BrowserRouter as Router,
    Route,
    Switch 
} from 'react-router-dom'


const Home = () =>{
  return (
            <div className='container'>   
                <h1>Home</h1>
            </div>
  )
}
  

function App() {
  
  return (
    <Router>
        <div>
            <Header />
              <Switch>
                <Route path='/' exact component={Home}/>
                <Route path='/genero' exact component={Generos}/>
                <Route path='/genero/novo' exact component={NovoGenero}/>
                <Route path='/genero/:id' exact component={EditarGenero}/>
                <Route path='/series' exact component={Serie}/>
                <Route path='/series/novo' exact component={NovaSerie}/>
                <Route path='/series/:id' exact component={InfoSerie}/>
              </Switch>
        </div>
    </Router>
  )
}

export default App;
