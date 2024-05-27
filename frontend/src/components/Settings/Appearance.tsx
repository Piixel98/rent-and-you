import React from 'react'
import {
  Badge,
  Container,
  Heading,
  Radio,
  RadioGroup,
  Stack,
  useColorMode,
} from '@chakra-ui/react'

const Appearance: React.FC = () => {
  const { colorMode, toggleColorMode } = useColorMode()
  return (
    <>
     <Container maxW="full">
        <Heading size="sm" py={4}>
          Apariencia
        </Heading>
        <RadioGroup onChange={toggleColorMode} value={colorMode}>
          <Stack>
            <Radio value="light" colorScheme="green">
              Modo claro
              <Badge ml="1" colorScheme="green">
                Por defecto
              </Badge>
            </Radio>
            <Radio value="dark" colorScheme="green">
              Modo oscuro
            </Radio>
          </Stack>
        </RadioGroup>
      </Container>
    </>
  )
}

export default Appearance
