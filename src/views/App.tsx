import React, { useContext } from 'react'
import { MemoryRouter as Router, Route } from 'react-router-dom'
import { AuthContext } from '../providers/AuthProvider'
import Auth from './Auth'
import Verify from './Verify'

export const App: React.FC<{}> = ({}) => {
  const { token, tenantId } = useContext(AuthContext)

  return (
    <Router>
      <Route path={'/'} component={Auth} exact />
      <Route path={'/verify'} component={Verify} />
    </Router>
  )
}

export default App
