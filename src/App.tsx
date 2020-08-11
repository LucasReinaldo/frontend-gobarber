import React from 'react';
import { BrowserRouter } from 'react-router-dom';

import Routes from './routes';

import Providers from './context/Providers';

import GlobalStyle from './styles/global';

const App: React.FC = () => {
  return (
    <BrowserRouter>
      <GlobalStyle />
      <Providers>
        <Routes />
      </Providers>
    </BrowserRouter>
  );
};

export default App;
