import Post from "@/components/Post/Post";
import PostForm from "@/components/Post/PostForm";
import api from "@/services/api";
import { Avatar, Box, Button, Flex, Stack, VStack } from "@chakra-ui/react";
import React, { useEffect, useState } from "react";

const currentUser = {
  id: 1,
  userName: "Sefa",
};

const Home = () => {
  const [postList, setPostList] = useState([]); // array
  const [loading, setLoading] = useState(true); // boolean
  const [error, setError] = useState(null); // obje
  const [likedPosts, setLikedPosts] = useState(new Map()); //map

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

  /*
   * Örnek:
   *   Map {
   *     10 (postId) => 501 (likeId), // Post 10 currentUser tarafından beğenilmiş
   *     15 (postId) => 504 (likeId), // Post 15 currentUser tarafından beğenilmiş
   *     ...
   *   }
   *
   * Kullanım:
   *   likedPosts.has(postId) // Bu kullanıcı bu postu beğenmiş mi?
   *   likedPosts.get(postId) // Beğenmişse likeId'yi döndürür (silme işlemi için kullanılır)
   *
   * Not:
   *   Her user'in map'i ayrıdır.
   */
  const getLikes = async () => {
    try {
      const response = await api.get(`/likes?userId=${currentUser.id}`);

      const map = new Map(
        response.data.map((like) => [like.postId, like.likeId]),
      );

      setLikedPosts(map);

      console.log(response.data);
    } catch (err) {
      console.log(err.message);
    }
  };

  useEffect(() => {
    getLikes();
    getAllPosts();
  }, []);

  console.log(postList);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <VStack w="100%" gap={8} align="stretch" p={6}>
      <PostForm currentUser={currentUser} setPostList={setPostList} />
      {postList?.map((post) => (
        <div key={post.postId}>
          <Post
            mypost={post}
            currentUser={currentUser}
            isLiked={likedPosts.has(post.postId)}
            likedId={likedPosts.get(post.postId)} // Silme işlemi için likeId gerekli
            setLikedPosts={setLikedPosts} // Post tarafından listeyi güncelleyebilmek için gerekli
          />
        </div>
      ))}
    </VStack>
  );
};

export default Home;
