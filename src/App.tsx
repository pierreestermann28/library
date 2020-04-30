import React from 'react'
import './App.css'
import Header from './Components/Header'
import Authors from './pages/Authors'
import {Switch, Route} from 'react-router-dom'
import Home from './pages/Home'

function App() {
  
  return (
    <div>
      <Header/>
      <Switch>
        <Route exact path="/">
          <Home/>
        </Route>
        <Route path="/authors">
          <Authors/>
        </Route>
      </Switch>
    </div>
  );
}

export default App
