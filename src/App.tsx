import './App.css';
import Calculator from './pages/calculator';
import { CssBaseline, MuiThemeProvider } from '@material-ui/core';
import { createCustomTheme } from './theme';
import useSettings from './hooks/useSettings';

function App() {
  const { settings } = useSettings();
  const theme = createCustomTheme({
    theme: settings.theme,
  });

  return (
    <MuiThemeProvider theme={theme}>
      <CssBaseline />
      <div className="App">
        <Calculator />
      </div>
    </MuiThemeProvider>
  );
}

export default App;
