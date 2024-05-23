import {
    Container,
    Heading,
    VStack,
} from '@chakra-ui/react';
import {createFileRoute} from '@tanstack/react-router';
import OfficesAdmin from "./admin/offices.tsx";
import VehiclesAdmin from "./admin/vehicles.tsx";
import RentsAdmin from "./admin/rents.tsx";
import UsersAdmin from "./admin/users.tsx";
import NavBarWithSubnavigation from "../components/Common/Navbar.tsx";
import UserMenu from "../components/Common/UserMenu.tsx";
import Footer from "../components/Common/Footer.tsx";

export const Route = createFileRoute('/admin')({
  component: AdminPanel,
});

function AdminPanel() {
  return (
     <Container maxW="full">
      <NavBarWithSubnavigation />
      <UserMenu />
      <Heading mt="70" size="lg" textAlign={{ base: 'center', md: 'left' }} py={12}>
        Admin Panel
      </Heading>
      <VStack mb="60" spacing={8} align="stretch">
        <OfficesAdmin />
        <VehiclesAdmin />
        <UsersAdmin />
        <RentsAdmin />
      </VStack>
        <Footer />
    </Container>
  );
}

export default AdminPanel;
