import React from 'react';
import ReactDOM from 'react-dom/client';
import Page from './component/page/Page';
import { Provider } from 'react-redux';
import { store } from './redux/store/store';
import { ApplicationGlobalStyle } from './global/globalStyle';

const root = ReactDOM.createRoot(
    document.getElementById('root') as HTMLElement
);

root.render(
    <React.StrictMode>
         <Provider store={store} >
            <ApplicationGlobalStyle />
            <Page />
         </Provider>
    </React.StrictMode>
);

