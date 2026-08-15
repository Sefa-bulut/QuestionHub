import { useAuth } from "@/contexts/AuthContext";
import { Box, Flex, HStack, IconButton } from "@chakra-ui/react";
import React from "react";
import { LuLogOut } from "react-icons/lu";
import { Link, useNavigate } from "react-router-dom";

const NavBar = () => {
  const { isAuthenticated, user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

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
          {isAuthenticated ? (
            <HStack gap={5}>
              <Link to={`/users/${user.userId}`}>Profile</Link>
              <IconButton
                aria-label="Logout"
                onClick={handleLogout}
                colorPalette="red"
              >
                <LuLogOut />
              </IconButton>
            </HStack>
          ) : (
            <Link to={`/login`}>Login/Register</Link>
          )}
        </Box>
      </Flex>
    </div>
  );
};

export default NavBar;
