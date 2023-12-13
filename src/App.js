import { Route, Routes } from 'react-router-dom';
import Topbar from './scenes/global/Topbar';
import { ColorModeContext, useMode } from './theme';
import { CssBaseline, ThemeProvider } from '@mui/material';
import Dashboard from './scenes/dashboard';
import Sidebar from './scenes/global/Sidebar';
import AddPet from './pages/AddPet';
import { useApi } from './utils/useApi';
import GetPets from './pages/GetPets';
import { useContext } from 'react';
import { useEffect } from 'react';
import ViewOrEditItems from './pages/ViewOrEditItems';
function App() {
  const [theme, colorMode] = useMode()
  // const { status, data, error } = useApi('http://192.168.1.103:5000/pets')
  // console.log(status, data, error);
  return (
    <ColorModeContext.Provider value={colorMode}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <div className="app">
          <Sidebar />
          <main className='content'>
            <Topbar />
            <Routes>
              <Route exact path='/' element={<Dashboard />} />
              <Route path='/addPet' element={<AddPet />} />
              <Route path='/pets' element={<GetPets />} />
              <Route path='/viewOrEdit' element={<ViewOrEditItems />} />
            </Routes>
          </main>

        </div>
      </ThemeProvider>
    </ColorModeContext.Provider>
  );
}

export default App;
