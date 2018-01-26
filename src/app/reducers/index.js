import { combineReducers } from 'redux';
import { reducer as formReducer } from 'redux-form';
import ApolloClient, { createNetworkInterface } from 'apollo-client';

const client = new ApolloClient(
  { networkInterface: createNetworkInterface({ uri: 'https://dev.setttour.com.tw:3000/graphql' }) },
);

const reducers = combineReducers({
  form: formReducer,
  apollo: client.reducer(),
});

export default reducers;
