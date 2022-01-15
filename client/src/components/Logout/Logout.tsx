import * as React from 'react';
import Typography from '@material-ui/core/Typography';

import { useHistory } from 'react-router-dom';

import * as ROUTES from '../../routes';
import { auth } from '../../libs';
import { useAuthValue, useUserValue } from '../../contexts';
import CircularProgress from '@material-ui/core/CircularProgress';

import './Logout.css';
import { AuthToken } from '../../interfaces';

export const Logout = () => {
  const { setAuthUser } = useAuthValue();
  const { setUser } = useUserValue();
  const history = useHistory();

  React.useEffect(() => {
    auth.signOut().then(() => {
      setTimeout( () => {
        const emptyAuthToken = new AuthToken(null, null);
        setAuthUser!(emptyAuthToken);
        setUser(undefined);
        localStorage.clear();

        history.push(ROUTES.ROOT);
      } , 1000 );
    });
  });

  return (
    <div className="Logout">
      <div className="Logout-card ">
        <Typography variant="h4" color='textPrimary'>Typing Dev</Typography>
        <Typography variant="h5" color='textPrimary'>Logging Out...</Typography>
        <CircularProgress style={{margin: '10px'}}/>
      </div>

    </div>
  );
}