import React, { Component } from 'react';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import reducers from './src/reducers';
import { PurchaseSummary } from './src/components';

export default class App extends Component {
  render() {
    const store = createStore(reducers);
    return (
      <Provider store={store}>
        <PurchaseSummary />
      </Provider>
    )
  }
}
