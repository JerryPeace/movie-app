import { Admin, Resource } from 'react-admin';
import { HashRouter } from 'react-router-dom';
import CssBaseline from '@mui/material/CssBaseline';
import adminsiteProvider from './providers/authProvider';
import { DefaultDataProvider } from './providers/movie';
import MovieList from './pages/MoviePage';
import SimpleLayout from './components/layout/SimpleLayout';
import FlaskLoginPage from './components/layout/FlaskLoginPage';
import { resourceName } from './pages/MoviePage/constants';

export default function App() {
  return (
    <>
      <CssBaseline />
      <HashRouter>
        <Admin
          authProvider={adminsiteProvider}
          dataProvider={DefaultDataProvider}
          disableTelemetry
          layout={SimpleLayout}
          loginPage={FlaskLoginPage} // As per spec, we need to use the old page.
          requireAuth
        >
          <Resource name={resourceName} list={MovieList} />
        </Admin>
      </HashRouter>
    </>
  );
}
