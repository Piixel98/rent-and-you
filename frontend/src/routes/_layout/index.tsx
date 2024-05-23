import {Box, Container, Flex} from '@chakra-ui/react'
import {createFileRoute} from '@tanstack/react-router'
import Logo from "../../components/Home/Logo";
import Testimonials from "../../components/Home/Testimonials";
import Hero from "../../components/Home/Hero";
import Contact from "../../components/Home/Contact";

export const Route = createFileRoute('/_layout/')({
  component: Home,
})

function Home() {
  return (
    <>
      <Container maxW="full" pt={12}>
        <Flex justify="center" align="center" width="full" p={4} mt={10}>
          <Logo/>
        </Flex>
      </Container>
      <Hero/>
      <Box height="50px"/>
      <Testimonials/>
      <Contact/>
    </>
  )
}

export default Home
