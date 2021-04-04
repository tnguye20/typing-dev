import * as React from 'react';
import './App.css';
import {
  BrowserRouter as Router,
  Route,
  Switch
} from 'react-router-dom';

import {
  AuthContextProvider,
  UserContextProvider,
} from './contexts';

import {
  Type,
  LanguagePicker,
  Header,
  Login,
  Logout,
  UserDashBoard
} from './components';
import { LANGUAGES } from './interfaces';

import * as ROUTES from './routes';

function App() {
  return (
    <AuthContextProvider>
      <UserContextProvider>
        <Router>
          <Switch>
            {
              Object.keys(LANGUAGES).map((k: string, index) => {
                const language = k as keyof typeof LANGUAGES;
                return (
                  <Route key={index} exact path={`${ROUTES.TYPING}/${language}`} render={() => <><Header /><Type language={language}/></>}/>
                )
              })
            }
            <Route exacr path={ROUTES.TYPING} render={() => <><Header /><Type language='javascript'/></>}/>
            <Route path={ROUTES.LOGIN} render={() =><><Header /><Login /></>}/>
            <Route path={ROUTES.LOGOUT} render={() => <Logout />}/>
            <Route path={ROUTES.DASHBOARD} render={() => <><Header /><UserDashBoard /></>}/>
            <Route path={ROUTES.ROOT} render={() => <LanguagePicker />}/>
          </Switch>
        </Router>
      </UserContextProvider>
    </AuthContextProvider>
  );
}

export default App;
