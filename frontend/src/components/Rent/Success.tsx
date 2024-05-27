import {Flex, Text, Image} from "@chakra-ui/react";

function SuccessComponent() {
  return (
    <Flex flexDirection="column" align="center" justify="center" mt={"100"}>
      <Text color="green.400" fontSize={'4xl'} fontWeight="bold">Reserva creada!!🚗</Text>
      <Text fontSize={'lg'} color={'gray.600'}>
        Te hemos envíado un email de confirmación con todos los detalles! ✌️
      </Text>
      <Text fontSize={'lg'} color={'gray.600'}>
        Gracias por confiar en Rent&You.
      </Text>
      <Image
        src="https://cdn.dribbble.com/users/725982/screenshots/2472425/gif-samochod.gif"
        boxSize="medium"
        borderRadius="full"
      />
    </Flex>
  );
}

export default SuccessComponent;
