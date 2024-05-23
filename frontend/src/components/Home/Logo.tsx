import {Box, Image} from "@chakra-ui/react";
import DefaultImage from "../../assets/images/rent_and_you.svg";
import React from "react";

interface LogoProps {
    img?: string;
}

const Logo: React.FC<LogoProps> = ({ img = DefaultImage }) => {
    return (
        <Box
            w="200px"
            h="200px"
            borderWidth="1px"
            borderRadius="20%"
            overflow="hidden"
            display="flex"
            justifyContent="center"
            alignItems="center"
        >
            <Image
                src={img ? img : DefaultImage}
                alt="logo"
                width="100%"
                height="100%"
                objectFit="cover"
                borderRadius="20%"
            />
        </Box>
    )
}

export default Logo;
