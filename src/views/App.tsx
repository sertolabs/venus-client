import React, { useContext, useEffect } from 'react'
import { MemoryRouter as Router, Route, Redirect } from 'react-router-dom'
import { RequestContext } from '../providers/RequestProvider'
import { AppContext } from '../providers/AppProvider'
import Auth from './Auth'
import Header from '../components/Header'
import Page from '../components/Page'
import Dashboard from './Dashboard'
import Request from './Requests'
import Credentials from './Credentials'
import Settings from './Settings'
import Navbar from '../components/Navbar'
import isChromeRuntime from '../utils/isChrome'

export const App: React.FC<{}> = ({}) => {
  const { user, logout, ssiMode } = useContext(AppContext)
  const { request } = useContext(RequestContext)
  const hasRequest = user && request

  const PROD = (
    <>
      <Header logout={!request && user && logout} />
      <Page>
        <Router>
          {hasRequest && <Redirect to={'/request'} />}
          {(user || ssiMode) && !request && <Redirect to={'/dashboard'} />}
          {(user || ssiMode) && !request && <Navbar />}
          <Route path={'/'} component={Auth} exact />
          <Route path={'/request'} component={Request} />
          <Route path={'/dashboard'} component={Dashboard} />
          <Route path={'/credentials'} component={Credentials} />
          <Route path={'/settings'} component={Settings} />
        </Router>
      </Page>
    </>
  )

  const DEV = (
    <>
      <Header logout={!request && user && logout} />
      <Page>
        <Router>
          <Navbar />
          <Route path={'/'} component={Credentials} exact />
          <Route path={'/request'} component={Request} />
          <Route path={'/dashboard'} component={Dashboard} />
          <Route path={'/credentials'} component={Credentials} />
          <Route path={'/settings'} component={Settings} />
        </Router>
      </Page>
    </>
  )

  return isChromeRuntime() ? PROD : DEV
}

export default App
