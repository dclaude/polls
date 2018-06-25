import thunk from 'redux-thunk'
import devTools from 'remote-redux-devtools'
import { applyMiddleware, compose } from 'redux'

export default compose(
  applyMiddleware(
    thunk,
  ),
  devTools()
)

