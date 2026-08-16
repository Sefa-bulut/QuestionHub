import ProfileCard from "@/components/Profile/ProfileCard";
import { Box, Grid } from "@chakra-ui/react";
import React from "react";
import { useParams } from "react-router-dom";

const User = () => {
  const { userId } = useParams();
  return (
    <Grid
      minH="100vh"
      maxW="1600px"
      mx="auto"
      p={6}
      templateColumns={{
        base: "1fr",
        lg: "1fr 1fr",
      }}
      gap={8}
      alignItems="start"
    >
      {/* PROFİL */}
      <ProfileCard />

      {/* POSTLAR */}
      <Box>
        <Box mb={4}>User: {userId}</Box>
        <Box mb={4}>User: {userId}</Box>
      </Box>
    </Grid>
  );
};

export default User;
