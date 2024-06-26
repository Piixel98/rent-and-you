import NavBarWithSubnavigation from "../components/Common/Navbar.tsx";
import UserMenu from "../components/Common/UserMenu.tsx";
import {Box, Flex} from "@chakra-ui/react";
import Footer from "../components/Common/Footer.tsx";
import { createFileRoute } from '@tanstack/react-router';
import SignUpUser from "../components/Auth/SignUpUser.tsx";

export const Route = createFileRoute('/signup')({
  component: SignUpPage,
  beforeLoad: () => {},
});

function SignUpPage() {
  return (
      <Flex direction="column" maxW="large" h="auto" minH="100vh">
        <NavBarWithSubnavigation />
        <UserMenu />
        <SignUpUser />
        <Box mt="auto">
          <Footer />
        </Box>
    </Flex>
  );
};

export default SignUpPage;
