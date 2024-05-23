import NavBarWithSubnavigation from "../components/Common/Navbar.tsx";
import UserMenu from "../components/Common/UserMenu.tsx";
import {Box, Flex} from "@chakra-ui/react";
import Footer from "../components/Common/Footer.tsx";
import { createFileRoute } from '@tanstack/react-router';
import LoginUser from "../components/Auth/LoginUser.tsx";

export const Route = createFileRoute('/login')({
  component: LoginPage,
  beforeLoad: () => {},
});

function LoginPage() {
  return (
      <Flex direction="column" maxW="large" h="auto" minH="100vh">
        <NavBarWithSubnavigation />
        <UserMenu />
        <LoginUser />
        <Box mt="auto">
          <Footer />
        </Box>
    </Flex>
  );
};

export default LoginPage;
