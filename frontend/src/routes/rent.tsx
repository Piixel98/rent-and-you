import { useEffect, useState } from 'react';
import {
  Box,
  Button,
  FormControl,
  FormLabel,
  Input,
  Checkbox,
  Text,
  HStack,
  VStack,
  Grid,
  Image,
  GridItem,
  Spinner,
  Flex,
  Icon,
  Center,
  Stack,
  Avatar,
  Select,
  useDisclosure, Modal, ModalOverlay, ModalContent, ModalHeader, ModalCloseButton, ModalBody
} from '@chakra-ui/react';
import {createFileRoute, Link, useNavigate} from '@tanstack/react-router';
import UserMenu from '../components/Common/UserMenu.tsx';
import Footer from '../components/Common/Footer.tsx';
import NavBarWithSubnavigation from '../components/Common/Navbar.tsx';
import NoVehicleImage from '../assets/images/no-vehicle.svg';
import { parse, formatISO, startOfDay, format, parseISO } from 'date-fns';
import {
  OfficeService,
  VehicleService,
  ApiError,
  RentCreateModel,
  RentService,
  VehicleReadModel,
  OfficeReadModel,
  UserReadModel,
  RgpdService,
  RGPDCreateModel,
  AuthService,
} from '../client';
import { SubmitHandler, useForm } from 'react-hook-form';
import { useMutation, useQueryClient } from 'react-query';
import useCustomToast from '../hooks/useCustomToast';
import { FaCogs, FaUsers } from 'react-icons/fa';
import { IoSpeedometerOutline } from 'react-icons/io5';
import useAuth, { isLoggedIn } from '../hooks/useAuth.ts';
import PaymentGateway from "../components/Rent/PaymentGateway.tsx";

export const Route = createFileRoute('/rent')({
  component: Rent,
  beforeLoad: () => {},
});

const getImageSrc = (image: string | null) => {
  if (!image || image === '' || !image.includes('https')) {
    return NoVehicleImage;
  }
  return image;
};

const convertToISO = (dateString: string | null) => {
  if (!dateString) {
    return '';
  }
  const parsedDate = parse(dateString, 'dd/MM/yyyy HH:mm', new Date());
  return formatISO(parsedDate);
};

function Rent() {
  const queryParams = new URLSearchParams(window.location.search);
  const office_id = queryParams.get('office_id') || '';
  const pickup_date = queryParams.get('pickup_date') || '';
  const vehicle_id = queryParams.get('vehicle_id') || '';
  const return_date = queryParams.get('return_date') || '';
  const total_days = queryParams.get('total_days') || '';
  const [vehicle, setVehicle] = useState<VehicleReadModel | null>(null);
  const [office, setOffice] = useState<OfficeReadModel | null>(null);
  const [loading, setLoading] = useState(true);
  const queryClient = useQueryClient();
  const showToast = useCustomToast();
  const { user } = useAuth();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const navigate = useNavigate();
  const total_price = vehicle && vehicle.price_per_day && total_days
                            ? `${Number(vehicle.price_per_day) * Number(total_days)} €`
                            : ''

  const {
      handleSubmit: handleUserSubmit,
      register: userRegister,
      formState: { isValid: isUserFormValid }
    } = useForm<UserReadModel>({
      mode: 'onBlur',
      criteriaMode: 'all',
      defaultValues: user || {
        document_type: 'NIF',
        document_id: '',
        expiration_date: '',
        first_name: '',
        last_name: '',
        email: '',
        phone_number: '',
        address: '',
        birth_date: ''
      },
    });

  const {
    handleSubmit: handleRentSubmit,
  } = useForm<RentCreateModel>({
    mode: 'onBlur',
    criteriaMode: 'all',
    defaultValues: {
      amount: vehicle?.price_per_day || parseInt(total_days),
      pickup_date: convertToISO(pickup_date),
      return_date: convertToISO(return_date),
      office_id: parseInt(office_id),
      vehicle_id: parseInt(vehicle_id),
      user_id: user?.id_ || 0,
      total_days: parseInt(total_days) || 0,
    },
  });

  const {
    handleSubmit: handleRGPDSubmit,
    register: rgpdRegister
  } = useForm<RGPDCreateModel>({
    mode: 'onBlur',
    criteriaMode: 'all',
    defaultValues: {
      lssi: false,
      rgpd: false,
      user_id: user?.id_ || 0,
    },
  });

  const updateUserMutation = useMutation(AuthService.updateUserMeApiV1AuthUserPatch, {
    onSuccess: async () => {
      try {
        await handleRGPDSubmit(onSubmitRGPD)();
        await handleRentSubmit(onSubmitRent)();
        console.log('Rent created successfully');
        navigate({to: "/success"});
      } catch (err) {
        showToast('Ops! No se pudo crear la reserva.', 'Intenta de nuevo más tarde.', 'error');
        console.error('Error:', err);
      }
    },
    onError: (err: ApiError) => {
      console.error(err);
      showToast('Ops! No se pudo crear la reserva.', 'Intenta de nuevo más tarde.', 'error');
    },
    onSettled: () => {
      queryClient.invalidateQueries('rents');
    },
  });

  const handleUserFormSubmit: SubmitHandler<UserReadModel> = (data) => {
    const formattedData = {
      ...data,
      expiration_date: format(parseISO(data.expiration_date || ''), 'yyyy-MM-dd'),
      birth_date: format(parseISO(data.birth_date || ''), 'yyyy-MM-dd'),
    };

    updateUserMutation.mutate({requestBody: formattedData});
  };

  const addRent = async (data: RentCreateModel) => {
    await RentService.createRentApiV1RentsPost({ requestBody: data });
  };

  const onSubmitRent: SubmitHandler<RentCreateModel> = async (data) => {
    await addRent(data);
    showToast('Reserva creada con éxito', 'Gracias por su reserva', 'success');
  };

  const addRGPD = async (data: RGPDCreateModel) => {
    await RgpdService.createRgpdApiV1RgpdPost({ requestBody: data });
  };

  const onSubmitRGPD: SubmitHandler<RGPDCreateModel> = async (data) => {
    await addRGPD(data);
  };

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const [vehicleResponse, officeResponse] = await Promise.all([
          vehicle_id ? VehicleService.getVehicleApiV1VehiclesIdGet({ id: parseInt(vehicle_id) }) : null,
          office_id ? OfficeService.getOfficeApiV1OfficesIdGet({ id: parseInt(office_id) }) : null
        ]);
        setVehicle(vehicleResponse);
        setOffice(officeResponse);
      } catch (error) {
        console.error('There was an error!', error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [vehicle_id, office_id]);

  const currentPath = '/rent?' + window.location.href.split('?')[1];

  return (
    <>
      <NavBarWithSubnavigation />
      <UserMenu />
      <Flex mt={70} mb={70} direction="column" maxW="large" h="auto" alignItems="center">
        {loading ? (
          <Spinner size="xl" />
        ) : (
          <Grid
            templateColumns={{ base: "1fr", md: "2fr 1fr" }}
            gap={6}
            p={5}
          >
            <Box borderWidth="1px" borderRadius="lg" p={5}>
                <VStack spacing={4} align="stretch">
                                  <Text fontSize="xl" fontWeight="bold">Datos conductor:</Text>
                  {isLoggedIn() ? (
                    <>
                      <HStack spacing={1}>
                        <FormControl id="document_type">
                          <FormLabel>Tipo de Documento</FormLabel>
                          <Select {...userRegister('document_type')} required>
                            {['NIF', 'CIF', 'NIE', 'Pasaporte'].map((type) => (
                              <option key={type} value={type}>{type}</option>
                            ))}
                          </Select>
                        </FormControl>
                        <FormControl id="document_id">
                          <FormLabel>Num Documento</FormLabel>
                          <Input {...userRegister('document_id')} required type="text" />
                        </FormControl>
                        <FormControl id="expiration_date">
                          <FormLabel>Fecha de caducidad</FormLabel>
                          <Input
                            defaultValue={user?.expiration_date || ''}
                            {...userRegister('expiration_date')}
                            required
                            type="date"
                            min={formatISO(startOfDay(new Date()), { representation: 'date' })}
                          />
                        </FormControl>
                      </HStack>
                      <HStack spacing={4}>
                        <FormControl id="first_name">
                          <FormLabel>Nombre</FormLabel>
                          <Input defaultValue={user?.first_name || ''} {...userRegister('first_name')} required type="text" />
                        </FormControl>
                        <FormControl id="last_name">
                          <FormLabel>Apellidos</FormLabel>
                          <Input defaultValue={user?.last_name || ''} {...userRegister('last_name')} required type="text" />
                        </FormControl>
                      </HStack>
                      <HStack spacing={4}>
                        <FormControl id="email">
                          <FormLabel>Email <Text as="span" color="red">*</Text></FormLabel>
                          <Input disabled={true} defaultValue={user?.email || ''} {...userRegister('email')} required type="email" isReadOnly />
                        </FormControl>
                        <FormControl id="phone_number">
                          <FormLabel>Teléfono</FormLabel>
                          <Input defaultValue={user?.phone_number || ''} {...userRegister('phone_number')} required type="tel" />
                        </FormControl>
                      </HStack>
                      <HStack spacing={4}>
                        <FormControl id="address">
                          <FormLabel>Dirección</FormLabel>
                          <Input defaultValue={user?.address || ''} {...userRegister('address')} required type="text" />
                        </FormControl>
                        <FormControl id="birth_date">
                          <FormLabel>Fecha de nacimiento</FormLabel>
                         <Input
                            defaultValue={user?.birth_date || ''}
                            {...userRegister('birth_date')}
                            required
                            type="date"
                            max={formatISO(startOfDay(new Date()), { representation: 'date' })}
                          />
                        </FormControl>
                      </HStack>
                      <FormControl id="rgpd">
                        <Checkbox {...rgpdRegister('rgpd')} colorScheme="green" required>
                          Acepto la política de privacidad
                          <Text as={Link} to="/privacy" color="red"> *</Text>
                        </Checkbox>
                      </FormControl>
                      <FormControl id="lssi">
                        <Checkbox {...rgpdRegister('lssi')} colorScheme="green">
                          Acepto recibir comunicaciones comerciales
                        </Checkbox>
                      </FormControl>
                      <Text fontSize="sm"><Text as="span" color="red">*</Text> Para las siguientes modificaciones, <Text as={Link} to="/contact" textDecoration="underline">póngase en contacto con soporte</Text>.</Text>
                      <Text fontSize="xl" fontWeight="bold">Vales y bonificaciones:</Text>
                      <FormControl id="vales">
                        <Input type="text" placeholder="Añadir cupón" />
                      </FormControl>
                    </>
                  ) : (
                    <Box>
                      <Link to={`/login?nextUrl=${currentPath}` as "/login"}>
                        <Box border="2px" borderRadius="md" borderColor="green.500" p={2}>
                          <Stack direction="column" align="center" spacing={2}>
                            <Avatar boxSize={6} bg="green.500" />
                            <Text fontSize="lg" color="green.500">Iniciar sesión</Text>
                          </Stack>
                        </Box>
                      </Link>
                      <Link to="/signup">
                        <Text fontSize="medium" color="green.500">¿No tienes cuenta?</Text>
                      </Link>
                    </Box>
                  )}
                  <Text fontSize="xl" fontWeight="bold" mt={isLoggedIn() ? "0" : "120%"}>Total:</Text>
                  <FormControl id="total">
                    {loading ? (
                      <Spinner size="xl" />
                    ) : vehicle ? (
                      <Input
                        type="text"
                        readOnly
                        value={total_price}
                      />
                    ) : (
                      <Text>No se encontró información del vehículo.</Text>
                    )}
                  </FormControl>
                  <Button colorScheme="green" mt={4} onClick={onOpen} isDisabled={!isUserFormValid}>
                    ¡Reservar ahora!
                  </Button>
                  <Modal isOpen={isOpen} onClose={onClose}>
                    <ModalOverlay />
                    <ModalContent alignItems="center" justifyContent="center">
                      <ModalHeader>Pago con tarjeta 💳</ModalHeader>
                      <ModalCloseButton />
                      <ModalBody>
                        <PaymentGateway onClose={onClose} total_price={parseFloat(total_price)} handleUserFormSubmit={handleUserSubmit(handleUserFormSubmit)} />
                      </ModalBody>
                    </ModalContent>
                  </Modal>
                </VStack>
            </Box>
            <GridItem borderWidth="1px" borderRadius="lg" p={5}>
              {loading ? (
                <Spinner size="xl" />
              ) : vehicle ? (
                <VStack spacing={4} align="stretch">
                  <Image
                    objectFit="cover"
                    width="100%"
                    height="200px"
                    src={getImageSrc(vehicle?.image_url || "")}
                    alt="Foto del vehículo"
                    borderRadius="md"
                  />
                  <HStack spacing={4}>
                    <Center>
                      <Icon as={FaUsers} />
                      <Text ml={2}>{vehicle.passengers}</Text>
                    </Center>
                    <Center>
                      <Icon as={FaCogs} />
                      <Text ml={2}>{vehicle.gearbox}</Text>
                    </Center>
                    <Center>
                      <Icon as={IoSpeedometerOutline} boxSize="20px" />
                      <Text ml={2}>{vehicle.avg_consumption} L/100km</Text>
                    </Center>
                  </HStack>
                  <Text fontSize="xl" fontWeight="bold">{vehicle.brand} {vehicle.model}</Text>
                  <Text>Tipo: {vehicle.body_type}</Text>
                  <Text>Días de alquiler: {total_days} - Precio por día: {vehicle.price_per_day}€</Text>
                  {loading ? (
                    <Spinner size="xl" />
                  ) : office ? (
                    <>
                      <Text fontSize="lg" fontWeight="bold">Recogida</Text>
                      <Text>Dirección: {office.address}, {office.postal_code}, {office.city}</Text>
                      <Text>Fecha y hora: {pickup_date}</Text>
                      <Text fontSize="lg" fontWeight="bold">Devolución</Text>
                      <Text>Dirección: {office.address}, {office.postal_code}, {office.city}</Text>
                      <Text>Fecha y hora: {return_date}</Text>
                    </>
                  ) : (
                    <Text>No se encontró información de la oficina.</Text>
                  )}
                  <Text fontSize="lg" fontWeight="bold">Resumen de reserva:</Text>
                  <Text>✅ Seguro contra daño a terceros</Text>
                </VStack>
              ) : (
                <Text>No se encontró información del vehículo.</Text>
              )}
          </GridItem>
          </Grid>
        )}
      </Flex>
      <Footer />
    </>
  );
}

export default Rent;
