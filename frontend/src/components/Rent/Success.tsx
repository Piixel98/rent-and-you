import {useColorMode, Center, Flex, Text, Image, Box} from "@chakra-ui/react";

function SuccessComponent() {
    const { colorMode } = useColorMode();
    const textColor = colorMode === "dark" ? "white" : "gray.600";
  return (
    <Flex flexDirection="column" align="center" justify="center" mt={"100"}>
      <Text color="green.400" fontSize={'4xl'} fontWeight="bold">Reserva creada!!🚗</Text>
        <Text as={Center} fontSize={'lg'} color={textColor}>
            Te hemos envíado un email de confirmación con todos los detalles! ✌️
        </Text>
          <Text fontSize={'lg'} color={textColor}>
            Gracias por confiar en Rent&You.
          </Text>
        <Box h={10} />
      <Image
        src="https://cdn.dribbble.com/users/725982/screenshots/2472425/gif-samochod.gif"
        boxSize="medium"
        borderRadius="full"
      />
    </Flex>
  );
}

export default SuccessComponent;
