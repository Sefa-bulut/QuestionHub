import Post from "@/components/Post/Post";
import ProfileCard from "@/components/Profile/ProfileCard";
import { useAuth } from "@/contexts/AuthContext";
import api from "@/services/api";
import { Box, Grid, Text, VStack } from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

const User = () => {
  const { user } = useAuth();
  const { userId } = useParams();
  const [paramUser, setParamUser] = useState(null);

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [likedPosts, setLikedPosts] = useState(new Map());
  const [postList, setPostList] = useState([]);

  const getAllPosts = async () => {
    try {
      const response = await api.get("/posts", {
        params: { userId },
      });
      setPostList(response.data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const getLikes = async () => {
    try {
      const response = await api.get("/likes", {
        params: {
          userId: user.userId,
        },
      });
      const map = new Map(
        response.data.map((like) => [like.postId, like.likeId]),
      );
      setLikedPosts(map);
      console.log(response.data);
    } catch (err) {
      console.log(err.message);
    }
  };

  const getOneUser = async () => {
    try {
      const response = await api.get(`/users/${userId}`);
      setParamUser(response.data);
    } catch (err) {
      console.log(err.message);
    }
  };

  useEffect(() => {
    getLikes();
    getAllPosts();
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
        md: "1fr 3fr", // Webde 2 sütun (sol profil kartı, sağ diğer içerikler)
      }}
      gap={8}
      alignItems="start"
      overflowX="hidden"
    >
      <Box w="100%" minW={0}>
        {paramUser && <ProfileCard paramUser={paramUser} />}
      </Box>
      <Box minW={0} ml={5} w="90%" wordBreak="break-word">
        <Box bg="gray.100" borderRadius="md" py={3} mb={5} textAlign="center">
          <Text fontSize="xl" fontWeight="bold">
            Son Postlar
          </Text>
        </Box>
        <VStack w="100%" gap={5}>
          {loading && <Text>Loading...</Text>}

          {error && <Text color="red.500">Error: {error}</Text>}

          {!loading &&
            !error &&
            postList?.map((post) => (
              <Box key={post.postId} w="100%">
                <Post
                  mypost={post}
                  currentUser={user}
                  isLiked={likedPosts.has(post.postId)}
                  likedId={likedPosts.get(post.postId)}
                  setLikedPosts={setLikedPosts}
                  cardWidth="100%"
                />
              </Box>
            ))}
        </VStack>
      </Box>
    </Grid>
  );
};

export default User;
