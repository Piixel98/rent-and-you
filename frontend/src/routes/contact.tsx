import {
  Box,
  Flex,
} from "@chakra-ui/react";
import { createFileRoute } from '@tanstack/react-router';
import UserMenu from "../components/Common/UserMenu";
import Footer from "../components/Common/Footer";

import "react-datepicker/dist/react-datepicker.css";

import NavBarWithSubnavigation from "../components/Common/Navbar";
import Contact from "../components/Home/Contact";


export const Route = createFileRoute('/contact')({
  component: ContactComponent,
  beforeLoad: () => {},
});

function ContactComponent() {
  return (
    <Flex direction="column" maxW="large" h="auto" minH="100vh">
        <NavBarWithSubnavigation />
        <UserMenu />
        <Contact />
        <Box mt="auto">
          <Footer />
        </Box>
    </Flex>
  );
}

export default ContactComponent;
