import Post from "@/components/Post/Post";
import PostForm from "@/components/Post/PostForm";
import { useAuth } from "@/contexts/AuthContext";
import api from "@/services/api";
import { Spinner, Text, VStack } from "@chakra-ui/react";
import React, { useEffect, useState } from "react";

const Home = () => {
  const { user, isAuthenticated } = useAuth();
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
      const response = await api.get(`/likes?userId=${user.userId}`);

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

  if (loading)
    return (
      <div>
        <VStack minH="100vh" justifyContent="center" alignItems="center">
          <Spinner color="white" size="lg" borderWidth="4px" />
          <Text color="white">Loading...</Text>
        </VStack>
      </div>
    );
  if (error) return <div>Beklenmeyen Bir Hata Oluştur: {error}</div>;

  return (
    <VStack w="100%" gap={8} align="stretch" p={6}>
      {isAuthenticated ? (
        <PostForm currentUser={user} setPostList={setPostList} />
      ) : null}

      {postList?.map((post) => (
        <div key={post.postId}>
          <Post
            mypost={post}
            currentUser={user}
            isLiked={likedPosts.has(post.postId)}
            likedId={likedPosts.get(post.postId)} // Silme işlemi için likeId gerekli
            setLikedPosts={setLikedPosts} // Post tarafından like listesini güncelleyebilmek için
            cardWidth="50%"
          />
        </div>
      ))}
    </VStack>
  );
};

export default Home;
