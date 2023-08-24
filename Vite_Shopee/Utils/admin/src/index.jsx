import React from 'react'
import ReactDOM from 'react-dom'
import { Provider } from 'react-redux'
import { ConnectedRouter } from 'connected-react-router'
import styled from 'styled-components'

import App from './App'
import * as serviceWorkerRegistration from './serviceWorkerRegistration'
import reportWebVitals from './reportWebVitals'
import configureStore from './Stores/configureStore'
import { history } from './Stores/reducers'

const VerticalBox = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 100%;
  justify-content: space-between;
`

const initialState = {}
export const store = configureStore(initialState, history)
ReactDOM.render(
  process.env.NODE_ENV !== 'production'
    ? (
      <React.StrictMode>
        <Provider store={store}>
          <ConnectedRouter history={history}>
            <VerticalBox>
              <App />
            </VerticalBox>
          </ConnectedRouter>
        </Provider>
      </React.StrictMode>
    )
    : (
      <Provider store={store}>
        <ConnectedRouter history={history}>
          <VerticalBox>
            <App />
          </VerticalBox>
        </ConnectedRouter>
      </Provider>
    ),
  document.getElementById('root')
)
// If you want your app to work offline and load faster, you can change
// unregister() to register-individual() below. Note this comes with some pitfalls.
// Learn more about service workers: https://cra.link/PWA
serviceWorkerRegistration.unregister()

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals()
