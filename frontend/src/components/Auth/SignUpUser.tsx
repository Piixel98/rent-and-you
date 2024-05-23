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
  Grid, Alert, AlertIcon,
} from '@chakra-ui/react';
import {UserCreateModel, UserService} from "../../client";
import {useContext, useState} from "react";
import useCustomToast from "../../hooks/useCustomToast.ts";
import WelcomeUser from "./WelcomeUser.tsx";
import {SessionContext} from "../../contexts/SessionContext.tsx";

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
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const { loggedIn } = useContext(SessionContext);
    const showToast = useCustomToast();

    const handleSubmit = (e) => {
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
        is_superuser: false,
        hashed_password: hashedPassword,
        email: email,
      };

      try {
        const response = UserService.createUserApiV1UsersPost({ requestBody: user }).then(
            (response) => {
                console.log(response);
                setIsLoggedIn(true);
                showToast('Usuario registrado con éxito', 'Bienvenido al club You!', 'success');
            }
        ).catch(
            (error) => {
                if (error.status === 409) {
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
            {isLoggedIn ? (
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
                        <Input focusBorderColor="green.400" required type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
                      </FormControl>
                      <FormControl id="confirmPassword">
                        <FormLabel>Repetir Contraseña</FormLabel>
                        <Input focusBorderColor="green.400" required type="password" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} />
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