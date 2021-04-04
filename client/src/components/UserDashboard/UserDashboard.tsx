import { Container, Grid, Typography } from '@material-ui/core';
import { useUserValue } from '../../contexts';
import { User } from '../../interfaces';
import { Socials } from '../LanguagePicker/Socials';
import './UserDashBoard.css';

const getAverage = (arr: number[]) => {
  const sum = arr.reduce((curr, acc) => (
    acc += curr
  ), 0);

  return Math.ceil(sum / arr.length);
};
const getHighest = (arr: number[]) => {
  let highest = arr[0];
  arr.forEach((n) => { if (n > highest) highest = n });
  return highest;
}

export const UserDashBoard = () => {
  const user = (useUserValue()).user as User;
  
  return (
    <>
      <Container maxWidth="lg" id='dashboardContainer'>
          <Typography variant="h3" align='center'>Typing Dev</Typography>
          <Socials />

          {
            user
            ? (
                <>
                  <Grid container >
                    <Grid item xs={12} sm={4}>
                      <Typography variant="h6" align='center'>Average WPM</Typography>
                      { getAverage(user.wpm) }
                    </Grid >
                    <Grid item xs={12} sm={4}>
                      <Typography variant="h6" align='center'>Average CPM</Typography>
                      { getAverage(user.cpm) }
                    </Grid >
                    <Grid item xs={12} sm={4}>
                      <Typography variant="h6" align='center'>Average Accuracy</Typography>
                      { getAverage(user.acc) }
                    </Grid >
                  </Grid>

                  <Grid container>
                    <Grid item xs={12} sm={4}>
                      <Typography variant="h6" align='center'>Top WPM</Typography>
                      { getHighest(user.wpm) }
                    </Grid >
                    <Grid item xs={12} sm={4}>
                      <Typography variant="h6" align='center'>Top CPM</Typography>
                      { getHighest(user.cpm) }
                    </Grid >
                    <Grid item xs={12} sm={4}>
                      <Typography variant="h6" align='center'>Top Accuracy</Typography>
                      { getHighest(user.acc) }
                    </Grid >
                  </Grid>
                </>
            )
            : 'No profile'
          }
      </Container>
    </>
  )
}