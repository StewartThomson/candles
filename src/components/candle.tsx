import { Grid, makeStyles, styled } from '@material-ui/core';
import CandleForm from './CandleForm';
import useSettings from '../hooks/useSettings';
import { THEMES } from '../constants';

const Wick = styled('div')(() => ({
  width: 15,
  background: '#ad87a9',
  height: '100%',
}));

const Flame = styled('div')(() => ({
  width: 50,
  height: '100%',
  background: '#ffad00',
  borderRadius: '8 8 8 8 / 20 20 8 8',
  boxShadow: '0 0 20 0 #ffad00',
}));

const flameStartBorderRadius = {
  borderRadius: '4% 96% 34% 66% / 87% 77% 23% 13% ',
};
const flameEndBorderRadius = {
  borderRadius: '68% 32% 58% 42% / 84% 83% 17% 16% ',
};
const flameGlowStartShadow = {
  boxShadow: '0 0 20px 0 #ffad00;',
};
const flameGlowEndShadow = {
  boxShadow: '0 0 22px 0 #ffad00',
};

const candleStyle = makeStyles((theme) => ({
  candle: {
    backgroundColor: theme.palette.background.paper,
    borderRadius: 16,
    maxWidth: 700,
  },
  flame: {
    animation: '$flame-twirl 15s ease infinite, $glow 2s ease infinite',
  },
  '@keyframes flame-twirl': {
    '0%': flameStartBorderRadius,
    '22%': flameStartBorderRadius,
    '49%': flameStartBorderRadius,
    '62%': flameStartBorderRadius,
    '81%': flameStartBorderRadius,
    '100%': flameStartBorderRadius,
    '14%': flameEndBorderRadius,
    '32%': flameEndBorderRadius,
    '56%': flameEndBorderRadius,
    '70%': flameEndBorderRadius,
    '89%': flameEndBorderRadius,
  },
  '@keyframes glow': {
    '0%': flameGlowStartShadow,
    '30%': flameGlowStartShadow,
    '60%': flameGlowStartShadow,
    '80%': flameGlowStartShadow,
    '100%': flameGlowStartShadow,
    '20%': flameGlowEndShadow,
    '50%': flameGlowEndShadow,
    '70%': flameGlowEndShadow,
  },
}));
const Candle = () => {
  const classes = candleStyle();
  const { settings, saveSettings } = useSettings();

  const toggleFlame = () => {
    saveSettings({
      theme: settings.theme === THEMES.DARK ? THEMES.LIGHT : THEMES.DARK,
    });
  };

  return (
    <Grid
      container
      direction="column"
      justifyContent="center"
      alignItems="center"
      style={{
        height: '100vh',
      }}
    >
      <Grid
        id="flame"
        item
        container
        xs={1}
        justifyContent="center"
        alignItems="flex-end"
      >
        <Flame
          onClick={toggleFlame}
          className={classes.flame}
        />
      </Grid>
      <Grid
        id="wick"
        item
        xs={1}
      >
        <Wick />
      </Grid>
      <Grid
        item
        id="candle"
        xs={10}
        container
        className={classes.candle}
      >
        <CandleForm />
      </Grid>

    </Grid>

  );
};

export default Candle;
