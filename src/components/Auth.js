import {
  Box,
  Container,
  FormControl,
  Heading,
  Input,
  useColorModeValue,
  VStack,
  Button, useToast,
} from 'native-base';
import {useState} from 'react';

const Auth = ({handleLogin}) => {
  const [invalid, setInvalid] = useState(false);
  const [loading, setLoading] = useState(false);
  const [email, setEmail] = useState('');
  const toast = useToast();

  const validate = () => {
    if (!email?.match(/[^@ \t\r\n]+@[^@ \t\r\n]+\.[^@ \t\r\n]+/)) {
      setInvalid(true);
      return false;
    }
    return true;
  }

  const loginUser = () => {
    setInvalid(false);
    setLoading(true);
    setTimeout(() => {
      toast.show({
        title: 'Login link sent to your email...',
        status: 'success',
        placement: 'top-right',
      });
      setLoading(false);
      setEmail('');
      handleLogin(true);
    }, 3000)
  }

  const loginHandler = () => {
    validate() ? loginUser() : setEmail('');
  };

  return <Box minH="90vh">
    <Container m="auto">
      <Heading>Welcome Back!</Heading>
      <Heading size={'sm'} color="muted.400">Sign in to continue</Heading>

      <VStack mt={8} space={2}>
        <FormControl isRequired isInvalid={invalid}>
          <FormControl.Label _text={{
            fontWeight: '500',
            color: useColorModeValue('muted.600', 'muted.300'),
          }}>Email</FormControl.Label>
          <Input type="email" value={email}
                 onChange={(e) => setEmail(e.target.value)}
                 placeholder="example@gmail.com"
                 rounded={'0.2rem'} w={'100%'} required/>
          <FormControl.ErrorMessage>This field is
            required</FormControl.ErrorMessage>
        </FormControl>
        <Button
            mt={4}
            size={{base: 'md', md: 'lg'}}
            isLoading={loading}
            isLoadingText="Sending you the link..."
            onPress={loginHandler}
            rounded={'0.2rem'}
            colorScheme="info"
        >
          Send me the Login Link
        </Button>
      </VStack>
    </Container>
  </Box>;
};

export default Auth;