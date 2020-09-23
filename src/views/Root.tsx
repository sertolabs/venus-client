import React from 'react'
import AuthProvider from '../providers/AuthProvider'
import AppProvider from '../providers/AppProvider'
import App from './App'

export const Root: React.FC<{}> = () => {
  return (
    <AuthProvider>
      <AppProvider>
        <App />
      </AppProvider>
    </AuthProvider>
  )
}

export default Root
