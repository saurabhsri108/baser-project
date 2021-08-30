import {Box, useColorMode} from 'native-base';
import {useState} from 'react';
import Header from './components/Header';
import Account from './components/Account';
import Auth from './components/Auth';

const App = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const {colorMode} = useColorMode();
  return <Box minH="100vh" bg={colorMode === 'light' ? 'coolGray.50' : 'coolGray.900'}>
    <Header handleLogout={setIsLoggedIn} />
    {isLoggedIn ? <Account /> : <Auth handleLogin={setIsLoggedIn} />}
  </Box>
}

export default App;