import React, { useContext, useEffect } from 'react'
import {
  MemoryRouter as Router,
  Route,
  useHistory,
  Redirect,
} from 'react-router-dom'
import { AuthContext } from '../providers/AuthProvider'
import { RequestContext } from '../providers/RequestProvider'
import { AppContext } from '../providers/AppProvider'
import Auth from './Auth'
import Verify from './Verify'
import Header from '../components/Header'
import Page from '../components/Page'
import Dashboard from './Dashboard'
import Request from './Request'

export const App: React.FC<{}> = ({}) => {
  const { user, loadingUser } = useContext(AppContext)
  const { request } = useContext(RequestContext)

  console.log('> request', request)

  // Not really but it will do for now
  const hasRequest = user && request

  return (
    <>
      <Header />
      <Page>
        <Router>
          {hasRequest && <Redirect to={'/request'} />}
          {user && !request && <Redirect to={'/dashboard'} />}
          <Route path={'/'} component={Auth} exact />
          <Route path={'/verify'} component={Verify} />
          <Route path={'/request'} component={Request} />
          <Route path={'/dashboard'} component={Dashboard} />
        </Router>
      </Page>
    </>
  )
}

export default App
