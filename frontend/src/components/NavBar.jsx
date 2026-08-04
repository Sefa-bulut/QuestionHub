import { Box, Flex } from "@chakra-ui/react";
import React from "react";
import { Link } from "react-router-dom";

const NavBar = () => {
  const userId = 4;
  return (
    <div>
      <Flex
        bg="ThreeDDarkShadow"
        color="white"
        px={6}
        py={4}
        align="center"
        justify="space-between"
      >
        <Box>
          <Link to="/">Home</Link>
        </Box>

        <Box>
          <Link to={`/users/${userId}`}>User</Link>
        </Box>
      </Flex>
    </div>
  );
};

export default NavBar;
