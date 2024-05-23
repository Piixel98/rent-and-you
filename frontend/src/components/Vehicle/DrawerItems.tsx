import React, { useEffect, useState } from 'react';
import {Box, Checkbox, FormControl, FormLabel, Input, Select, Td} from '@chakra-ui/react';
import { VehicleService } from '../../client';

interface DrawerItemsProps {
  onClose?: () => void;
  onFilterChange: (filters: any) => void;
}

const DrawerItems: React.FC<DrawerItemsProps> = ({ onFilterChange }) => {
  const [gearbox, setGearbox] = useState('Todos');
  const [body_type, setBodyType] = useState('Todos');
  const [passengers, setPassengers] = useState('Todos');
  const [available, setAvailable] = useState(true);


    return (
    <Box justifyContent="space-between" mb={4}>
      <FormControl mb={4}>
        <FormLabel>Transmisión</FormLabel>
        <Select
          value={gearbox}
          onChange={(e) => {
            setGearbox(e.target.value);
          }}
        >
          <option value="Todos">Todos</option>
          <option value="Manual">Manual</option>
          <option value="Automatic">Automático</option>
        </Select>
      </FormControl>

      <FormControl mb={4}>
        <FormLabel>Tipo de Vehículo</FormLabel>
        <Select
          value={body_type}
          onChange={(e) => {
            setBodyType(e.target.value);
          }}
        >
          <option value="Todos">Todos</option>
          <option value="SUV">SUV</option>
          <option value="Sedan">Sedan</option>
          <option value="Hatchback">Hatchback</option>
          <option value="Other">Otro</option>
        </Select>
      </FormControl>

      <FormControl mb={4}>
        <FormLabel>Pasajeros</FormLabel>
        <Select
          value={passengers}
          onChange={(e) => {
            setPassengers(e.target.value);
          }}
        >
          <option value="Todos">Todos</option>
          <option value="2">2</option>
          <option value="4">4</option>
          <option value="5">5</option>
          <option value="7">7</option>
        </Select>
      </FormControl>

      <FormControl mb={4}>
        <FormLabel>Disponible</FormLabel>
        <Checkbox
          isChecked={available}
          colorScheme="green"
          onChange={(e) => {
            setAvailable(e.target.checked);
          }}
        >
          Sí
        </Checkbox>
      </FormControl>
    </Box>
  );
};

export default DrawerItems;
