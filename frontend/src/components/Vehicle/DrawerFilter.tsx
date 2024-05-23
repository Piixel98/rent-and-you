import {
  Box,
  Button,
  Drawer,
  DrawerBody,
  DrawerFooter,
  DrawerHeader,
  DrawerOverlay,
  DrawerContent,
  DrawerCloseButton,
  useDisclosure
} from "@chakra-ui/react";
import DrawerItems from './DrawerItems.tsx';
import { useState } from 'react';

interface DrawerFilterProps {
  onFilterChange: (filters: any) => void;
}

const DrawerFilter: React.FC<DrawerFilterProps> = ({ onFilterChange }) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [localFilters, setLocalFilters] = useState({});

  const handleFilterChange = (filters) => {
    setLocalFilters(filters);
  };

  const handleApply = () => {
    onFilterChange(localFilters);
    onClose();
  };

  return (
    <Box>
      <Button colorScheme="green" onClick={onOpen}>Aplicar filtros</Button>
      <Drawer isOpen={isOpen} placement="top" onClose={onClose}>
        <DrawerOverlay>
          <DrawerContent>
            <DrawerCloseButton />
            <DrawerHeader>Filtros de Vehículos</DrawerHeader>
            <DrawerBody>
              <DrawerItems onFilterChange={handleFilterChange} />
            </DrawerBody>
            <DrawerFooter>
              <Button colorScheme="green" variant="outline" mr={3} onClick={onClose}>
                Cancelar
              </Button>
              <Button colorScheme="green" onClick={handleApply}>
                Aplicar
              </Button>
            </DrawerFooter>
          </DrawerContent>
        </DrawerOverlay>
      </Drawer>
    </Box>
  );
};

export default DrawerFilter;
