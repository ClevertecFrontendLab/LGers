import React from 'react';
import { App } from './App';
import { createRoot } from 'react-dom/client';
import { Provider } from 'react-redux';
import { HistoryRouter as Router } from 'redux-first-history/rr6';
import { history, store } from '@redux/configure-store';
import { GoogleOAuthProvider } from '@react-oauth/google';

const domNode = document.getElementById('root') as HTMLDivElement;
const root = createRoot(domNode);

root.render(
    <GoogleOAuthProvider clientId='1093600072128-ra2l3m6f8jev4iafqq96ptr1svc7sfj1.apps.googleusercontent.com'>

    <React.StrictMode>
        <Provider store={store}>
            <Router history={history}>
                <App />
            </Router>
        </Provider>
    </React.StrictMode>,
    </GoogleOAuthProvider>
);
