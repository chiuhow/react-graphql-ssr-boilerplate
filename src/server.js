import express from 'express';
import favicon from 'serve-favicon';
// import morgan from 'morgan';
import compression from 'compression';
import cookieParser from 'cookie-parser';
import bodyParser from 'body-parser';

import React from 'react';
import { renderToString } from 'react-dom/server';
import { StaticRouter } from 'react-router-dom';

import { CookiesProvider } from 'react-cookie';
import { ServerStyleSheet, StyleSheetManager } from 'styled-components';

import ApolloClient, { createNetworkInterface } from 'apollo-client';
import { ApolloProvider, renderToStringWithData } from 'react-apollo';
import DataLoader from 'dataloader';
import createHistory from 'history/createMemoryHistory';
import graphqlHTTP from 'express-graphql';
import { Helmet } from 'react-helmet';
import config from 'config';

import Loadable from 'react-loadable';
import { getBundles } from 'react-loadable/webpack';
import stats from '../public/react-loadable.json';



import configureStore from './app/store/configureStore';
import Html from './app/containers/Html';
import App from './app/containers/App';


import schema from './app/schema/index';

const cookiesMiddleware = require('universal-cookie-express');

const app = express();


app.use(compression());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static('public'));
app.use(express.static('dist'));
app.use(cookiesMiddleware());

app.use('/graphql', graphqlHTTP((req, res) => ({
  schema,
  rootValue: { session: req.session },
  context: { req, res },
  graphiql: process.env.NODE_ENV !== 'production',
  formatError: error => ({
    message: error.message,
  }),
}
),
));

app.use((req, res) => {
  try {
    const sheet = new ServerStyleSheet();
    const networkInterface = createNetworkInterface({
      uri: `${config.get('siteUrl')}graphql`,
      opts: {
        credentials: 'same-origin',
      },
    });

    const client = new ApolloClient(
      { networkInterface },
    );

    const store = configureStore(client, createHistory, {
      app: {
        siteUrl: config.get('siteUrl'),
      },
    });

    const context = {};

    const modules = [];
    const component = (

      <ApolloProvider store={store} client={client}>
        <StaticRouter
          location={req.url}
          context={context}
        >
          <CookiesProvider cookies={req.universalCookies}>
            <div>
              <StyleSheetManager sheet={sheet.instance}>
                <Loadable.Capture report={moduleName => modules.push(moduleName)}>
                  <App />
                </Loadable.Capture>
              </StyleSheetManager>
            </div>
          </CookiesProvider>
        </StaticRouter>
      </ApolloProvider>
    );
    sheet.getStyleTags();
    // const styleString = sheet.getStyleElement();
    if (context.url) {

    } else {
      renderToStringWithData(component).then((content) => {
        const helmet = Helmet.renderStatic();

        const initialState = { [client.reduxRootKey]: client.getInitialState() };

        const bundles = getBundles(stats, modules);

        res.status(200).send(`<!doctype html>\n${renderToString(<Html content={content} store={store} state={initialState} helmet={helmet} bundles={bundles} />)}`);
      }).catch((err) => {
        console.log(err);
        res.status(500).send('server error');
      });
    }
  } catch (err) {
    console.log(err);
    res.status(500).send('Server Error');
  }
});


Loadable.preloadAll().then(() => {
  app.listen(3000, () => {
    console.log('Listening to port 3000');
  });
});

