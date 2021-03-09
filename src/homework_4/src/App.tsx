import React, { FC, memo } from 'react';
import { StylesProvider } from '@material-ui/core/styles';

import Routes from './routes';
import { GlobalStyle } from './utils/globalStyle';

const App: FC = () => (
  <StylesProvider injectFirst>
    <>
      <GlobalStyle />
      <Routes />
    </>
  </StylesProvider>
);

export default memo(App);
