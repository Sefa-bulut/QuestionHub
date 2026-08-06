import api from "@/services/api";
import {
  Avatar,
  Button,
  Card,
  HStack,
  Text,
  Box,
  Collapsible,
  Stack,
  Flex,
  Icon,
  VStack,
  Separator,
} from "@chakra-ui/react";
import React, { useState } from "react";
import { HiHeart } from "react-icons/hi";
import { LuMessagesSquare } from "react-icons/lu";
import { Link, useNavigate } from "react-router-dom";
import Comment from "../Comment/Comment";
import CommentForm from "../Comment/CommentForm";

const Post = ({ mypost, currentUserId, currentUserName }) => {
  const [open, setOpen] = useState(false);
  const [liked, setLiked] = useState(false);
  const [commentList, setCommentList] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [dataLoaded, setDataLoaded] = useState(false);

  const handleLike = () => {
    setLiked(!liked);
  };

  const getAllComments = async () => {
    try {
      setLoading(true);
      const response = await api.get(`/comments?postId=${mypost.postId}`);
      setCommentList(response.data);
      setDataLoaded(true);
      console.log(response.data);
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
      <Card.Root w={{ base: "95%", lg: "50%" }} mx="auto">
        <Collapsible.Root open={open}>
          <Card.Body>
            <HStack mb="6" gap="3">
              <Link to={`/users/${mypost.userId}`}>
                <Avatar.Root>
                  {/*Asıl resim*/}
                  <Avatar.Image src="https://images.unsplash.com/photo-1511806754518-53bada35f930" />
                  {/*Resim yüklemezse fallback(yedek)'deki ismin baş harfleri gösterilir*/}
                  <Avatar.Fallback name={mypost.userName} />
                </Avatar.Root>
              </Link>

              <Stack gap="0">
                <Text fontWeight="semibold" textStyle="sm">
                  {mypost.userName}
                </Text>
              </Stack>
            </HStack>

            <Card.Title>{mypost.title}</Card.Title>
            <Card.Description mt="3">{mypost.text}</Card.Description>
          </Card.Body>

          <Card.Footer>
            <Flex w="100%" justify="space-between" align="center">
              <Button
                variant="ghost"
                size="2xl"
                justifyContent="flex-start"
                color={liked ? "red.500" : "gray.500"}
                onClick={handleLike}
              >
                123
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
                <CommentForm
                  currentPost={mypost}
                  currentUserId={currentUserId}
                  currentUserName={currentUserName}
                  setCommentList={setCommentList}
                />
                {loading && <Text>Loading...</Text>}
                {error && <Text color="red.500">{error}</Text>}
                {!loading &&
                  commentList?.map((comment) => (
                    <div key={comment.commentId}>
                      <Comment comment={comment} />
                      <Separator />
                    </div>
                  ))}
              </VStack>
            </Box>
          </Collapsible.Content>
        </Collapsible.Root>
      </Card.Root>
    </div>
  );
};

export default Post;
