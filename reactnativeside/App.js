import {Box, useColorMode} from 'native-base';
import {useEffect, useState} from 'react';
import Header from './components/Header';
import Account from './components/Account';
import Auth from './components/Auth';
import {supabase} from '../src/supabase';
import React from 'react';

const App = () => {
  const [session, setSession] = useState(null);
  const {colorMode} = useColorMode();

  useEffect(() => {
    setSession(supabase.auth.session());

    supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
    });
  }, []);

  return (
    <Box
      minH="100vh"
      bg={colorMode === 'light' ? 'coolGray.50' : 'coolGray.900'}>
      <Header key={session?.user?.id} session={session} />
      {session ? (
        <Account key={session?.user?.id} session={session} />
      ) : (
        <Auth />
      )}
    </Box>
  );
};

export default App;
