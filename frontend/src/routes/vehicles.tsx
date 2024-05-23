import { useEffect, useState } from 'react';
import { Box, Flex, Text, Image } from "@chakra-ui/react";
import { createFileRoute } from '@tanstack/react-router';
import UserMenu from "../components/Common/UserMenu";
import Footer from "../components/Common/Footer";
import NavBarWithSubnavigation from "../components/Common/Navbar";
import { VehicleService } from "../client";
import VehiclesGridWithPagination from "../components/Vehicle/VehiclesGridWithPagination";
import DrawerFilter from "../components/Vehicle/DrawerFilter.tsx";

export const Route = createFileRoute('/vehicles')({
  component: Vehicles,
  beforeLoad: () => {},
});

function Vehicles() {
  const queryParams = new URLSearchParams(window.location.search);
  const office_id = queryParams.get('office_id');
  const pickup_date = queryParams.get('pickup_date');
  const return_date = queryParams.get('return_date');
  const total_days = queryParams.get('total_days');
  const [vehicles, setVehicles] = useState([]);
  const [originalVehicles, setOriginalVehicles] = useState([]);

  const [filters, setFilters] = useState({
    gearbox: '',
    body_type: '',
    passengers: '',
    is_rented: false,
  });

  useEffect(() => {
    const fetchVehicles = office_id && office_id !== ""
      ? VehicleService.getVehiclesApiV1VehiclesGet({ officeId: parseInt(office_id), offset: 0, limit: 100})
      : VehicleService.getVehiclesApiV1VehiclesGet({ offset: 0, limit: 100 });

    fetchVehicles
      .then(response => {
        setOriginalVehicles(response);
        setVehicles(response);
      })
      .catch(error => {
        console.error('There was an error!', error);
      });
  }, [office_id]);

  const handleFilterChange = (newFilters) => {
    const updatedFilters = { ...newFilters };
    Object.keys(updatedFilters).forEach(key => {
      if (updatedFilters[key] === 'Todos' || updatedFilters[key] === '') {
        delete updatedFilters[key];
      }
    });
    setFilters(updatedFilters);

    VehicleService.getVehiclesApiV1VehiclesGet({ offset: 0, limit: 100, ...updatedFilters })
      .then(response => {
        setVehicles(response);
      })
      .catch(error => {
        console.error('There was an error!', error);
      });
  };

  return (
    <>
      <NavBarWithSubnavigation />
      <UserMenu />
      <Flex direction="row" justifyContent="center" alignItems="center" textAlign="center">
        <Box mt={100} width="100px" flexShrink={0}>
          <DrawerFilter onFilterChange={handleFilterChange} />
        </Box>
      </Flex>
      <Flex direction="row">
        <Flex flexGrow={1} direction="column" alignItems="center" justifyContent="center" mt={5} p={4}>
          {vehicles.length > 0 ? (
            <VehiclesGridWithPagination
              vehicles={vehicles}
              office_id={office_id}
              pickup_date={pickup_date}
              return_date={return_date}
              total_days={total_days}
            />
          ) : (
            <>
              <Text>No existen vehículos disponibles</Text>
              <Image
                src="https://www.motofoto.in/images/search-car.gif"
                alt="Car Gif"
                borderRadius="full"
                boxSize="200px"
              />
            </>
          )}
        </Flex>
      </Flex>
      <Box mt="auto">
        <Footer />
      </Box>
    </>
  );
}

export default Vehicles;
