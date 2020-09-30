import React, { useContext, useEffect } from 'react'
import { MemoryRouter as Router, Route, Redirect } from 'react-router-dom'
import { AuthContext } from '../providers/AuthProvider'
import { RequestContext } from '../providers/RequestProvider'
import { AppContext } from '../providers/AppProvider'
import Auth from './Auth'
import Verify from './Verify'
import Header from '../components/Header'
import Page from '../components/Page'
import Dashboard from './Dashboard'
import Request from './Request'
import Credentials from './Credentials'
import Navbar from '../components/Navbar'
import isChromeRuntime from '../utils/isChrome'

export const App: React.FC<{}> = ({}) => {
  const { user } = useContext(AppContext)
  const { request } = useContext(RequestContext)

  console.log('> request', request)

  // Not really but it will do for now
  const hasRequest = user && request

  const PROD = (
    <>
      <Header />
      <Page>
        <Router>
          {hasRequest && <Redirect to={'/request'} />}
          {user && !request && <Redirect to={'/dashboard'} />}
          {user && <Navbar />}
          <Route path={'/'} component={Auth} exact />
          <Route path={'/verify'} component={Verify} />
          <Route path={'/request'} component={Request} />
          <Route path={'/dashboard'} component={Dashboard} />
          <Route path={'/credentials'} component={Credentials} />
        </Router>
      </Page>
    </>
  )

  const DEV = (
    <>
      <Header />
      <Page>
        <Router>
          <Navbar />
          <Route path={'/'} component={Credentials} exact />
          <Route path={'/verify'} component={Verify} />
          <Route path={'/request'} component={Request} />
          <Route path={'/dashboard'} component={Dashboard} />
          <Route path={'/credentials'} component={Credentials} />
        </Router>
      </Page>
    </>
  )

  return isChromeRuntime() ? PROD : DEV
}

export default App
