import api from "@/services/api";
import {
  Button,
  Card,
  HStack,
  Text,
  Box,
  Collapsible,
  Stack,
  Flex,
  VStack,
  Separator,
  Spinner,
} from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import { HiHeart } from "react-icons/hi";
import { LuMessagesSquare } from "react-icons/lu";
import { Link, useNavigate } from "react-router-dom";
import Comment from "../Comment/Comment";
import CommentForm from "../Comment/CommentForm";
import { useAuth } from "@/contexts/AuthContext";
import { toaster } from "../ui/toaster";
import UserAvatar from "../Profile/UserAvatar";

const Post = ({
  mypost,
  currentUser,
  isLiked,
  likedId,
  setLikedPosts,
  cardWidth,
}) => {
  const [open, setOpen] = useState(false);
  const [commentList, setCommentList] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [dataLoaded, setDataLoaded] = useState(false);
  const [likeCount, setLikeCount] = useState(mypost.likeCount || 0);
  const [likeLock, setLikeLock] = useState(false);
  const { isAuthenticated } = useAuth();

  useEffect(() => {
    setLikeCount(mypost.likeCount || 0);
  }, [mypost.likeCount]);

  const handleLike = async () => {
    // 1. MISAFİR KULLANICI KONTROLÜ
    if (!isAuthenticated) {
      toaster.create({
        title: "Giriş Yapmalısınız",
        description: "Gönderileri beğenmek için lütfen giriş yapın.",
        type: "warning",
      });
      return;
    }
    if (likeLock) return;

    setLikeLock(true); //İşlemi başlatıp kilidi alıyoruz

    if (isLiked) {
      // Post Beğenilmişse: Beğeniyi Sil (DELETE)
      try {
        await api.delete(`/likes/${likedId}`);

        setLikedPosts((prevMap) => {
          const newMap = new Map(prevMap);
          newMap.delete(mypost.postId);
          return newMap;
        });

        setLikeCount((prev) => prev - 1);
      } catch (err) {
        console.log("Beğeni silinirken bir hata oluştu", err);
      } finally {
        setLikeLock(false); // kilidi salıyoruz
      }
    } else {
      // Post Beğenilmemişse: Beğeni Ekle (POST)
      try {
        const response = await api.post(`/likes`, {
          userId: currentUser.userId,
          postId: mypost.postId,
        });

        setLikedPosts((prevMap) => {
          const newMap = new Map(prevMap);
          newMap.set(mypost.postId, response.data.likeId);
          return newMap;
        });

        setLikeCount((prev) => prev + 1);
      } catch (err) {
        console.log("Beğeni oluşturulurken bir hata oluştu", err);
      } finally {
        setLikeLock(false); // kilidi salıyoruz
      }
    }
  };

  const getAllComments = async () => {
    try {
      setLoading(true);
      const response = await api.get(`/comments?postId=${mypost.postId}`);
      setCommentList(response.data);
      setDataLoaded(true);
    } catch (err) {
      setError(err.message);
      console.log(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleComments = () => {
    setOpen(!open);

    if (!dataLoaded) {
      getAllComments();
    }
  };

  return (
    <div>
      <Card.Root w={{ base: "100%", lg: cardWidth }} mx="auto">
        <Collapsible.Root open={open}>
          <Card.Body>
            <Flex mb="6" justify="space-between" align="flex-start" w="100%">
              <HStack mb="6" gap="3">
                <Link to={`/users/${mypost.userId}`}>
                  <UserAvatar
                    userName={mypost.userName}
                    avatarId={mypost.avatarId}
                    size="xl"
                  />
                </Link>

                <Stack gap="0">
                  <Text fontWeight="semibold" textStyle="sm">
                    {mypost.userName}
                  </Text>
                </Stack>
              </HStack>

              <Text fontSize="sm" color="gray.500">
                {mypost.createdAt
                  ? new Date(mypost.createdAt).toLocaleDateString("tr-TR", {
                      day: "numeric",
                      month: "long",
                      year: "numeric",
                    })
                  : "Tarih yok"}
              </Text>
            </Flex>

            <Card.Title>{mypost.title}</Card.Title>
            <Card.Description mt="3">{mypost.text}</Card.Description>
          </Card.Body>

          <Card.Footer>
            <Flex w="100%" justify="space-between" align="center">
              <Button
                variant="ghost"
                size="2xl"
                justifyContent="flex-start"
                color={isLiked ? "red.600" : "gray.500"}
                onClick={handleLike}
              >
                {likeCount}
                <HiHeart />
              </Button>

              <Button variant="ghost" size="lg" onClick={handleComments}>
                <LuMessagesSquare />
                Comments
              </Button>
            </Flex>
          </Card.Footer>

          <Collapsible.Content>
            <Box p="4" borderTopWidth="1px">
              <VStack align="stretch" gap={4}>
                {loading && (
                  <VStack>
                    <Spinner color="gray.500" size="md" borderWidth="2px" />
                  </VStack>
                )}
                {error && <Text color="red.500">{error}</Text>}
                {!loading &&
                  commentList?.map((comment) => (
                    <div key={comment.commentId}>
                      <Comment comment={comment} />
                      <Separator />
                    </div>
                  ))}

                {isAuthenticated ? (
                  <CommentForm
                    currentPost={mypost}
                    setCommentList={setCommentList}
                  />
                ) : null}
              </VStack>
            </Box>
          </Collapsible.Content>
        </Collapsible.Root>
      </Card.Root>
    </div>
  );
};

export default Post;
