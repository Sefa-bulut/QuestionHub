import { useAuth } from "@/contexts/AuthContext";
import { Box, Flex, HStack, IconButton, Text } from "@chakra-ui/react";
import React from "react";
import { LuCircleUserRound, LuLogOut } from "react-icons/lu";
import { SiHomebridge } from "react-icons/si";
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
        as="nav"
        bg="gray.900"
        color="white"
        px={{ base: 4, md: 8 }}
        py={4}
        align="center"
        justify="space-between"
        boxShadow="sm"
        top={0}
        zIndex={50}
      >
        <Link to="/" style={{ textDecoration: "none", color: "inherit" }}>
          <HStack
            gap={2}
            cursor="pointer"
            _hover={{
              color: "blue.400",
            }}
          >
            <Box>
              <SiHomebridge size={24} />
            </Box>
            <Text fontSize="md" fontWeight="bold" letterSpacing="tight">
              Home
            </Text>
          </HStack>
        </Link>

        <Box>
          {isAuthenticated ? (
            <HStack gap={6}>
              <Link
                to={`/users/${user.userId}`}
                style={{ textDecoration: "none", color: "inherit" }}
              >
                <HStack
                  gap={2}
                  cursor="pointer"
                  _hover={{
                    color: "blue.400",
                  }}
                >
                  <Box>
                    <LuCircleUserRound size={24} />
                  </Box>
                  <Text fontSize="md" fontWeight="bold" letterSpacing="tight">
                    Profile
                  </Text>
                </HStack>
              </Link>

              <IconButton
                aria-label="Logout"
                onClick={handleLogout}
                colorPalette="red"
              >
                <LuLogOut />
              </IconButton>
            </HStack>
          ) : (
            <Link
              to={`/login`}
              style={{ textDecoration: "none", color: "inherit" }}
            >
              <HStack
                gap={2}
                cursor="pointer"
                _hover={{
                  color: "blue.400",
                }}
              >
                <Text fontSize="md" fontWeight="bold" letterSpacing="tight">
                  Login/Register
                </Text>
              </HStack>
            </Link>
          )}
        </Box>
      </Flex>
    </div>
  );
};

export default NavBar;
