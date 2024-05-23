import {Badge, Box, Image, Text} from "@chakra-ui/react";
import { FaUser, FaGasPump } from 'react-icons/fa';
import NoVehicleImage from "../../assets/images/no-vehicle.svg";
import {Link} from "@tanstack/react-router";

function getFareColor(fare: string): string {
  let borderColor = 'gray'
    switch (fare) {
        case 'Premium':
            borderColor = 'gold';
            break;
        case 'Plus':
            borderColor = 'silver';
            break;
        case 'Smart':
            borderColor = 'bronze';
            break;
    }
    return borderColor;
}

function VehicleCard({ vehicle, office_id, pickup_date, return_date, total_days}) {
  const getImageSrc = (image) => {
        if (!image || image == "" || !image.includes('https')) {
            return NoVehicleImage; // return a default image if image is null or undefined
        }
        return image;
    }

  return (
    <Link to={`/rent?vehicle_id=${vehicle.id_}&office_id=${office_id}&pickup_date=${pickup_date}&return_date=${return_date}&total_days=${total_days}`}>
      <Box maxW="sm" maxH="sm" width="200px" height="300px" borderWidth="1px" borderRadius="lg" overflow="hidden" borderWidth="2px">
          <Image src={getImageSrc(vehicle.image_url)} alt={vehicle.model} width="100%" height="100px" mt="7" objectFit="cover" />
          <Box p="6">
              <Box d="flex" alignItems="baseline" >
                  <Badge borderColor={getFareColor(vehicle.fare)} borderRadius="full" px="2" borderWidth="1px">
                      {vehicle.fare ? vehicle.fare : ""}
                  </Badge>
                  <Box mt="auto"/>
                  <Box d="flex" alignItems="center">
                      {vehicle.passengers > 0 && (
                          <Badge borderRadius="full" px="2" colorScheme="teal" display="inline-flex" alignItems="center">
                              <Box as={FaUser} mr="2" />
                              <Box as="span">{vehicle.passengers}</Box>
                          </Badge>
                      )}
                  </Box>
                  <Box d="flex" alignItems="center">
                      {vehicle.avg_consumption > 0 && (
                          <Badge borderRadius="full" px="2" colorScheme="teal" display="inline-flex" alignItems="center">
                              <Box as={FaGasPump} mr="2" />
                              <Box as="span">{vehicle.avg_consumption + " l / 100km"}</Box>
                          </Badge>
                      )}
                  </Box>
              </Box>
              <Box
                  mt="1"
                  fontWeight="semibold"
                  as="h4"
                  lineHeight="tight"
                  isTruncated
              >
                  {vehicle.brand} {vehicle.model}
              </Box>

              <Box>
                  <Text fontWeight="semibold">{vehicle.price_per_day * total_days} €</Text>
              </Box>
          </Box>
      </Box>
    </Link>
  );
}

export default VehicleCard;
