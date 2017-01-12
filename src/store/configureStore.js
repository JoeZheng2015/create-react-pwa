import reducer from '../reducers'
import {createStore, applyMiddleware} from 'redux'
import createLogger from 'redux-logger'

const middlewares = []
if (process.env.NODE_ENV  !== 'production') {
    middlewares.push(createLogger())
}

export default function configureStore() {
    return createStore(
        reducer,
        applyMiddleware(...middlewares)
    )
}