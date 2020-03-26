import React from 'react';
import { Switch, Route } from 'react-router-dom';

import InvoiceListPage from './pages/invoice/list/invoice-list';

import { GlobalStyle } from './global.styles';

const App = () => {
  
  return (
    <div>
      <GlobalStyle />
      <Switch>
        <Route exact path='/' component={InvoiceListPage} />                
      </Switch>
    </div>
  );
};

export default App
