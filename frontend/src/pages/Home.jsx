import Post from "@/components/Post/Post";
import PostForm from "@/components/Post/PostForm";
import api from "@/services/api";
import { Avatar, Box, Button, Flex, Stack, VStack } from "@chakra-ui/react";
import React, { useEffect, useState } from "react";

const Home = () => {
  const [postList, setPostList] = useState([]); // array
  const [loading, setLoading] = useState(true); // boolean
  const [error, setError] = useState(null); // obje

  const getAllPosts = async () => {
    try {
      //const response = await axios.get(`${BASE_URL}/posts`);
      const response = await api.get("/posts");
      setPostList(response.data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getAllPosts();
  }, []);

  console.log(postList);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <VStack w="100%" gap={8} align="stretch" p={6} bg="AccentColor">
      <PostForm userId={2} userName={"Sefa"} setPostList={setPostList} />
      {postList?.map((post) => (
        <div key={post.postId}>
          <Post mypost={post} />
        </div>
      ))}
    </VStack>
  );
};

export default Home;
