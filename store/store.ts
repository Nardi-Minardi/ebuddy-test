import { applyMiddleware, createStore } from "redux"

import { createLogger } from 'redux-logger'
import {thunk} from 'redux-thunk';
import { createPromise } from 'redux-promise-middleware'

import reducer from "./reducers"

export default createStore(reducer, applyMiddleware(createPromise(), thunk, createLogger()));