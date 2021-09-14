import { Grid, styled } from '@material-ui/core';
import Candle from '../components/candle';

const MainLayout = styled('div')(({ theme }) => ({
  backgroundColor: theme.palette.background.default,
  height: '100%',
}));

const Calculator = () => (
  <MainLayout>
    <Grid container>
      <Grid
        item
        md={3}
      />
      <Grid
        item
        xs={12}
        md={6}
      >
        <Candle />
      </Grid>
      <Grid
        item
        md={3}
      />
    </Grid>

  </MainLayout>
);

export default Calculator;
