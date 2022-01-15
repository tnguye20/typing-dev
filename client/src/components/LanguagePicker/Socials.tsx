import './Socials.css';
import * as ROUTES from '../../routes';
import { Link } from 'react-router-dom';
import { useUserValue } from '../../contexts';

export const Socials = () => {
  const { user } = useUserValue();

  return (
    <div id='socialsContainer'>
      <a rel='noreferrer' target='_blank' href={ROUTES.GIT}>Check me out on Github!</a>
      |
      <a rel='noreferrer' target='_blank' href={ROUTES.BUY_ME_TEA}>Buy me a cup of tea</a>
      |
      <a rel='noreferrer' target='_blank' href={ROUTES.PATREON}>Support the project on Patreon</a>
      |
      {
        user
          ? (
            <>
              <Link to={ROUTES.DASHBOARD}>Hi&nbsp;<b>{`${user.name}`}</b>!</Link>
              ~
              <Link to={ROUTES.LOGOUT}>Logout</Link>
            </>
          )
        : <Link to={ROUTES.LOGIN}>Login/Register</Link>
      }
      
    </div>
  )
}