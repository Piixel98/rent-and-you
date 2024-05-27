import React, { useEffect, useState } from 'react'
import {
    Box,
    Container,
    Heading,
    Text,
    SimpleGrid, Flex, Stack, Button, useColorMode
} from '@chakra-ui/react'
import {AuthService, RentReadModel} from '../../client'
import useAuth from '../../hooks/useAuth'
import { format } from 'date-fns'

const RentsInformation: React.FC = () => {
  const { colorMode } = useColorMode();
  const textColor = colorMode === 'dark' ? 'white' : 'black';
  const { user: user } = useAuth()
  const [rents, setRents] = useState<RentReadModel[]>([]);
  const [currentPage, setCurrentPage] = useState(0);

  const PER_PAGE = 6;

  useEffect(() => {
    if (user) {
        AuthService.getUserRentsApiV1AuthUserRentsGet().then(setRents);
    }
  }, [user]);

  const offset = currentPage * PER_PAGE;

  const currentPageData = rents
    .slice(offset, offset + PER_PAGE)
    .map((rent, index) => (
      <Box key={index} boxShadow="md" p="6" rounded="md" width="full" maxWidth="6000px" mb="4">
        <Heading size="md" mb="2">{`Reserva ${index + 1}:`}</Heading>
        <Text mb="2">{`Fecha de inicio: ${format(new Date(rent.pickup_date), 'dd/MM/yyyy HH:mm')}`}</Text>
        <Text mb="2">{`Fecha de fin: ${format(new Date(rent.return_date), 'dd/MM/yyyy HH:mm')}`}</Text>
        <Text mb="2">{`Precio: ${rent.amount} €`}</Text>
      </Box>
    ));

  const pageCount = Math.ceil(rents.length / PER_PAGE);

  function handlePageClick(selectedPage: number) {
    setCurrentPage(selectedPage);
  }

  const pages = Array.from({length: pageCount}, (_, i) => i + 1);

  return (
    <>
      <Container maxW="full"  as="form" mb={"150"}>
        <Heading size="sm" py={4} color={textColor}>
          Mis últimas reservas
        </Heading>
        <SimpleGrid columns={3} spacing={10}>
          {currentPageData}
        </SimpleGrid>
        {rents.length > 0 && pageCount > 1 && (
            <Flex wrap="nowrap" display="inline-flex" justifyContent="center" direction="row" alignItems="center" mt={4}>
              <Box as="ul" display="inline-flex" listStyleType="none" p={0} m={0} justifyContent="center" alignItems="center">
                <Stack direction="row" spacing={1}>
                  {pages.map((page) => (
                    <Button
                      key={page}
                      onClick={() => handlePageClick(page - 1)}
                      colorScheme={page === currentPage + 1 ? "green" : "gray"}
                    >
                      {page}
                    </Button>
                  ))}
                </Stack>
              </Box>
            </Flex>
          )}
      </Container>
    </>
  )
}

export default RentsInformation
