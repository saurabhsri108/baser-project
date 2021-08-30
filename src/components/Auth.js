import {
  Box,
  Container,
  FormControl,
  Heading,
  Input,
  useColorModeValue,
  VStack,
  Button,
  useToast,
} from "native-base";
import { useState } from "react";
import { supabase } from "../supabase";

const Auth = ({ handleLogin }) => {
  const [invalid, setInvalid] = useState(false);
  const [loading, setLoading] = useState(false);
  const [email, setEmail] = useState("");
  const toast = useToast();

  const validate = () => {
    if (!email?.match(/[^@ \t\r\n]+@[^@ \t\r\n]+\.[^@ \t\r\n]+/)) {
      setInvalid(true);
      return false;
    }
    return true;
  };

  const loginUser = async () => {
    try {
      setInvalid(false);
      setLoading(true);
      const { error } = await supabase.auth.signIn({ email });
      if (error) throw error;
      toast.show({
        title: "Login link sent to your email...",
        status: "success",
        placement: "top-right",
        duration: 3000,
      });
    } catch (error) {
      toast.show({
        title: "Error: " + (error.error_description || error.message),
        status: "danger",
        placement: "top-right",
        duration: 3000,
      });
    } finally {
      setLoading(false);
      setEmail("");
    }
  };

  const loginHandler = () => {
    validate() ? loginUser() : setEmail("");
  };

  return (
    <Box minH="90vh">
      <Container m="auto">
        <Heading>Welcome Back!</Heading>
        <Heading size={"sm"} color="muted.400">
          Sign in to continue
        </Heading>

        <VStack mt={8} space={2}>
          <FormControl isRequired isInvalid={invalid}>
            <FormControl.Label
              _text={{
                fontWeight: "500",
                color: useColorModeValue("muted.600", "muted.300"),
              }}
            >
              Email
            </FormControl.Label>
            <Input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="example@gmail.com"
              rounded={"0.2rem"}
              w={"100%"}
              required
            />
            <FormControl.ErrorMessage>
              This field is required
            </FormControl.ErrorMessage>
          </FormControl>
          <Button
            mt={4}
            size={{ base: "md", md: "lg" }}
            isLoading={loading}
            isLoadingText="Sending you the link..."
            onPress={loginHandler}
            rounded={"0.2rem"}
            colorScheme="info"
          >
            Send me the Login Link
          </Button>
        </VStack>
      </Container>
    </Box>
  );
};

export default Auth;
