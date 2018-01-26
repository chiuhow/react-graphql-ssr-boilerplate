import { createStore, applyMiddleware, compose } from 'redux';
import { persistStore, autoRehydrate, AsyncStorage } from 'redux-persist';
import reducers from '../reducers/index';

export default function configureStore(client, history, initialState) {
  const store = createStore(
        reducers,
        initialState,
        compose(
          applyMiddleware(client.middleware()),
          autoRehydrate(),
        ),
    );
  persistStore(store, { storage: AsyncStorage });
  return store;
}
