import {Box, Button, Flex, SimpleGrid, Stack} from "@chakra-ui/react";
import VehicleCard from "./VehicleCard.tsx";
import {useState} from "react";
import {VehicleReadModel} from "../../client";

interface VehiclesGridWithPaginationProps {
  vehicles: VehicleReadModel[];
  office_id: string;
  pickup_date: string;
  return_date: string;
  total_days: number;
}

function VehiclesGridWithPagination({vehicles, office_id, pickup_date, return_date, total_days}: VehiclesGridWithPaginationProps) {
    const [currentPage, setCurrentPage] = useState(0);
    const handlePageClick = (selectedPage: number) => {
        setCurrentPage(selectedPage);
    }
    const vehiclesPerPage = 8;
    const offset = currentPage * vehiclesPerPage;

    const currentPageData = vehicles
     .slice(offset, offset + vehiclesPerPage)
     .map(vehicle =>
         <VehicleCard key={vehicle.id_||0}
                      vehicle={vehicle}
                      officeId={office_id}
                      pickupDate={pickup_date}
                      returnDate={return_date}
                      totalDays={total_days}
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
