import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import {Provider} from 'react-redux' //This should be imported to provide the store to the app
import Store from './redux/Store' // importing the store from the redux folder
import { AuthContextProvider } from './redux/Auth/AuthContext.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <AuthContextProvider>
      <Provider store={Store}>
        <App />
      </Provider>
    </AuthContextProvider>
  </StrictMode>,
)



