import React from "react";
import {
  Avatar,
  Card,
  HStack,
  Text,
  Collapsible,
  Stack,
  Box,
} from "@chakra-ui/react";
import { Link } from "react-router-dom";

const Comment = ({ comment }) => {
  return (
    <div>
      <Box py={3}>
        <HStack align="start" gap={3}>
          <Link to={`/users/${comment.userId}`}>
            <Avatar.Root size="sm">
              <Avatar.Image src="https://images.unsplash.com/photo-1511806754518-53bada35f930" />
              <Avatar.Fallback name={comment.userName} />
            </Avatar.Root>
          </Link>

          <Box>
            <Text fontWeight="semibold" fontSize="sm">
              {comment.userName}
            </Text>

            <Card.Description>{comment.text}</Card.Description>
          </Box>
        </HStack>
      </Box>
    </div>
  );
};

export default Comment;
