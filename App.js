import React from 'react'
import { createStore } from 'redux'
import { Provider } from 'react-redux'
import reducer from './reducers'
import middleware from './middleware'
import Authent from './components/Authent'

const store = createStore(reducer, middleware)

const App = () => (
  <Provider store={store}>
    <Authent />
  </Provider>
)

export default App

