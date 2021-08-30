import {
  Box,
  Button,
  Center,
  Container,
  FormControl,
  Heading,
  Image,
  Input,
  useColorMode,
  useColorModeValue,
  useToast,
  VStack,
} from "native-base";
import { useEffect, useState } from "react";
import { supabase } from "../supabase";

const Account = ({ session }) => {
  const [loading, setLoading] = useState(false);
  const [name, setName] = useState("");
  const [username, setUsername] = useState("");
  const [avatarUrl, setAvatarUrl] = useState("");
  const [fileUrl, setFileUrl] = useState("");
  const toast = useToast();
  const { colorMode } = useColorMode();

  useEffect(() => {
    getProfile();
  }, [session]);

  useEffect(() => {
    if (fileUrl) downloadAvatar(fileUrl);
  }, [fileUrl]);

  async function downloadAvatar(path) {
    try {
      const { data, error } = await supabase.storage
        .from("avatars")
        .download(path);
      if (error) throw error;

      // console.log({ data, error });

      if (data) {
        const url = URL.createObjectURL(data);
        // console.log({ url });
        setAvatarUrl(url);
      }
    } catch (error) {
      toast.show({
        title: "Error getting the profile image",
        placement: "top-right",
        type: "danger",
      });
    }
  }

  async function getProfile() {
    try {
      setLoading(true);
      const user = await supabase.auth.user();
      const { data, error, status } = await supabase
        .from("profiles")
        .select(`username, fullname, avatar_url`)
        .eq("id", user.id)
        .single();
      if (error && status !== 406) throw error;

      if (data) {
        setUsername(data.username);
        setName(data.fullname);
        downloadAvatar(data.avatar_url);
      }
    } catch (error) {
      toast.show({
        title: "Error" + error.message,
        placement: "top-right",
        status: "danger",
      });
    } finally {
      setLoading(false);
    }
  }

  const updateProfileHandler = async (updateObj) => {
    try {
      setLoading(true);
      const user = await supabase.auth.user();
      const update = { ...updateObj, id: user.id, updated_at: new Date() };

      const { data, error, status } = await supabase
        .from("profiles")
        .upsert(update)
        .single();

      if (error && status !== 406) throw error;

      if (status === 201 && data) {
        toast.show({
          title: "Profile Updated Successfully",
          placement: "top-right",
          status: "success",
        });
        setName(data.fullname);
        setUsername(data.username);
      }
    } catch (error) {
      toast.show({
        title: "Error" + error.message,
        placement: "top-right",
        status: "danger",
      });
    } finally {
      setLoading(false);
    }
  };

  const uploadImageHandler = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      if (!e.target.files || e.target.files.length === 0)
        throw new Error("You must select an image to upload.");
      const file = e.target.files[0];
      const fileExt = file.name.split(".").pop();
      const filename = `${Math.random().toString(32).substr(2)}.${fileExt}`;
      const filePath = `public/${filename}`;

      const { error: uploadError } = await supabase.storage
        .from("avatars")
        .upload(filePath, file);

      // console.log({ uploadError, uploadStatus });

      if (uploadError) {
        throw uploadError;
      }

      updateProfileHandler({ avatar_url: filePath });
      setFileUrl(filePath);
    } catch (error) {
      toast.show({
        title: "Error" + error.message,
        placement: "top-right",
        status: "danger",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box minH="90vh">
      <Container m="auto">
        <Heading size={{ base: "sm", md: "lg" }}>
          Welcome {name ? name?.split(" ")[0] : "User"}
        </Heading>
        <VStack mt={8} space={2} w="100%">
          <FormControl>
            <Center>
              <form id="upload-image-form">
                <label htmlFor="upload-image" style={{ cursor: "pointer" }}>
                  {avatarUrl && (
                    <Image
                      rounded={"full"}
                      source={{
                        uri: avatarUrl,
                      }}
                      alt="User Profile Picture"
                      size={"xl"}
                      resizeMode="cover"
                    />
                  )}
                  {!avatarUrl && (
                    <Box
                      w="128px"
                      h="128px"
                      rounded="full"
                      bg={colorMode === "light" ? "gray.300" : "coolGray.700"}
                    ></Box>
                  )}
                </label>
                <input
                  type="file"
                  id="upload-image"
                  onChange={uploadImageHandler}
                  style={{ display: "none" }}
                />
              </form>
            </Center>
          </FormControl>
          <FormControl mt={4}>
            <FormControl.Label
              _text={{
                fontWeight: "500",
                color: useColorModeValue("muted.600", "muted.300"),
              }}
            >
              Username
            </FormControl.Label>
            <Input
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              placeholder="uniqueusername"
              rounded={"0.2rem"}
            />
          </FormControl>
          <FormControl mt={4}>
            <FormControl.Label
              _text={{
                fontWeight: "500",
                color: useColorModeValue("muted.600", "muted.300"),
              }}
            >
              Name
            </FormControl.Label>
            <Input
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="John Doe"
              rounded={"0.2rem"}
            />
          </FormControl>
          <Button
            mt={4}
            size={{ base: "md", md: "lg" }}
            isLoading={loading}
            isLoadingText="Sending you the link..."
            onPress={() =>
              updateProfileHandler({
                username: username,
                fullname: name,
              })
            }
            rounded={"0.2rem"}
            colorScheme="info"
          >
            Update Profile
          </Button>
        </VStack>
      </Container>
    </Box>
  );
};

export default Account;
