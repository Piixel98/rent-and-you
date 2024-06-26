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
    Grid,
    Alert,
    AlertIcon,
    InputGroup,
    InputRightElement,
} from '@chakra-ui/react';
import {AuthService, DocumentType, UserCreateModel} from "../../client";
import { useState } from "react";
import useCustomToast from "../../hooks/useCustomToast.ts";
import WelcomeUser from "./WelcomeUser.tsx";
import useAuth, { isLoggedIn } from "../../hooks/useAuth.ts";
import { useNavigate } from "@tanstack/react-router";
import { ViewIcon, ViewOffIcon } from "@chakra-ui/icons";

function SignupUser() {
    const [documentType, setDocumentType] = useState<DocumentType>('NIF');
    const [documentId, setDocumentId] = useState('');
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [postalCode, setPostalCode] = useState('');
    const [expiration_date, setExpirationDate] = useState('');
    const [address, setAddress] = useState('');
    const [city, setCity] = useState('');
    const [phoneNumber, setPhoneNumber] = useState('');
    const [birth_date, setBirthDate] = useState('');
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
    const documentTypes: DocumentType[] = ['NIF', 'CIF', 'NIE', 'Pasaporte'];

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
        expiration_date: expiration_date,
        first_name: firstName,
        last_name: lastName,
        postal_code: postalCode,
        address: address,
        city: city,
        phone_number: phoneNumber,
        birth_date: birth_date,
        role: "user",
        hashed_password: hashedPassword,
        email: email,
      };

      try {
        AuthService.authSignupApiV1AuthSignupPost({ requestBody: user }).then(
            (response) => {
                if (response) {
                    console.log(response);
                    login({ username: email, password: password }).then(r => console.debug(r));
                    showToast('Usuario registrado con éxito', 'Bienvenido al club You!', 'success');
                    navigate({ to: '/welcome' }).then(r => console.debug(r));
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
       align={'center'}
       justify={'center'}
       direction="column"
       mt={"30"}
       mb={"100"}
       p={5}
    >
        {isLoggedIn() ? (
            <WelcomeUser/>
        ) : (
          <>
            <Stack align={'center'} mt={5}>
                <Heading fontSize={{ base: '2xl', md: '4xl' }}>Regístrate ahora</Heading>
                <Text fontSize={{ base: 'sm', md: 'lg' }} color={'gray.600'}>
                    únete al club <Link color={'green.400'}>&You</Link> ✌️
                </Text>
                <Box mt={5}/>
            </Stack>
            <Box
                rounded={'lg'}
                bg={useColorModeValue('white', 'gray.700')}
                boxShadow={'lg'}
                p={8}
                as="form"
                borderWidth="1px"
                borderRadius="lg"
                onSubmit={handleSubmit}
                maxW={{ base: "90%", md: "80%", lg: "60%" }}
                width="100%"
                mx={'auto'}
            >
                <Grid templateColumns={{ base: "repeat(1, 1fr)", md: "repeat(3, 2fr)" }} gap={6} mt={2}>
                   <FormControl id="document_type">
                    <FormLabel>Tipo de Documento</FormLabel>
                    <Select onChange={(e) => setDocumentType(e.target.value.toLowerCase() as DocumentType)} required>
                      {documentTypes.map((type) => (
                        <option key={type} value={type}>{type.toUpperCase()}</option>
                      ))}
                    </Select>
                  </FormControl>
                  <FormControl id="document_id">
                      <FormLabel>Documento de Identidad</FormLabel>
                      <Input onChange={(e) => setDocumentId(e.target.value)} required type="text" />
                  </FormControl>
                  <FormControl id="fecha_caducidad">
                    <FormLabel>Fecha de caducidad</FormLabel>
                    <Input onChange={(e) => setExpirationDate(e.target.value)} required type="date" />
                  </FormControl>
                </Grid>
                <Grid templateColumns={{ base: "repeat(1, 1fr)", md: "repeat(2, 1fr)" }} gap={6} mt={2}>
                  <FormControl id="firstName">
                    <FormLabel>Nombre</FormLabel>
                    <Input focusBorderColor="green.400" required type="text" value={firstName} onChange={(e) => setFirstName(e.target.value)} />
                  </FormControl>
                  <FormControl id="lastName">
                    <FormLabel>Apellidos</FormLabel>
                    <Input focusBorderColor="green.400" required type="text" value={lastName} onChange={(e) => setLastName(e.target.value)} />
                  </FormControl>
                </Grid>
                <Grid templateColumns={{ base: "repeat(1, 1fr)", md: "repeat(2, 1fr)" }} gap={6} mt={2}>
                  <FormControl id="email">
                    <FormLabel>Email</FormLabel>
                    <Input focusBorderColor="green.400" required type="email" value={email} onChange={(e) => setEmail(e.target.value)} />
                  </FormControl>
                  <FormControl id="phoneNumber">
                    <FormLabel>Teléfono</FormLabel>
                    <Input focusBorderColor="green.400" required type="text" value={phoneNumber} onChange={(e) => setPhoneNumber(e.target.value)} />
                  </FormControl>
                </Grid>
                <Grid templateColumns={{ base: "repeat(1, 1fr)", md: "repeat(2, 1fr)" }} gap={6} mt={2}>
                  <FormControl id="address">
                    <FormLabel>Dirección</FormLabel>
                    <Input focusBorderColor="green.400" required type="text" value={address} onChange={(e) => setAddress(e.target.value)} />
                  </FormControl>
                  <FormControl id="fecha_nacimiento">
                    <FormLabel>Fecha de nacimiento</FormLabel>
                    <Input onChange={(e) => setBirthDate(e.target.value)} required type="date" />
                  </FormControl>
                </Grid>
                <Grid templateColumns={{ base: "repeat(1, 1fr)", md: "repeat(2, 1fr)" }} gap={6} mt={2}>
                  <FormControl id="city">
                    <FormLabel>Ciudad</FormLabel>
                    <Input focusBorderColor="green.400" required type="text" value={city} onChange={(e) => setCity(e.target.value)} />
                  </FormControl>
                  <FormControl id="postalCode">
                    <FormLabel>Código Postal</FormLabel>
                    <Input focusBorderColor="green.400" required type="text" value={postalCode} onChange={(e) => setPostalCode(e.target.value)} />
                  </FormControl>
                </Grid>
                <Grid templateColumns={{ base: "repeat(1, 1fr)", md: "repeat(2, 1fr)" }} gap={6} mt={2}>
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
                <Stack spacing={10} mt={10}>
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
            </Box>
          </>
        )}
    </Flex>
    );
}

export default SignupUser;
