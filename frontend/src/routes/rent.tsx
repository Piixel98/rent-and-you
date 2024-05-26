import {useEffect, useState} from 'react';
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
  Icon, Center, Stack, Avatar, Select
} from "@chakra-ui/react";
import {createFileRoute, Link, useNavigate} from '@tanstack/react-router';
import UserMenu from "../components/Common/UserMenu.tsx";
import Footer from "../components/Common/Footer.tsx";
import "react-datepicker/dist/react-datepicker.css";
import NavBarWithSubnavigation from "../components/Common/Navbar.tsx";
import NoVehicleImage from "../assets/images/no-vehicle.svg";
import { parse, formatISO } from 'date-fns';
import {
  OfficeService,
  VehicleService,
  ApiError,
  RentCreateModel,
  RentService,
  VehicleReadModel,
  OfficeReadModel,
  DocumentType
} from "../client";
import {SubmitHandler, useForm} from 'react-hook-form';
import { useMutation, useQueryClient } from 'react-query';
import useCustomToast from '../hooks/useCustomToast';
import {FaCogs, FaUsers} from "react-icons/fa";
import {IoSpeedometerOutline} from "react-icons/io5";
import {isLoggedIn} from "../hooks/useAuth.ts";

export const Route = createFileRoute('/rent')({
  component: Rent,
  beforeLoad: () => {},
});

const getImageSrc = (image: string | null) => {
    if (!image || image == "" || !image.includes('https')) {
        return NoVehicleImage;
    }
    return image;
}

const convertToISO = (dateString: string | null) => {
  if (!dateString) {
    return "";
  }
  const parsedDate = parse(dateString, "dd/MM/yyyy HH:mm", new Date());
  return formatISO(parsedDate);
}

function Rent() {
  const queryParams = new URLSearchParams(window.location.search);
  const office_id = queryParams.get('office_id') || "";
  const pickup_date = queryParams.get('pickup_date') || "";
  const vehicle_id = queryParams.get('vehicle_id') || "";
  const return_date = queryParams.get('return_date') || "";
  const total_days = queryParams.get('total_days') || "";
  const [vehicle, setVehicle] = useState<VehicleReadModel | null>(null);
  const [office, setOffice] = useState<OfficeReadModel | null>(null);
  const [loading, setLoading] = useState(true);
  const queryClient = useQueryClient();
  const showToast = useCustomToast();
  const navigate = useNavigate();

  const documentTypes: DocumentType[] = ['nif', 'cif', 'nie', 'passport'];

  const {
    handleSubmit,
    formState: { isValid }
  } = useForm<RentCreateModel>({
    mode: 'onBlur',
    criteriaMode: 'all',
    defaultValues: {
      amount: vehicle ? vehicle?.price_per_day ?? 0 * parseInt(total_days) : 0,
      pickup_date: convertToISO(pickup_date),
      return_date: convertToISO(return_date),
      office_id: parseInt(office_id),
      vehicle_id: parseInt(vehicle_id),
      user_id: 0,
      total_days: total_days ? parseInt(total_days) : 0
    },
  });

  const addRent = async (data: RentCreateModel) => {
    await RentService.createRentApiV1RentsPost({ requestBody: data });
  }

  const mutation = useMutation(addRent, {
    onSuccess: () => {
      showToast('Reserva creada!', 'Reserva creada correctamente.', 'success');
      navigate({to: "/search"});
    },
    onError: (err: ApiError) => {
      const errDetail = err.body.detail;
      console.error('There was an error!', errDetail);
        showToast('Ops! No se pudo crear la reserva.', 'Intena de nuevo más tarde.', 'error');
    },
    onSettled: () => {
      queryClient.invalidateQueries('rents');
    },
  });

  const onSubmit: SubmitHandler<RentCreateModel> = (data) => {
    mutation.mutate(data);
  }

  useEffect(() => {
    let fetchVehicles;
    let fetchOffice;
    if (vehicle_id) {
      fetchVehicles = VehicleService.getVehicleApiV1VehiclesIdGet({ id: parseInt(vehicle_id)});
    }
    if (office_id!==null) {
      fetchOffice = OfficeService.getOfficeApiV1OfficesIdGet({ id: parseInt(office_id)});
    }

    if (fetchVehicles) {
      fetchVehicles
        .then(response => {
          setVehicle(response);
          setLoading(false);
        })
        .catch(error => {
          console.error('There was an error!', error);
          setLoading(false);
        });
    }
    if (fetchOffice) {
      fetchOffice
        .then(response => {
          setOffice(response);
          setLoading(false);
        })
        .catch(error => {
          console.error('There was an error!', error);
          setLoading(false);
        });
    }
  }, [vehicle_id, office_id]);

  return (
    <>
      <NavBarWithSubnavigation />
      <UserMenu />
        <Flex mt={90} direction="column" maxW="large" h="auto" alignItems="center">
          <Grid templateColumns="2fr 1fr" gap={6} p={5}>
            <Box as="form" borderWidth="1px" borderRadius="lg" p={5} onSubmit={handleSubmit(onSubmit)}>
              <VStack spacing={4} align="stretch">
                <Text fontSize="xl" fontWeight="bold">Datos conductor:</Text>
                 {isLoggedIn() ? (
                     <>
                       <HStack spacing={1}>
                         <FormControl id="document_type">
                            <FormLabel>Tipo de Documento</FormLabel>
                            <Select required>
                              {documentTypes.map((type) => (
                                <option key={type} value={type}>{type.toUpperCase()}</option>
                              ))}
                            </Select>
                          </FormControl>
                          <FormControl id="document_id">
                              <FormLabel>Documento de Identidad</FormLabel>
                              <Input required type="text" />
                          </FormControl>
                             <FormControl id="fecha_caducidad">
                            <FormLabel>Fecha de caducidad</FormLabel>
                            <Input required type="date" />
                          </FormControl>
                          </HStack>
                    <HStack spacing={4}>
                      <FormControl id="nombre">
                        <FormLabel>Nombre</FormLabel>
                        <Input required type="text" />
                      </FormControl>
                      <FormControl id="apellido1">
                        <FormLabel>Apellido 1</FormLabel>
                        <Input required type="text" />
                      </FormControl>
                      <FormControl id="apellido2">
                        <FormLabel>Apellido 2</FormLabel>
                        <Input type="text" />
                      </FormControl>
                    </HStack>
                       <HStack spacing={4}>
                        <FormControl id="email">
                          <FormLabel>Email</FormLabel>
                          <Input required type="email"  />
                        </FormControl>
                          <FormControl id="telefono">
                            <FormLabel>Teléfono</FormLabel>
                            <Input required type="tel" />
                          </FormControl>
                       </HStack>
                    <HStack spacing={4}>
                      <FormControl id="direccion">
                        <FormLabel>Dirección</FormLabel>
                        <Input required type="text" />
                      </FormControl>
                      <FormControl id="fecha-nacimiento">
                        <FormLabel>Fecha de nacimiento</FormLabel>
                        <Input required type="date" />
                      </FormControl>
                    </HStack>
                    <FormControl id="rgpd">
                      <Checkbox colorScheme="green" required>Acepto la política de privacidad
                        <Text as={Link} to={"/privacy"} color={"green.400"}> *</Text>
                      </Checkbox>
                    </FormControl>
                    <FormControl id="lssi">
                      <Checkbox colorScheme="green">Acepto recibir comunicaciones comerciales</Checkbox>
                    </FormControl>
                    <Text fontSize="xl" fontWeight="bold">Vales y bonificaciones:</Text>
                    <FormControl id="vales">
                      <Input type="text" placeholder="Añadir cupón" />
                    </FormControl>
                     </>
                ) : (
                    <Box>
                      <Link to="/login">
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
                    <>
                      {total_days == null || total_days === "" ? (
                        <Input type="text" readOnly value={`${vehicle?.price_per_day}.00 €`} />
                      ) : (
                        <Input type="text" readOnly value={`${vehicle?.price_per_day || 0 * parseInt(total_days)}.00 €`} />
                      )}
                    </>
                  ) : (
                    <Text>No se encontró información del vehículo.</Text>
                  )}
                </FormControl>
                <Button
                  colorScheme={"green"}
                  mt={4}
                  type="submit"
                  isDisabled={!isValid}
                >
                  ¡Reservar ahora!
                </Button>
              </VStack>
            </Box>
            <GridItem borderWidth="1px"  borderRadius="lg" p={5}>
              {loading ? (
                <Spinner size="xl" />
                  ) : vehicle ? (
                    <VStack spacing={4} align="stretch">
                      <Image objectFit="cover" width="100%" height="200px" src={getImageSrc(vehicle?.image_url || "")} alt="Foto del vehículo" borderRadius="md" />
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
                      <Text>Días de alquiler: {total_days} -  Precio por día: {vehicle.price_per_day}€</Text>
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
                      <Text> ✅ Seguro contra daño a terceros </Text>
                    </VStack>
                  ) : (
                <Text>No se encontró información del vehículo.</Text>
              )}
            </GridItem>
          </Grid>
        </Flex>
        <Box mt="auto">
          <Footer />
        </Box>
    </>
  );
}

export default Rent;
