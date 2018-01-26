import 'babel-polyfill';
import 'bluebird';


import ES6Promise from 'es6-promise';
import React from 'react';
import ReactDom from 'react-dom';

import { Router } from 'react-router-dom';
import createHistory from 'history/createBrowserHistory';
import Loadable from 'react-loadable';
import { AppContainer } from 'react-hot-loader';

import ApolloClient, { createNetworkInterface } from 'apollo-client';
import { ApolloProvider } from 'react-apollo';
import { CookiesProvider } from 'react-cookie';

import configureStore from './app/store/configureStore';
import App from './app/containers/App';
import ScrollToTop from './app/containers/ScrollToTop';

import './public/scss/index.scss';

if (!window.console) console = { log() { } };
ES6Promise.polyfill();
const preloadedState = window.INITIAL_STATE;

/**
const logErrors = {
  applyAfterware({ response }, next) {
    if (!response.ok) {
      response.clone().text().then((bodyText) => {
        console.error(`Network Error: ${response.status} (${response.statusText}) - ${bodyText}`);
        next();
      });
    } else {
      response.clone().json().then(({ errors }) => {
        if (errors) {
          console.error('GraphQL Errors:', errors.map(e => e.message));
        }
        next();
      });
    }
  },
};

 */


const networkInterface = createNetworkInterface({
  uri: `${window.location.protocol}//${window.location.hostname}:${window.location.port}/graphql`,
  opts: {
    credentials: 'same-origin',
  },
});

const client = new ApolloClient(
  { networkInterface },
);

const history = createHistory();
const store = configureStore(client, history, preloadedState);

const component = (

  <ApolloProvider store={store} client={client}>
    <Router history={history}>

      <CookiesProvider>
        <div>
          <ScrollToTop>
            <AppContainer>
              <App />
            </AppContainer>
          </ScrollToTop>
        </div>
      </CookiesProvider>

    </Router>
  </ApolloProvider>
);

window.main = () => {
  Loadable.preloadReady().then(() => {
    ReactDom.render(component,
      document.getElementById('content'),
    );
  });
};


if (module.hot) {
  module.hot.accept('./containers/App', () => { render(App); });
}

