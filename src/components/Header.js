import ToggleDarkMode from './ToggleDarkMode';
import {Box, Container, Flex, Link, useColorMode} from 'native-base';

const Header = ({handleLogout}) => {
  const {colorMode} = useColorMode();
  return <Box py="4"
              borderBottomWidth={1}
              borderBottomColor={colorMode === 'light'
                  ? 'coolGray.200'
                  : 'coolGray.700'}>
    <Container m={'auto'} w={'100%'}>
      <Flex direction="row" alignItems={'center'}
            justifyContent={'space-between'} w={'100%'}>
        <Link href="/" _text={{
          fontSize: {base: "md", md: "xl"},
          textTransform: "uppercase",
          fontWeight: "600",
          letterSpacing: "1px"
        }}> Baser Project </Link>
        <ToggleDarkMode/>
      </Flex>
    </Container>
  </Box>;
};

export default Header;