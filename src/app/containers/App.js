import React, { Component } from 'react';
import { Switch, Route } from 'react-router-dom';
import Loadable from 'react-loadable';
import path from 'path';

const LoadableHome = Loadable({
  loader: () => import('./Home'),
  loading() {
    return <div>Loading...</div>;
  },
});

const LoadableProduct = Loadable({
  loader: () => import('./Product'),
  loading() {
    return <div>Loading...</div>;
  },
});

class App extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div>
      <Switch>
        <Route exact path="/" component={LoadableHome} />
        <Route exact path="/product/:id" component={LoadableProduct} />
        </Switch>
      </div>
    );
  }
}

export default App;
