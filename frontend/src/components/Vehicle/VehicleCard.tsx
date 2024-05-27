import {Badge, Box, Image, Text} from "@chakra-ui/react";
import {FaGasPump, FaUser} from 'react-icons/fa';
import NoVehicleImage from "../../assets/images/no-vehicle.svg";
import {Link} from "@tanstack/react-router";
import {VehicleReadModel} from "../../client";


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

function getImageSrc(image: string | null) {
  if (!image || image == "" || !image.includes('https')) {
    return NoVehicleImage; // return a default image if image is null or undefined
  }
  return image;
}

interface VehicleCardProps {
  vehicle: VehicleReadModel;
  officeId: string;
  totalDays: number;
  pickupDate: string;
  returnDate: string;
}

function VehicleCard({vehicle, officeId, totalDays, pickupDate, returnDate}: VehicleCardProps) {
  const url = () => {
    const urlParams = new URLSearchParams(window.location.search);
    const vehicle_id = vehicle.id_ || '';
    const office_id = urlParams.get('office_id') || officeId || '';
    const pickup_date = urlParams.get('pickup_date') || pickupDate || '';
    const return_date = urlParams.get('return_date') || returnDate || '';
    const total_days = urlParams.get('total_days') || totalDays.toString() || '';

    return `/rent?vehicle_id=${vehicle_id}&office_id=${office_id}&pickup_date=${pickup_date}&return_date=${return_date}&total_days=${total_days}`;
  };


  return (
    <Box as={Link} to={url()} maxW={{ base: "90%", md: "sm" }} maxH={{ base: "auto", md: "sm" }} width="200px" height="300px" borderRadius="lg" overflow="hidden" borderWidth="2px">
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
          <Text fontWeight="semibold">{(vehicle?.price_per_day ?? 0) * totalDays} €</Text>
        </Box>
      </Box>
    </Box>
  );
}

export default VehicleCard;
