import {
  Flex,
  Box,
  FormControl,
  FormLabel,
  Input,
  Checkbox,
  Stack,
  Link,
  Button,
  Heading,
  Text,
  useColorModeValue, InputGroup, InputRightElement,
} from '@chakra-ui/react';
import useCustomToast from "../../hooks/useCustomToast.ts";
import React, {useState} from "react";
import WelcomeUser from "./WelcomeUser.tsx";
import useAuth, {isLoggedIn} from "../../hooks/useAuth.ts";
import {ViewIcon, ViewOffIcon} from "@chakra-ui/icons";

function LoginUser() {
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { login } = useAuth();

  const handlePasswordVisibility = () => setShowPassword(!showPassword);

  const toast = useCustomToast();
  const handleSubmit = async (e: React.FormEvent) => {
    try {
      e.preventDefault();
      await login({ username: email, password: password }).catch();
      toast('Sesión iniciada!', 'Has iniciado sesión con éxito.', 'success');
    } catch (error) {
      const err = error as { status?: number };
      console.log(err);
      if (err.status === 400) {
        toast('Error iniciando sesión', 'Verifica tus credenciales.', 'error');
      } else {
        toast('Error iniciando sesión', 'Intenta de nuevo más tarde.', 'error');
      }
    }
  };

  return (
    <Flex
      minH={'100vh'}
      align={'center'}
      justify={'center'}>
      <Stack spacing={8} mx={'auto'} maxW={'lg'} py={12} px={6}>
        {isLoggedIn() ? (
                <WelcomeUser />
            ) : (
              <>
                <Stack align={'center'}>
                  <Heading fontSize={'4xl'}>Inicia sesión ahora</Heading>
                  <Text fontSize={'lg'} color={'gray.600'}>
                    para disfrutar todas <Link color={'green.400'}>las ventajas</Link> ✌️
                  </Text>
                </Stack>
                <Box
                  rounded={'lg'}
                  bg={useColorModeValue('white', 'gray.700')}
                  boxShadow={'lg'}
                  p={8}
                  as="form"
                  onSubmit={handleSubmit}>
                  <Stack spacing={4}>
                    <FormControl id="email">
                      <FormLabel>Email</FormLabel>
                      <Input autoComplete="email" focusBorderColor="green.400" required type="email" value={email} onChange={(e) => setEmail(e.target.value)} />
                    </FormControl>
                    <FormControl id="password">
                      <FormLabel>Contraseña</FormLabel>
                      <InputGroup>
                        <Input
                          focusBorderColor="green.400"
                          required
                          autoComplete="password"
                          type={showPassword ? 'text' : 'password'}
                          value={password}
                          onChange={(e) => setPassword(e.target.value)}
                        />
                        <InputRightElement width="4.5rem">
                          <Button h="1.75rem" size="sm" onClick={handlePasswordVisibility}>
                            {showPassword ? <ViewOffIcon /> : <ViewIcon />}
                          </Button>
                        </InputRightElement>
                      </InputGroup>
                    </FormControl>
                    <Stack spacing={2}>
                      <Stack
                        direction={{ base: 'column', sm: 'row' }}
                        align={'start'}
                        justify={'space-between'}>
                        <Checkbox colorScheme="green">Recordar sesión</Checkbox>
                      </Stack>
                      <Link color={'green.400'}>Forgot password?</Link>
                      <Link href="/signup" color={'green.400'}> ¿No tienes cuenta?</Link>
                      <Button
                        type="submit"
                        bg={'green.400'}
                        color={'white'}
                        _hover={{
                          bg: 'green.500',
                        }}>
                        Acceder
                      </Button>
                    </Stack>
                  </Stack>
                </Box>
            </>)
      }
      </Stack>
    </Flex>
  );
}

export default LoginUser;
