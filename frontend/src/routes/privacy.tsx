import {
  Box,
  Flex,
  Heading,
  Text,
  VStack,
  Container
} from "@chakra-ui/react";
import { createFileRoute } from '@tanstack/react-router';
import NavBarWithSubnavigation from "../components/Common/Navbar.tsx";
import UserMenu from "../components/Common/UserMenu.tsx";
import Footer from "../components/Common/Footer.tsx";

export const Route = createFileRoute('/privacy')({
  component: Privacy,
  beforeLoad: () => {},
});

const privacyContent = {
  title: "Política de Privacidad",
  sections: [
    {
      title: "",
      content: "En Rent&You, nos comprometemos a proteger su privacidad y a mantener su información personal segura. Esta política de privacidad describe cómo recopilamos, utilizamos y compartimos su información personal cuando utiliza nuestros servicios de alquiler de coches. Al utilizar nuestros servicios, usted acepta las prácticas descritas en esta política de privacidad."
    },
    {
      title: "1. Recolección de Información",
      content: "Recopilamos información personal que usted nos proporciona directamente, como su nombre, dirección de correo electrónico, número de teléfono, y detalles de pago. También podemos recopilar información sobre su uso de nuestros servicios y su interacción con nuestro sitio web."
    },
    {
      title: "2. Uso de la Información",
      content: "Utilizamos su información personal para proporcionarle nuestros servicios de alquiler de coches, procesar sus pagos, comunicarnos con usted sobre su reserva, y mejorar nuestros servicios. También podemos utilizar su información para enviarle ofertas y promociones, siempre que haya dado su consentimiento para recibir dichas comunicaciones."
    },
    {
      title: "3. Compartir Información",
      content: "No compartimos su información personal con terceros, excepto cuando sea necesario para proporcionar nuestros servicios, cumplir con la ley, o proteger nuestros derechos. Podemos compartir su información con proveedores de servicios que nos ayudan a operar nuestro negocio, como procesadores de pagos y servicios de atención al cliente."
    },
    {
      title: "4. Seguridad de la Información",
      content: "Implementamos medidas de seguridad técnicas y organizativas para proteger su información personal contra el acceso no autorizado, la divulgación, la alteración y la destrucción. Sin embargo, ningún método de transmisión por Internet o método de almacenamiento electrónico es 100% seguro."
    },
    {
      title: "5. Sus Derechos",
      content: "Usted tiene derecho a acceder, corregir, y eliminar su información personal. También puede oponerse al tratamiento de su información personal y solicitar la portabilidad de sus datos. Si desea ejercer cualquiera de estos derechos, por favor contáctenos utilizando la información proporcionada en nuestra página de contacto."
    },
    {
      title: "6. Cambios a esta Política de Privacidad",
      content: "Podemos actualizar esta política de privacidad de vez en cuando para reflejar cambios en nuestras prácticas o en la legislación aplicable. Le notificaremos sobre cualquier cambio material publicando la nueva política de privacidad en nuestro sitio web."
    },
    {
      title: "7. Contacto",
      content: "Si tiene alguna pregunta o inquietud sobre nuestra política de privacidad o nuestras prácticas de manejo de información, no dude en contactarnos a través de nuestra página de contacto o a través de nuestro correo contacto@rentandyou.com."
    },
  ]
};

function Privacy() {
  return (
    <Flex direction="column" maxW="large" h="auto" minH="100vh">
      <NavBarWithSubnavigation />
      <UserMenu />
       <Container maxW={'3xl'} display="flex" mt="100" mb="100">
        <Box flex="1" p={5}>
          <VStack spacing={5} align="stretch">
            <Heading as="h1" size="xl" color="green.400">{privacyContent.title}</Heading>
            {privacyContent.sections.map((section, index) => (
              <Box key={index}>
                <Heading as="h2" size="lg" color="green.400">{section.title}</Heading>
                 <Text textAlign="justify">{section.content}</Text>
              </Box>
            ))}
          </VStack>
        </Box>
       </Container>
      <Box mt="auto">
        <Footer />
      </Box>
    </Flex>
  );
}

export default Privacy;
