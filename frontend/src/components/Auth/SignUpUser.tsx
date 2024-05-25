import {
    Flex,
    Box,
    FormControl,
    FormLabel,
    Input,
    Stack,
    Link,
    Button,
    Heading,
    Text,
    useColorModeValue,
    Select,
    Grid, Alert, AlertIcon, InputGroup, InputRightElement,
} from '@chakra-ui/react';
import {UserCreateModel, UserService} from "../../client";
import {useState} from "react";
import useCustomToast from "../../hooks/useCustomToast.ts";
import WelcomeUser from "./WelcomeUser.tsx";
import useAuth, {isLoggedIn} from "../../hooks/useAuth.ts";
import {useNavigate} from "@tanstack/react-router";
import {ViewIcon, ViewOffIcon} from "@chakra-ui/icons";

function SignupUser() {
    const [documentType, setDocumentType] = useState('dni');
    const [documentId, setDocumentId] = useState('');
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [postalCode, setPostalCode] = useState('');
    const [address, setAddress] = useState('');
    const [city, setCity] = useState('');
    const [phoneNumber, setPhoneNumber] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [hashedPassword, setHashedPassword] = useState('');
    const [passwordError, setPasswordError] = useState(false);
    const [showPassword, setShowPassword] = useState(false);
    const [showPasswordConfirmation, setShowPasswordConfirmation] = useState(false);
    const handlePasswordVisibility = () => setShowPassword(!showPassword);
    const handlePasswordConfirmVisibility = () => setShowPasswordConfirmation(!showPasswordConfirmation);
    const showToast = useCustomToast();
    const { login } = useAuth();
    const navigate = useNavigate();

    const handleSubmit = (e: React.FormEvent) => {
      e.preventDefault();
      if (password !== confirmPassword) {
        setPasswordError(true);
      } else {
        setPasswordError(false);
        setHashedPassword(password);
      }

      const user: UserCreateModel = {
        document_type: documentType,
        document_id: documentId,
        first_name: firstName,
        last_name: lastName,
        postal_code: postalCode,
        address: address,
        city: city,
        phone_number: phoneNumber,
        role: "user",
        hashed_password: hashedPassword,
        email: email,
      };

      try {
        UserService.createUserApiV1UsersPost({ requestBody: user }).then(
            (response) => {
                if (response) {
                    console.log(response);
                    login({username: email, password: password}).then(r => console.debug(r));
                    showToast('Usuario registrado con éxito', 'Bienvenido al club You!', 'success');
                    navigate({to: '/welcome'}).then(r => console.debug(r));
                }
            }
        ).catch(
            (error) => {
                if (error && error.status === 409) {
                  showToast('Error al registrar usuario', 'El documento ya está en uso.', 'error');
                } else {
                  console.error('There was an error!', error);
                  showToast('Ha ocurrido un error', 'Vuelve a intentarlo más tarde.', 'error');
                }
            }
        );
      } catch (error) {
        console.error('There was an error!', error);
        showToast('Ha ocurrido un error', 'Vuelve a intentarlo más tarde.', 'error');
      }
    };

  return (
    <Flex
      minH={'100vh'}
      align={'center'}
      justify={'center'}>
      <Stack spacing={8} mx={'auto'} maxW={'lg'} py={12} px={6}>
            {isLoggedIn() ? (
                <WelcomeUser/>
            ) : (
              <>
                <Stack align={'center'}>
                  <Heading fontSize={'4xl'}>Registrate ahora</Heading>
                  <Text fontSize={'lg'} color={'gray.600'}>
                    únete al club <Link color={'green.400'}>&You</Link> ✌️
                  </Text>
                </Stack>
                <Box
                  rounded={'lg'}
                  bg={useColorModeValue('white', 'gray.700')}
                  boxShadow={'lg'}
                  p={8}
                  as="form"
                  borderWidth="1px"
                  borderRadius="lg"
                  onSubmit={handleSubmit}>
                  <Grid templateColumns="repeat(1, 1fr)" gap={6}>
                    <Grid templateColumns="repeat(2, 1fr)" gap={6}>
                      <FormControl id="documentType">
                        <FormLabel>Tipo de documento</FormLabel>
                        <Select focusBorderColor="green.400" value={documentType} onChange={(e) => setDocumentType(e.target.value)} width="80%">
                          <option value="passport">Pasaporte</option>
                          <option value="dni">DNI</option>
                          <option value="nie">NIE</option>
                        </Select>
                      </FormControl>
                      <FormControl id="documentId">
                        <FormLabel>Número de documento</FormLabel>
                        <Input focusBorderColor="green.400" required type="text" value={documentId} onChange={(e) => setDocumentId(e.target.value)} />
                      </FormControl>
                    </Grid>
                    <Grid templateColumns="repeat(2, 1fr)" gap={6}>
                      <FormControl id="firstName">
                        <FormLabel>Nombre</FormLabel>
                        <Input focusBorderColor="green.400" required type="text" value={firstName} onChange={(e) => setFirstName(e.target.value)} />
                      </FormControl>
                      <FormControl id="lastName">
                        <FormLabel>Apellidos</FormLabel>
                        <Input focusBorderColor="green.400" required type="text" value={lastName} onChange={(e) => setLastName(e.target.value)} />
                      </FormControl>
                    </Grid>
                    <Grid templateColumns="repeat(2, 1fr)" gap={6}>
                      <FormControl id="email">
                        <FormLabel>Email</FormLabel>
                        <Input focusBorderColor="green.400" required type="email" value={email} onChange={(e) => setEmail(e.target.value)} />
                      </FormControl>
                        <FormControl id="phoneNumber">
                        <FormLabel>Teléfono</FormLabel>
                        <Input focusBorderColor="green.400" required type="text" value={phoneNumber} onChange={(e) => setPhoneNumber(e.target.value)} />
                      </FormControl>
                    </Grid>
                    <Grid templateColumns="repeat(1, 1fr)" gap={6}>
                      <FormControl id="address">
                        <FormLabel>Dirección</FormLabel>
                        <Input focusBorderColor="green.400" required type="text" value={address} onChange={(e) => setAddress(e.target.value)} />
                      </FormControl>
                    </Grid>
                    <Grid templateColumns="repeat(2, 1fr)" gap={6}>
                      <FormControl id="city">
                        <FormLabel>Ciudad</FormLabel>
                        <Input focusBorderColor="green.400" required type="text" value={city} onChange={(e) => setCity(e.target.value)} />
                      </FormControl>
                      <FormControl id="postalCode">
                        <FormLabel>Código Postal</FormLabel>
                        <Input focusBorderColor="green.400" required type="text" value={postalCode} onChange={(e) => setPostalCode(e.target.value)} />
                      </FormControl>
                    </Grid>
                    <Grid templateColumns="repeat(2, 1fr)" gap={6}>
                      <FormControl id="password">
                        <FormLabel>Contraseña</FormLabel>
                        <InputGroup>
                            <Input
                              focusBorderColor="green.400"
                              required
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
                      <FormControl id="confirmPassword">
                        <FormLabel>Repetir contraseña</FormLabel>
                        <InputGroup>
                            <Input
                              focusBorderColor="green.400"
                              required
                              type={showPasswordConfirmation ? 'text' : 'password'}
                              value={confirmPassword}
                              onChange={(e) => setConfirmPassword(e.target.value)}
                            />
                            <InputRightElement width="4.5rem">
                              <Button h="1.75rem" size="sm" onClick={handlePasswordConfirmVisibility}>
                                {showPasswordConfirmation ? <ViewOffIcon /> : <ViewIcon />}
                              </Button>
                            </InputRightElement>
                        </InputGroup>
                      </FormControl>
                    </Grid>
                    <Box mt="auto"/>
                    {passwordError && (
                      <Alert status="error" mt={2} mb={4} borderRadius="lg">
                        <AlertIcon />
                        Las contraseñas no coinciden.
                      </Alert>
                    )}
                   <Stack spacing={10}>
                      <Button
                        type="submit"
                        bg={'green.400'}
                        color={'white'}
                        _hover={{
                          bg: 'green.500',
                        }}>
                        Registrarse
                      </Button>
                  </Stack>
                  </Grid>
                </Box>
              </>
            )}
      </Stack>
    </Flex>
  );
}
export default SignupUser;
