import GitHubIcon from '@material-ui/icons/GitHub';
import './Socials.css';
import * as ROUTES from '../../routes';

export const Socials = () => {
  return (
    <div id='socialsContainer'>
      <a rel='noreferrer' target='_blank' href={ROUTES.GIT}>Check me out on Github!&nbsp;&nbsp;<GitHubIcon /></a>
      |
      <a rel='noreferrer' target='_blank' href={ROUTES.BUY_ME_TEA}>Buy me a cup of tea!</a>
      |
      <a rel='noreferrer' target='_blank' href={ROUTES.PATREON}>Support the project on Patreon!</a>
    </div>
  )
}