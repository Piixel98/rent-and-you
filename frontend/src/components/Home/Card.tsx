import { Box, Image, Text } from "@chakra-ui/react";
import { Link } from '@tanstack/react-router'
import DefaultImage from "../../assets/images/no-image.svg";
import React from "react";


interface CardProps {
  title?: string;
  link?: string;
  img?: string;
}

const Card: React.FC<CardProps> = ({ title = "Default Title", link = "/", img = DefaultImage }) => {
  return (
    <Box
      w="200px"
      h="200px"
      borderWidth="1px"
      borderRadius="15px"
      overflow="hidden"
      m={4}
      _hover={{ transform: "scale(1.05)", transition: "0.3s" }}
    >
      <Link to={link} style={{ textDecoration: "none" }}>
        <Image src={img} alt={title} boxSize="full" objectFit="cover" />
        <Text mt={2} textAlign="center">
          {title}
        </Text>
      </Link>
    </Box>
  );
};

export default Card;
