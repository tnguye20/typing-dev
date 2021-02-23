import * as React from 'react';
import './App.css';
import {
  BrowserRouter as Router,
  Route,
  Switch
} from 'react-router-dom';

import {
  Type,
  LanguagePicker,
  Header
} from './components';
import { LANGUAGES } from './interfaces';

import * as ROUTES from './routes';

function App() {
  return (
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
        <Route path={ROUTES.ROOT} render={() => <LanguagePicker />}/>
      </Switch>
    </Router>
  );
}

export default App;
