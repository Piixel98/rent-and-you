import {
  Box,
  Container,
  Stack,
  Text,
  Link,
  useColorModeValue,
} from '@chakra-ui/react';
export default function Footer() {
  return (
    <Box
      bg={useColorModeValue('gray.50', 'gray.900')}
      color={useColorModeValue('gray.700', 'gray.200')}
      mt="auto"
      position="fixed"
      bottom="0"
      width="100%">
      <Container
        as={Stack}
        maxW={'6xl'}
        py={4}
        direction={{ base: 'column', md: 'row' }}
        spacing={4}
        justify={{ base: 'center', md: 'space-between' }}
        align={{ base: 'center', md: 'center' }}>
        <Stack direction={'row'} spacing={6}>
          <Link href={'/'}>Sobre nosotros</Link>
          <Link href={'/privacy'}>Política de privacidad</Link>
          <Link href={'/contact'}>Contactar</Link>
        </Stack>
        <Text>© 2024 Rent&You</Text>
      </Container>
    </Box>
  );
}
