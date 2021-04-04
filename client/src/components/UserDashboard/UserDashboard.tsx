import { Container, Grid, Typography } from '@material-ui/core';
import { useUserValue } from '../../contexts';
import { User } from '../../interfaces';
import { Socials } from '../LanguagePicker/Socials';
import './UserDashBoard.css';
import { 
    LineChart, 
    Line, 
    // CartesianGrid,
    XAxis, 
    YAxis,
    Tooltip,
    ResponsiveContainer
} from 'recharts';

interface ChartData {
  label: string,
  stat: number
}

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
const getChartData = (arr: number[]) => {
  const data: ChartData[] = [];
  arr.forEach((n, i) => {
    const d: ChartData = {
      label: i.toString(),
      stat: n
    }
    data.push(d);
  });

  return data;
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
                  <br /><br />
                  <Typography
                      align="center"
                      variant="h5"
                      gutterBottom
                  >
                    Overall Tests Taken: {user.tests}
                  </Typography>
                  <br /><br />
                  <Typography
                      align="center"
                      variant="h5"
                      gutterBottom
                  >
                    Overall WPM
                  </Typography>
                  <ResponsiveContainer width="100%" height={300}>
                      <LineChart data={getChartData(user.wpm)} margin={{ top: 5, right: 20, bottom: 5, left: 0 }}>
                          <Line type="monotone" dataKey="stat" stroke="#8884d8" name='WPM'/>
                          {/* <CartesianGrid stroke="#ccc" strokeDasharray="5 5" /> */}
                          <XAxis dataKey="label" />
                          <YAxis />
                          <Tooltip />
                      </LineChart>
                  </ResponsiveContainer>
                  <Grid container >
                    <Grid item xs={12} sm={6}>
                      Average WPM: { getAverage(user.wpm) }
                    </Grid >
                    <Grid item xs={12} sm={6}>
                      Top WPM: { getHighest(user.wpm) }
                    </Grid >
                  </Grid>
                  <br /><br />

                  <Typography
                      align="center"
                      variant="h5"
                      gutterBottom
                  >
                    Overall CPM
                  </Typography>
                  <ResponsiveContainer width="100%" height={300}>
                      <LineChart data={getChartData(user.cpm)} margin={{ top: 5, right: 20, bottom: 5, left: 0 }}>
                          <Line type="monotone" dataKey="stat" stroke="#8884d8"  name='CPM'/>
                          {/* <CartesianGrid stroke="#ccc" strokeDasharray="5 5" /> */}
                          <XAxis dataKey="label" />
                          <YAxis />
                          <Tooltip />
                      </LineChart>
                  </ResponsiveContainer>
                  <Grid container >
                    <Grid item xs={12} sm={6}>
                      Average CPM: { getAverage(user.cpm) }
                    </Grid >
                    <Grid item xs={12} sm={6}>
                      Top CPM: { getHighest(user.cpm) }
                    </Grid >
                  </Grid>
                  <br /><br />

                  <Typography
                      align="center"
                      variant="h5"
                      gutterBottom
                  >
                    Overall Accuracy
                  </Typography>
                  <ResponsiveContainer width="100%" height={300}>
                      <LineChart data={getChartData(user.acc)} margin={{ top: 5, right: 20, bottom: 5, left: 0 }}>
                          <Line type="monotone" dataKey="stat" stroke="#8884d8" name='Accuracy'/>
                          {/* <CartesianGrid stroke="#ccc" strokeDasharray="5 5" /> */}
                          <XAxis dataKey="label" />
                          <YAxis />
                          <Tooltip />
                      </LineChart>
                  </ResponsiveContainer>
                  <Grid container >
                    <Grid item xs={12} sm={6}>
                      Average Accuracy: { getAverage(user.acc) }
                    </Grid >
                    <Grid item xs={12} sm={6}>
                      Top Accuracy: { getHighest(user.acc) }
                    </Grid >
                  </Grid>
                  <br /><br />
                </>
            )
            : 'No profile'
          }
      </Container>
    </>
  )
}