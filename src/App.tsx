import React from 'react'
import './App.css'
import CreateAuthor from './Components/CreateAuthor'
import DisplayAuthor from './Components/DisplayAuthor'
import Header from './Components/Header';



 
  

function App() {
  
  return (
    <React.Fragment>
      <Header/>
      <CreateAuthor/>
      <DisplayAuthor />
    </React.Fragment>
  );
}

export default App
