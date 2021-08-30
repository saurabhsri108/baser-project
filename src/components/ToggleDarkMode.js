import { useColorMode, MoonIcon, SunIcon, Button } from "native-base";

const ToggleDarkMode = () => {
  const { colorMode, toggleColorMode } = useColorMode();
  return (
    <>
      {colorMode === "light" ? (
        <Button
          size="sm"
          variant="ghost"
          onPress={toggleColorMode}
          startIcon={<MoonIcon size={"16px"} />}
        >
          Dark
        </Button>
      ) : (
        <Button
          size="sm"
          variant="ghost"
          onPress={toggleColorMode}
          startIcon={<SunIcon size={"16px"} />}
        >
          Light
        </Button>
      )}
    </>
  );
};
export default ToggleDarkMode;
