
import React from 'react'
import { BrowserRouter } from 'react-router-dom'
import URL from '../../URL/url'
import store from '../../redux/store';
import { Provider } from 'react-redux';

function App(){
  return(
    <Provider store={store}>
      <BrowserRouter>
        <URL/>
      </BrowserRouter>
    </Provider>
    
  )
}

export default App;
