import {
    Box,
    Flex,
    Text,
    Icon,
    SimpleGrid, Heading,
} from "@chakra-ui/react";
import { FaBuilding } from 'react-icons/fa';
import { createFileRoute } from '@tanstack/react-router';
import UserMenu from "../components/Common/UserMenu.tsx";
import Footer from "../components/Common/Footer.tsx";
import {useEffect, useState} from 'react';
import "react-datepicker/dist/react-datepicker.css";
import NavBarWithSubnavigation from "../components/Common/Navbar.tsx";
import {OfficeService, OfficeReadModel} from "../client";

export const Route = createFileRoute('/offices')({
  component: Offices,
  beforeLoad: () => {},
});

function Offices() {
  const [offices, setOffices] = useState<OfficeReadModel[]>([]);

  useEffect(() => {
    OfficeService.getOfficesApiV1OfficesGet({})
      .then(response => {
        setOffices(response);
      })
      .catch(error => {
        console.error('There was an error!', error);
      });
  }, []);

  return (
    <Flex direction="column" maxW="large" h="auto" minH="100vh">
        <NavBarWithSubnavigation />
        <UserMenu />
        <Heading as="h1" size="xl" textAlign="center" mt={100}>Oficinas <Text color={"green.400"}>&You</Text></Heading>
        <SimpleGrid columns={{ base: 1, md: 3 }} spacing={10} mt={10}>
          {offices.map((office) => (
            <Box key={office.id_} ml={10} mr={10}
                 p={5} shadow="md" borderWidth="1px" borderRadius="lg">
              <Icon as={FaBuilding} w={6} h={6} />
              <Text mt={4} fontWeight="bold">{office.name} - {office.city}</Text>
              <Text mt={2}>{office.address}</Text>
              <Text mt={2}>Teléfono: {office.phone}</Text>
            </Box>
          ))}
        </SimpleGrid>
        <Box mt="auto">
          <Footer />
        </Box>
    </Flex>
  );
}

export default Offices;
