import NavBarWithSubnavigation from "../components/Common/Navbar";
import UserMenu from "../components/Common/UserMenu";
import { Box, Flex } from "@chakra-ui/react";
import Footer from "../components/Common/Footer";
import { createFileRoute } from '@tanstack/react-router';
import LoginUser from "../components/Auth/LoginUser";

export const Route = createFileRoute('/login')({
  component: LoginPage,
  beforeLoad: () => {},
});

function LoginPage() {
  const queryParams = new URLSearchParams(window.location.search);
  const nextUrl = queryParams.get('nextUrl') || '';
  return (
    <Flex direction="column" maxW="large" h="auto" minH="100vh">
      <NavBarWithSubnavigation />
      <UserMenu />
      <LoginUser nextUrl={nextUrl} />
      <Box mt="auto">
        <Footer />
      </Box>
    </Flex>
  );
};

export default LoginPage;
