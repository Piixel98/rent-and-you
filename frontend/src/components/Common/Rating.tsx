import { Box, Radio, Stack } from "@chakra-ui/react";

const Rating = () => {
  return (
      <Stack direction="row" spacing={0}>
        <Box as="label" cursor="pointer" fontSize="30px" color="#666">
          <Radio
            value="5"
            id="star5"
            position="absolute"
            appearance="none"
            opacity="0"
          />
          <Box as="span">★</Box>
        </Box>
        <Box as="label" cursor="pointer" fontSize="30px" color="#666">
          <Radio
            value="4"
            id="star4"
            position="absolute"
            appearance="none"
            opacity="0"
          />
          <Box as="span">★</Box>
        </Box>
        <Box as="label" cursor="pointer" fontSize="30px" color="#666">
          <Radio
            value="3"
            id="star3"
            position="absolute"
            appearance="none"
            opacity="0"
          />
          <Box as="span">★</Box>
        </Box>
        <Box as="label" cursor="pointer" fontSize="30px" color="#666">
          <Radio
            value="2"
            id="star2"
            position="absolute"
            appearance="none"
            opacity="0"
          />
          <Box as="span">★</Box>
        </Box>
        <Box as="label" cursor="pointer" fontSize="30px" color="#666">
          <Radio
            value="1"
            id="star1"
            position="absolute"
            appearance="none"
            opacity="0"
          />
          <Box as="span">★</Box>
        </Box>
      </Stack>
  );
};

export default Rating;
