import React, { useContext } from 'react'
import { MemoryRouter as Router, Route } from 'react-router-dom'
import { AuthContext } from '../providers/AuthProvider'
import Auth from './Auth'
import Verify from './Verify'
import Header from '../components/Header'
import Page from '../components/Page'
import Dashboard from './Dashboard'
// import Debug from './Debug'

export const App: React.FC<{}> = ({}) => {
  const { session, tenantId } = useContext(AuthContext)

  return (
    <>
      <Header />
      <Page>
        <Router>
          <Route path={'/'} component={Auth} exact />
          <Route path={'/verify'} component={Verify} />
          <Route path={'/dashboard'} component={Dashboard} />
        </Router>
      </Page>
    </>
  )
}

export default App
