import React from 'react'
import ReactDOM from 'react-dom'
import App from './App'
import './pages/index.css'
import { BrowserRouter } from 'react-router-dom'
import { ToastProvider } from 'react-toast-notifications'

ReactDOM.render(
    <BrowserRouter>
        <ToastProvider placement="bottom-right">
            <App />
        </ToastProvider>
    </BrowserRouter>,
    document.getElementById('root'),
)
