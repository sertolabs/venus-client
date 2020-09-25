import React, { useContext, useEffect } from 'react'
import {
  MemoryRouter as Router,
  Route,
  useHistory,
  Redirect,
} from 'react-router-dom'
import { AuthContext } from '../providers/AuthProvider'
import Auth from './Auth'
import Verify from './Verify'
import Header from '../components/Header'
import Page from '../components/Page'
import Dashboard from './Dashboard'

export const App: React.FC<{}> = ({}) => {
  const { session, tenantId } = useContext(AuthContext)

  return (
    <>
      <Header />
      <Page>
        <Router>
          {session && tenantId && <Redirect to={'/dashboard'} />}
          <Route path={'/'} component={Auth} exact />
          <Route path={'/verify'} component={Verify} />
          <Route path={'/dashboard'} component={Dashboard} />
        </Router>
      </Page>
    </>
  )
}

export default App
