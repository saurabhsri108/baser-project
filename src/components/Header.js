import ToggleDarkMode from "./ToggleDarkMode";
import { Box, Button, Container, Flex, Link, useColorMode } from "native-base";
import { supabase } from "../supabase";

const Header = ({ session }) => {
  const { colorMode } = useColorMode();
  return (
    <Box
      py="4"
      borderBottomWidth={1}
      borderBottomColor={
        colorMode === "light" ? "coolGray.200" : "coolGray.700"
      }
    >
      <Container m={"auto"} w={"100%"}>
        <Flex
          direction="row"
          alignItems={"center"}
          justifyContent={"space-between"}
          w={"100%"}
        >
          <Link
            href="/"
            _text={{
              fontSize: { base: "md", md: "xl" },
              textTransform: "uppercase",
              fontWeight: "600",
              letterSpacing: "1px",
            }}
          >
            {" "}
            Baser Project{" "}
          </Link>
          <Flex direction="row" space={3}>
            <ToggleDarkMode />
            {session && (
              <Button
                size="lg"
                variant="solid"
                bg="rose.700"
                _text={{ color: "coolGray.50" }}
                onPress={() => supabase.auth.signOut()}
              >
                Logout
              </Button>
            )}
          </Flex>
        </Flex>
      </Container>
    </Box>
  );
};

export default Header;
