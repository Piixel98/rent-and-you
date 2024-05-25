import {Flex, Text, Image} from "@chakra-ui/react";
import {Link} from "@tanstack/react-router";

function WelcomeUser() {
  return (
    <Flex flexDirection="column" align="center" justify="center" mt={"100"}>
        <Text color="green.400" fontSize={'4xl'} fontWeight="bold">Bienvenido al club You!</Text>
        <Flex as={Link} to={"/search"} color={'green.400'}><Text fontSize={'lg'} color={'gray.600'}>Reservar ahora! ✌️</Text></Flex>
        <Image
          src="https://cdn.dribbble.com/users/725982/screenshots/2472425/gif-samochod.gif"
          boxSize="medium"
          borderRadius="full"
        />
    </Flex>
  );
}

export default WelcomeUser;
