import React from 'react';
import { BrowserRouter } from 'react-router-dom'
import { useSelector } from 'react-redux';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { RootState } from './store';
//Views
import NoAuth from './views/Not Auth/NotAuth';
import Main from './views/Main/Main';

function App() {

  const { user } = useSelector((state: RootState) => state.auth)

  const loggedIn: boolean = !!user;

  return (
    <BrowserRouter>
      <ToastContainer />

      {loggedIn ?
        <Main />
        :
        <NoAuth />
      }  
    </BrowserRouter>
  );
}

export default App;
