import React from 'react';
import { BrowserRouter } from 'react-router-dom'

//Views
import NoAuth from './views/Not Auth/NotAuth';
import Main from './views/Main/Main';

const loggedIn: boolean = false;

function App() {
  return (
    <BrowserRouter>
      {loggedIn ?
        <Main />
        :
        <NoAuth />
      }  
    </BrowserRouter>
  );
}

export default App;
