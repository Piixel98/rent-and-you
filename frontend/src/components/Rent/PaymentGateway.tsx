import {Box, FormControl, FormLabel, Input, VStack, Flex, HStack, Button, Text, Image, Center} from '@chakra-ui/react';
import { useForm } from 'react-hook-form';
import React, { useState } from 'react';
import {CheckIcon} from "@chakra-ui/icons";
import qrcode from "../../assets/images/Rent&You-qrcode.png";


type PaymentFormValues = {
  cardNumber: string;
  cardHolder: string;
  expiryDate: string;
  cvv: string;
};

type PaymentGatewayProps = {
  onClose: () => void;
  total_price: number;
  handleUserFormSubmit: () => void;
};

const PaymentGateway: React.FC<PaymentGatewayProps> = ({onClose, total_price, handleUserFormSubmit}) => {
  const { register, formState: { errors, isValid }} = useForm<PaymentFormValues>({ mode: 'onChange' });
  const [isLoading, setIsLoading] = useState(false);
  const [isPaymentSuccessful, setIsPaymentSuccessful] = useState(false);

  const handlePayment = () => {
    setIsLoading(true);
    setTimeout(() => {
      setIsPaymentSuccessful(true);
      setIsLoading(false);
      // toast("Pago realizado","El pago se ha realizado con éxito.", "success");
      onClose();
      handleUserFormSubmit();
    }, 2000);
  };

  return (
    <>
      <Flex mb={10} direction="column" maxW="large" h="auto" alignItems="center">
        <Box borderWidth="1px" borderRadius="lg" p={5} w="full" maxW="md">
          <VStack spacing={4} align="stretch">
            <FormControl id="cardNumber" isRequired>
              <FormLabel>Nº de Tarjeta</FormLabel>
              <Input placeholder="XXXXXXXXXXXXXXXX" type="text" {...register('cardNumber', { required: true, pattern: /^\d{16}$/ })} isInvalid={!!errors.cardNumber} />
            </FormControl>
            <FormControl id="cardHolder" isRequired>
              <FormLabel>Nombre del titular</FormLabel>
              <Input placeholder="Nombre del titular" type="text" {...register('cardHolder', { required: true, pattern: /^[a-zA-Z]+$/ })} isInvalid={!!errors.cardHolder} />
            </FormControl>
            <HStack spacing={4}>
              <FormControl id="expiryDate" isRequired>
                <FormLabel>Caducidad</FormLabel>
                <Input type="text" placeholder="MM/YY" {...register('expiryDate', { required: true, pattern: /^(0[1-9]|1[0-2])\/?([0-9]{2})$/ })} isInvalid={!!errors.expiryDate} />
              </FormControl>
              <FormControl id="cvv" isRequired>
                <FormLabel>CVV</FormLabel>
                <Input type="text" placeholder={"---"} {...register('cvv', { required: true, pattern: /^[0-9]{3}$/ })} isInvalid={!!errors.cvv} />
              </FormControl>
            </HStack>
            <Box mt={1} />
            <Center>
              <Text fontWeight="bold" fontSize="2xl">
               Total: {total_price} € (IVA incluido)
              </Text>
            </Center>
            <Center mt={4}>
              <Image src={qrcode} alt="PayPal" boxSize="100px" />
            </Center>
            <Text fontSize="small">
              También puedes realizar el pago vía PayPal escaneando el QR.
            </Text>
            <Button colorScheme="green" mt={4} onClick={handlePayment} isLoading={isLoading} isDisabled={!isValid}>
              {isPaymentSuccessful ? <CheckIcon /> : 'Pagar'}
            </Button>
          </VStack>
        </Box>
      </Flex>
    </>
  );
};

export default PaymentGateway;
