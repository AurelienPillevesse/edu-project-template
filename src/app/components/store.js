import { createStore, applyMiddleware } from 'redux'
import rootReducer from './reducers';
import thunk from 'redux-thunk';

export default function configure(initialState) {
    const create = window.devToolsExtension
        ? window.devToolsExtension()(createStore)
        : createStore

    const createStoreWithMiddleware = applyMiddleware(thunk)(create)

    const store = createStoreWithMiddleware(rootReducer, initialState)

    if (module.hot) {
        module.hot.accept('./reducers', () => {
            const nextReducer = require('./reducers')
            store.replaceReducer(nextReducer)
        })
    }

    return store
}
