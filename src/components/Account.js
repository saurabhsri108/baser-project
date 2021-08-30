import {
  Box, Button, Center,
  Container,
  FormControl,
  Heading, Image, Input,
  useColorModeValue, useToast,
  VStack,
} from 'native-base';
import {useState} from 'react';

const Account = () => {
  const [loading, setLoading] = useState(false);
  const [name, setName] = useState('Saurabh Srivastava');
  const [username, setUsername] = useState('saudev001');
  const [avatarUrl, setAvatarUrl] = useState(
      'https://wallpaperaccess.com/full/317501.jpg');
  const toast = useToast();

  const updateProfileHandler = () => {
    setLoading(true);
    setTimeout(() => {
      toast.show({
        title: 'Profile Updated',
        placement: 'top-right',
        status: 'success',
      });
      setUsername('updatedUsername');
      setName('updatedName');
      setLoading(false);
    }, 3000);
  };

  const uploadImageHandler = async (e) => {
    e.preventDefault()
    const reader = new FileReader()
    reader.onload = () => {
      if (reader.readyState === 2) {
        setAvatarUrl(reader.result)
      }
    }
    reader.readAsDataURL(e.target.files[0]);
  }

  return <Box minH="90vh">
    <Container m="auto">
      <Heading size={{base: 'sm', md: 'lg'}}>Welcome {username}</Heading>
      <VStack mt={8} space={2} w="100%">
        <FormControl>
          <Center>
            <form id="upload-image-form">
              <label htmlFor="upload-image" style={{cursor: "pointer"}}>
                <Image
                    rounded={'full'}
                    source={{
                      uri: avatarUrl,
                    }}
                    alt="User Profile Picture"
                    size={'xl'}
                    resizeMode="cover"
                />
              </label>
              <input type="file" id="upload-image" onChange={uploadImageHandler}  style={{display: 'none'}}/>
            </form>
          </Center>
        </FormControl>
        <FormControl mt={4}>
          <FormControl.Label _text={{
            fontWeight: '500',
            color: useColorModeValue('muted.600', 'muted.300'),
          }}>Username</FormControl.Label>
          <Input value={username}
                 onChange={(e) => setUsername(e.target.value)}
                 placeholder="uniqueusername"
                 rounded={'0.2rem'}/>
        </FormControl>
        <FormControl mt={4}>
          <FormControl.Label _text={{
            fontWeight: '500',
            color: useColorModeValue('muted.600', 'muted.300'),
          }}>Name</FormControl.Label>
          <Input value={name}
                 onChange={(e) => setName(e.target.value)}
                 placeholder="John Doe"
                 rounded={'0.2rem'}/>
        </FormControl>
        <Button
            mt={4}
            size={{base: 'md', md: 'lg'}}
            isLoading={loading}
            isLoadingText="Sending you the link..."
            onPress={updateProfileHandler}
            rounded={'0.2rem'}
            colorScheme="info"
        >
          Update Profile
        </Button>
      </VStack>
    </Container>
  </Box>;
};

export default Account;