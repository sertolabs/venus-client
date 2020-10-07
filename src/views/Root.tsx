import React from 'react'
import AuthProvider from '../providers/AuthProvider'
import AppProvider from '../providers/AppProvider'
import RequestProvider from '../providers/RequestProvider'
import App from './App'

export const Root: React.FC<{}> = () => {
  return (
    <AuthProvider>
      <AppProvider>
        <RequestProvider>
          <App />
        </RequestProvider>
      </AppProvider>
    </AuthProvider>
  )
}

export default Root
