import NavBarWithSubnavigation from "../components/Common/Navbar.tsx";
import UserMenu from "../components/Common/UserMenu.tsx";
import {Box, Flex} from "@chakra-ui/react";
import Footer from "../components/Common/Footer.tsx";
import {createFileRoute, redirect} from '@tanstack/react-router';
import SuccessComponent from "../components/Rent/Success.tsx";
import {isLoggedIn} from "../hooks/useAuth.ts";

export const Route = createFileRoute('/success')({
  component: LoginPage,
  beforeLoad: async () => {
    if (!isLoggedIn()) {
      throw redirect({
        to: '/',
      })
    }
  }
});

function LoginPage() {
  return (
      <Flex direction="column" maxW="large" h="auto" minH="100vh">
        <NavBarWithSubnavigation />
        <UserMenu />
        <SuccessComponent />
        <Box mt="auto">
          <Footer />
        </Box>
    </Flex>
  );
};

export default LoginPage;
