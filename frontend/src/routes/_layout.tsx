import {Box, Flex} from "@chakra-ui/react";
import {createFileRoute, Outlet} from '@tanstack/react-router'
import Footer from "../components/Common/Footer.tsx";
import UserMenu from "../components/Common/UserMenu.tsx";

export const Route = createFileRoute('/_layout')({
  component: Layout,
  beforeLoad: async () => {
  },
})

function Layout() {
  return (
    <Flex direction="column" maxW="large" h="auto" minH="100vh">
        <UserMenu />
        <Outlet />
        <Box mt="auto">
          <Footer />
        </Box>
    </Flex>
  )
}

export default Layout
