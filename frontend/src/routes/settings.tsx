import {
  Box,
  Container,
  Heading,
  Tab,
  TabList,
  TabPanel,
  TabPanels,
  Tabs,
} from '@chakra-ui/react'
import {createFileRoute, redirect} from '@tanstack/react-router'
import UserInformation from "../components/Settings/UserInformation.tsx";
import RentsInformation from "../components/Settings/RentsInformation.tsx";
import NavBarWithSubnavigation from "../components/Common/Navbar.tsx";
import UserMenu from "../components/Common/UserMenu.tsx";
import Footer from "../components/Common/Footer.tsx";
import useAuth, {isLoggedIn} from "../hooks/useAuth.ts";
import Appearance from "../components/Settings/Appearance.tsx";


const tabsConfig = [
  { title: 'Mi cuenta', component: UserInformation },
  { title: 'Mis reservas', component: RentsInformation },
  { title: 'Apariencia', component: Appearance},
]

export const Route = createFileRoute('/settings')({
  component: UserSettings,
  beforeLoad: async () => {
    if (!isLoggedIn()) {
      throw redirect({
        to: '/',
      })
    }
  }
});

function UserSettings() {
  const {user} = useAuth()
  const finalTabs = user?.role === 'admin'
    ? tabsConfig.slice(0, 3)
    : tabsConfig

  return (
      <>
        <NavBarWithSubnavigation />
        <UserMenu />
        <Container mt={50} ml={10}>
          <Heading color={"green.400"} size="lg" textAlign={{ base: 'center', md: 'left' }} py={12}>
            Bienvenido {user?.first_name}
          </Heading>
          <Tabs colorScheme={"green"} width={1000}>
            <TabList>
              {finalTabs.map((tab, index) => (
                <Tab key={index}>{tab.title}</Tab>
              ))}
            </TabList>
            <TabPanels>
              {finalTabs.map((tab, index) => (
                <TabPanel key={index}>
                  <tab.component />
                </TabPanel>
              ))}
            </TabPanels>
          </Tabs>
        </Container>
        <Box mt="auto">
          <Footer />
        </Box>
      </>
  )
}

export default UserSettings
