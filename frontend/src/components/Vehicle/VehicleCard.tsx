import {Badge, Box, Image, Text} from "@chakra-ui/react";
import { FaUser, FaGasPump } from 'react-icons/fa';
import NoVehicleImage from "../../assets/images/no-vehicle.svg";
import {useNavigate} from "@tanstack/react-router";
import {VehicleReadModel} from "../../client";


interface VehicleCardProps {
  vehicle: VehicleReadModel;
  office_id: string;
  pickup_date: string;
  return_date: string;
  total_days: number;
}

function getFareColor(fare: string | null): string {
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

function VehicleCard({ vehicle, office_id, pickup_date, return_date, total_days}: VehicleCardProps) {
  const navigate = useNavigate();
  const getImageSrc = (image: string | null) => {
        if (!image || image == "" || !image.includes('https')) {
            return NoVehicleImage; // return a default image if image is null or undefined
        }
        return image;
    }
  const handleClick = () => {
      const url: string = `/rent?vehicle_id=${vehicle.id_.toString()}&office_id=${office_id.toString()}&pickup_date=${pickup_date.toString()}&return_date=${return_date.toString()}&total_days=${total_days.toString()}`;
      // @ts-ignore
      navigate(url).then(r => console.log(r));
    };

  return (
  <Box onClick={handleClick} maxW="sm" maxH="sm" width="200px" height="300px" borderRadius="lg" overflow="hidden" borderWidth="2px">
      <Image src={getImageSrc(vehicle?.image_url || null)} alt={vehicle.model} width="100%" height="100px" mt="7" objectFit="cover" />
      <Box p="6">
          <Box alignItems="baseline" >
              <Badge borderColor={getFareColor(vehicle?.fare || null)} borderRadius="full" px="2" borderWidth="1px">
                  {vehicle.fare ? vehicle.fare : ""}
              </Badge>
              <Box mt="auto"/>
              <Box alignItems="center">
                  {(vehicle?.passengers ?? 0) > 0 && (
                      <Badge borderRadius="full" px="2" colorScheme="teal" display="inline-flex" alignItems="center">
                          <Box as={FaUser} mr="2" />
                          <Box as="span">{vehicle.passengers}</Box>
                      </Badge>
                  )}
              </Box>
              <Box alignItems="center">
                  {(vehicle?.avg_consumption ?? 0) > 0 && (
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
              {vehicle?.brand} {vehicle.model}
          </Box>

          <Box>
              <Text fontWeight="semibold">{(vehicle?.price_per_day ?? 0) * total_days} €</Text>
          </Box>
      </Box>
  </Box>
  );
}

export default VehicleCard;
