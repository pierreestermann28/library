import React from 'react'
import './App.css'
import Header from './Components/Header'
import Authors from './pages/Authors'
import {Switch, Route} from 'react-router-dom'
import Home from './pages/Home'
import Login from './Components/Login'

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
        <Route path="/login">
          <Login/>
        </Route>
      </Switch>
    </div>
  );
}

export default App
