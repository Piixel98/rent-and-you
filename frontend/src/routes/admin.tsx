import {
  Container,
  Heading,
  Tab,
  TabList,
  TabPanel,
  TabPanels,
  Tabs,
  VStack,
} from '@chakra-ui/react';
import { createFileRoute, redirect, useNavigate } from '@tanstack/react-router';
import OfficesAdmin from './admin/offices.tsx';
import VehiclesAdmin from './admin/vehicles.tsx';
import RentsAdmin from './admin/rents.tsx';
import UsersAdmin from './admin/users.tsx';
import NavBarWithSubnavigation from '../components/Common/Navbar.tsx';
import UserMenu from '../components/Common/UserMenu.tsx';
import Footer from '../components/Common/Footer.tsx';
import useAuth, { isLoggedIn } from '../hooks/useAuth.ts';

const tabsConfig = [
  { title: 'Oficinas', component: OfficesAdmin },
  { title: 'Vehículos', component: VehiclesAdmin },
  { title: 'Usuarios', component: UsersAdmin },
  { title: 'Alquileres', component: RentsAdmin },
];

export const Route = createFileRoute('/admin')({
  component: AdminPanel,
  beforeLoad: async () => {
    if (!isLoggedIn()) {
      throw redirect({
        to: '/',
      });
    }
  },
});

function AdminPanel() {
  const navigate = useNavigate();
  const { user } = useAuth();
  if (user?.role !== 'admin') {
    navigate({ to: '/search' });
  }

  return (
    <>
      <NavBarWithSubnavigation />
      <UserMenu />
      <Container mt={50} ml={10} maxW="full">
        <Heading color={"green.400"} size="lg" textAlign={{ base: 'center', md: 'left' }} py={12}>
          Panel de administración
        </Heading>
        <VStack mb="60" spacing={8} align="stretch">
          {isLoggedIn() ? (
            <>
              <Tabs colorScheme="green" width={"full"}>
                <TabList>
                  {tabsConfig.map((tab, index) => (
                    <Tab key={index}>{tab.title}</Tab>
                  ))}
                </TabList>
                <TabPanels>
                  {tabsConfig.map((tab, index) => (
                    <TabPanel key={index}>
                      <tab.component />
                    </TabPanel>
                  ))}
                </TabPanels>
              </Tabs>
            </>
          ) : (
            <Heading size="md" textAlign="center">
              Inicia sesión para acceder al panel de administración
            </Heading>
          )}
        </VStack>
      </Container>
      <Footer />
    </>
  );
}

export default AdminPanel;
