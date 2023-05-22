import React from 'react';
import ReactDOM from 'react-dom/client';
import Page from './component/page/Page';
import { createGlobalStyle } from 'styled-components';
import { Provider } from 'react-redux';
import { store } from './redux/store/store';

const GlobalStyle = createGlobalStyle`
    body {
        margin: 0;
        padding-top: 50px;
        padding-left: 70px;
    }
`

const root = ReactDOM.createRoot(
    document.getElementById('root') as HTMLElement
);

root.render(
    <React.StrictMode>
         <Provider store={store} >
            <GlobalStyle />
            <Page />
         </Provider>
    </React.StrictMode>
);

