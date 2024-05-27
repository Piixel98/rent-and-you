import React, { useEffect, useState } from 'react'
import {
  Box,
  Container,
  Heading,
  Text,
  Flex,
} from '@chakra-ui/react'
import {RentReadModel, RentService} from '../../client'
import useAuth from '../../hooks/useAuth'
import { format } from 'date-fns'

const RentsInformation: React.FC = () => {
  const { user: user } = useAuth()
  const [rents, setRents] = useState<RentReadModel[]>([]);

  useEffect(() => {
    if (user) {
        RentService.getRentsApiV1RentsGet({userId: user.id_}).then(setRents);
    }
  }, [user]);

  return (
    <>
      <Container maxW="full" as="form">
        <Heading size="sm" py={4}>
          Mis últimas reservas
        </Heading>
        <Flex wrap="wrap" justify="space-between">
          {rents.map((rent, index) => (
            <Box key={index} bg="white" boxShadow="md" p="6" rounded="md" width="full" maxWidth="6000px" mb="4">
              <Heading size="md" mb="2">{`Reserva ${index + 1}:`}</Heading>
              <Text mb="2">{`Fecha de inicio: ${format(new Date(rent.pickup_date), 'dd/MM/yyyy HH:mm')}`}</Text>
              <Text mb="2">{`Fecha de fin: ${format(new Date(rent.return_date), 'dd/MM/yyyy HH:mm')}`}</Text>
              <Text mb="2">{`Precio: ${rent.amount} €`}</Text>
            </Box>
          ))}
        </Flex>
      </Container>
    </>
  )
}

export default RentsInformation
