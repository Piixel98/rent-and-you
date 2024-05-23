import {Box, Button, Flex, SimpleGrid, Stack} from "@chakra-ui/react";
import VehicleCard from "./VehicleCard.tsx";
import {useState} from "react";

function VehiclesGridWithPagination({vehicles, office_id, pickup_date, return_date, total_days}) {
    const [currentPage, setCurrentPage] = useState(0);
    const handlePageClick = (selectedPage) => {
        setCurrentPage(selectedPage);
    }
    const vehiclesPerPage = 8;
    const offset = currentPage * vehiclesPerPage;

    const currentPageData = vehicles
     .slice(offset, offset + vehiclesPerPage)
     .map(vehicle =>
         <VehicleCard key={vehicle.id_}
                      vehicle={vehicle}
                      office_id={office_id}
                      pickup_date={pickup_date}
                      return_date={return_date}
                      total_days={total_days}
         />);

    const pageCount = Math.ceil(vehicles.length / vehiclesPerPage);

    // Create an array of page numbers
    const pages = Array.from({length: pageCount}, (_, i) => i + 1);

    return (
        <>
            <Flex direction="column" alignItems="center">
              <SimpleGrid columns={4} spacing={50}>
                {currentPageData}
              </SimpleGrid>
              {vehicles.length > 0 && pageCount > 1 && (
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
            </Flex>
        </>
    );
}

export default VehiclesGridWithPagination;
