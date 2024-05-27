import {
  Text,
  Box,
  Flex,
  Select,
  FormControl,
  FormLabel,
  Button,
  Grid,
  Container,
  Image,
  Link, Input, useColorMode
} from "@chakra-ui/react";
import { createFileRoute } from '@tanstack/react-router';
import UserMenu from "../components/Common/UserMenu.tsx";
import Footer from "../components/Common/Footer.tsx";
import { useState, useEffect } from 'react';
import { useNavigate } from '@tanstack/react-router';
import { OfficeService, OfficeReadModel } from '../client';
import logoBarcelona from '../assets/images/barcelona-card.jpg';
import logoMadrid from '../assets/images/madrid-card.jpg';
import logoValencia from '../assets/images/valencia-card.jpg';
import "react-datepicker/dist/react-datepicker.css";
import { SearchIcon } from "@chakra-ui/icons";
import NavBarWithSubnavigation from "../components/Common/Navbar.tsx";
import DatePicker from "react-datepicker";
import { useForm } from "react-hook-form";
import { format, differenceInDays, addDays } from 'date-fns';
import { es } from 'date-fns/locale';

export const Route = createFileRoute('/search')({
  component: Search,
  beforeLoad: () => {},
});

function Search() {
  const { colorMode } = useColorMode();
  const textColor = colorMode === 'dark' ? 'white' : 'black';
  const hoverColor = colorMode === 'dark' ? 'black' : 'white';

  const minDate = new Date();
  const maxDate = new Date(minDate);
  maxDate.setFullYear(minDate.getFullYear() + 1);

  const [pickupOffice, setPickupOffice] = useState('');
  const [pickupDate, setPickupDate] = useState<Date | null>(new Date());
  const [returnDate, setReturnDate] = useState<Date | null>(new Date());
  const [offices, setOffices] = useState<OfficeReadModel[]>([]);

  const { register, handleSubmit, formState: { errors } } = useForm();
  const navigate = useNavigate();

  const onSubmit = (data: any) => {
    let url = '/vehicles?';

    if (data.pickupOffice) {
      url += `office_id=${data.pickupOffice}&`;
    }

    if (pickupDate) {
      const formattedPickupDate = format(pickupDate, 'dd/MM/yyyy HH:mm');
      url += `pickup_date=${formattedPickupDate}&`;
    }

    if (returnDate) {
      const formattedReturnDate = format(returnDate, 'dd/MM/yyyy HH:mm');
      url += `return_date=${formattedReturnDate}&`;
    }

    let total_days = 0;
    if (pickupDate && returnDate) {
      total_days = differenceInDays(returnDate, pickupDate);
    } else {
      console.error('pickupDate y/o returnDate son nulos');
    }
    if (total_days === 0) {
      total_days = 1;
    }
    url += `total_days=${total_days}&`;

    if (url.endsWith('&')) {
      url = url.slice(0, -1);
    }

    navigate({ to: url });
  };

  useEffect(() => {
    OfficeService.getOfficesApiV1OfficesGet({})
      .then(response => {
        setOffices(response);
      })
      .catch(error => {
        console.error('There was an error!', error);
      });
  }, []);

  const [hoveredBox, setHoveredBox] = useState<number | null>(null);

  const handleMouseEnter = (boxIndex: number) => {
    setHoveredBox(boxIndex);
  };

  const handleMouseLeave = () => {
    setHoveredBox(null);
  };

  const handleClick = (link: string) => {
    const today = new Date();
    const returnDate = addDays(today, 3);

    const formattedPickupDate = format(today, 'dd/MM/yyyy HH:mm');
    const formattedReturnDate = format(returnDate, 'dd/MM/yyyy HH:mm');

    const urlWithDates = `${link}?
    pickup_date=${formattedPickupDate}
    &return_date=${formattedReturnDate}
    &total_days=3
    &office_id=1`;

    navigate({ to: urlWithDates });
  };

  const boxData = [
    { name: "Vehículos de Barcelona", link: "/vehicles", image: logoBarcelona },
    { name: "Vehículos de Madrid", link: "/vehicles", image: logoMadrid },
    { name: "Vehículos de Valencia", link: "/vehicles", image: logoValencia },
  ];

  return (
    <Flex direction="column" maxW="large" h="auto" minH="100vh" alignContent="center">
      <NavBarWithSubnavigation />
      <UserMenu />
      <Container maxW="3xl" display="flex" flexDirection="column" justifyContent="center" alignItems="center">
        <Box mt={100} textAlign="center">
          <form onSubmit={handleSubmit(onSubmit)}>
            <FormControl display="inline-block" mx={2}>
              <FormLabel>Oficina de recogida</FormLabel>
              <Select
                zIndex="3000"
                placeholder="Selecciona una oficina"
                {...register("pickupOffice", { required: true })}
                value={pickupOffice}
                onChange={(e) => setPickupOffice(e.target.value)}>
                {offices.map((office: OfficeReadModel, index) => (
                  <option key={index} value={office.id_}>{office.name}</option>
                ))}
              </Select>
              {errors.pickupOffice && <Text color="red.500">Este campo es obligatorio</Text>}
            </FormControl>
            <FormControl mt={5} display="flex" alignItems="center" justifyContent="space-between">
              <div style={{ zIndex: 2000 }}>
                <Box mx={2}>
                  <FormLabel>Fecha de recogida</FormLabel>
                  <DatePicker
                    selected={pickupDate}
                    locale={es}
                    onChange={(date: Date | null) => {
                      if (date) {
                        setPickupDate(date);
                        if (date > returnDate!) {
                          setReturnDate(date);
                        }
                      }
                    }}
                    showTimeSelect
                    required
                    dateFormat="dd/MM/yyyy HH:mm"
                    minDate={minDate}
                    maxDate={maxDate}
                    customInput={<Input />}
                    />
                {errors.pickupDate && <Text color="red.500">Este campo es obligatorio</Text>}
              </Box>
              </div>
              <div style={{ zIndex: 2000 }}>
                <Box mx={2}>
                  <FormLabel>Fecha de devolución</FormLabel>
                  <DatePicker
                    selected={returnDate}
                    onChange={(date: Date | null) => {
                      if (date) {
                        setReturnDate(date);
                        if (date < pickupDate!) {
                          setPickupDate(date);
                        }
                      }
                    }}
                    showTimeSelect
                    dateFormat="dd/MM/yyyy HH:mm"
                    minDate={pickupDate}
                    maxDate={maxDate}
                    required
                    customInput={<Input />}
                  />
                  {errors.returnDate && <Text color="red.500">Este campo es obligatorio</Text>}
                </Box>
               </div>
            </FormControl>
            <Box mt={4} textAlign="center">
              <Link>
                <Button type="submit" colorScheme="green" rightIcon={<SearchIcon />}>Buscar</Button>
              </Link>
            </Box>
          </form>
        </Box>
        <Flex justify="center" align="center" textAlign={"center"} width="full" p={4} mt={{ base: 4, md: 100 }}>
          <Text fontWeight="bold">Nuestros TOP destinos para alquilar tu vehículo</Text>
        </Flex>
        <Grid mb="150" templateColumns={{ base: "repeat(1, 1fr)", md: "repeat(3, 1fr)" }} gap={6} mt={10} textAlign="center">
          {boxData.map((box, index) => (
            <Box
              key={index}
              borderWidth="1px"
              borderRadius="lg"
              p={24}
              position="relative"
              onMouseEnter={() => handleMouseEnter(index)}
              onMouseLeave={handleMouseLeave}
              onClick={() => handleClick(box.link)}
              cursor="pointer"
            >
              <Text
                fontSize="xl"
                color={hoveredBox === index ? hoverColor : textColor}
                zIndex="2"
                position="relative"
                transition="all 0.3s ease-in-out"
              >
                {box.name}
              </Text>
              <Image
                src={box.image}
                alt={box.name}
                position="absolute"
                objectFit="cover"
                top="0"
                left="0"
                right="0"
                bottom="0"
                borderRadius="0"
                zIndex="1"
                opacity={hoveredBox === index ? 1 : 0.1}
                filter={hoveredBox === index ? "none" : "grayscale(100%)"}
                width="100%"
                height="100%"
                transition="all 0.3s ease-in-out"
              />
            </Box>
          ))}
        </Grid>
      </Container>
      <Box mt="auto">
        <Footer />
      </Box>
    </Flex>
  );
}

export default Search;
