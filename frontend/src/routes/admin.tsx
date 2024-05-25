import {
    Container,
    Heading,
    VStack,
} from '@chakra-ui/react';
import {createFileRoute,  redirect, useNavigate} from '@tanstack/react-router';
import OfficesAdmin from "./admin/offices.tsx";
import VehiclesAdmin from "./admin/vehicles.tsx";
import RentsAdmin from "./admin/rents.tsx";
import UsersAdmin from "./admin/users.tsx";
import NavBarWithSubnavigation from "../components/Common/Navbar.tsx";
import UserMenu from "../components/Common/UserMenu.tsx";
import Footer from "../components/Common/Footer.tsx";
import {isLoggedIn, getRole} from "../hooks/useAuth.ts";


export const Route = createFileRoute('/admin')({
    component: AdminPanel,
    beforeLoad: async () => {
    if (!isLoggedIn()) {
      throw redirect({
        to: '/',
      })
    }
  },
});

function AdminPanel() {
    const navigate = useNavigate()

    if (getRole() !== 'admin') {
        navigate({to: '/search'});
    }

  return (
     <Container maxW="full">
      <NavBarWithSubnavigation />
      <UserMenu />
      <Heading mt="70" size="lg" textAlign={{ base: 'center', md: 'left' }} py={12}>
        Admin Panel
      </Heading>
      <VStack mb="60" spacing={8} align="stretch">
          {isLoggedIn() ? (
              <>
                  <Heading size="md" textAlign="center">Panel de administración</Heading>
                  <OfficesAdmin/>
                  <VehiclesAdmin/>
                  <UsersAdmin/>
                  <RentsAdmin/>
              </>
          ) : (
              <Heading size="md" textAlign="center">Inicia sesión para acceder al panel de administración</Heading>
              )
          }
      </VStack>
        <Footer />
    </Container>
  );
}

export default AdminPanel;
