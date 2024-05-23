import {
  Box,
  Flex,
} from "@chakra-ui/react";
import { createFileRoute } from '@tanstack/react-router';
import UserMenu from "../components/Common/UserMenu.tsx";
import Footer from "../components/Common/Footer.tsx";
import {useEffect, useState} from 'react';
import "react-datepicker/dist/react-datepicker.css";
import NavBarWithSubnavigation from "../components/Common/Navbar.tsx";
import {OfficeService} from "../client";

export const Route = createFileRoute('/offices')({
  component: Offices,
  beforeLoad: () => {},
});

function Offices() {
  const [office, setOffices] = useState([]);

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
        <Box mt="auto">
          <Footer />
        </Box>
    </Flex>
  );
}

export default Offices;
