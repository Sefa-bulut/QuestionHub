import ProfileCard from "@/components/Profile/ProfileCard";
import api from "@/services/api";
import { Box, Grid } from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

const User = () => {
  const { userId } = useParams();
  const [currentUser, setCurrentUser] = useState(null);

  const getOneUser = async () => {
    try {
      const response = await api.get(`/users/${userId}`);
      setCurrentUser(response.data);
    } catch (err) {
      console.log(err.message);
    }
  };

  useEffect(() => {
    getOneUser();
  }, [userId]);

  return (
    <Grid
      minH="100vh"
      w="100%"
      maxW="1600px"
      mx="auto"
      p={5}
      templateColumns={{
        base: "1fr",
        md: "1fr 1fr", // Webde 2 sütun (sol profil kartı, sağ diğer içerikler)
      }}
      gap={8}
      alignItems="start"
      overflowX="hidden"
    >
      <Box w="100%" minW={0}>
        {currentUser && <ProfileCard currentUser={currentUser} />}
      </Box>

      <Box minW={0} w="100%" wordBreak="break-word">
        <Box mb={4}>User: {userId}</Box>
        <Box mb={4}>User Content Area</Box>
      </Box>
    </Grid>
  );
};

export default User;
