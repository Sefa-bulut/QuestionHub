package example.questionhub.services;

import example.questionhub.dto.request.CreateCommentRequest;
import example.questionhub.dto.request.UpdateCommentRequest;
import example.questionhub.entities.Comment;
import example.questionhub.entities.Post;
import example.questionhub.entities.User;
import example.questionhub.repositories.CommentRepository;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class CommentService {
    private final CommentRepository commentRepository;
    private final UserService userService;
    private final PostService postService;

    public CommentService(CommentRepository commentRepository, UserService userService, PostService postService) {
        this.commentRepository = commentRepository;
        this.userService = userService;
        this.postService = postService;
    }

    public List<Comment> getAllComments(Optional<Long> userId, Optional<Long> postId) {
        if (userId.isPresent() && postId.isPresent()) {
            return commentRepository.findByUserIdAndPostId(userId.get(), postId.get());
        } else if (userId.isPresent()) {
            return commentRepository.findByUserId(userId.get());
        } else if (postId.isPresent()) {
            return commentRepository.findByPostId(postId.get());
        } else {
            return commentRepository.findAll();
        }
    }

    public Comment getOneComment(Long commentId) {
        return commentRepository.findById(commentId).orElse(null);
    }

    public Comment createOneComment(CreateCommentRequest createCommentRequest) {
        User currentUser = userService.getOneUser(createCommentRequest.getUserId());
        Post currentPost = postService.getOnePost(createCommentRequest.getPostId());
        if (currentUser != null && currentPost != null) {
            Comment comment = new Comment();
            comment.setText(createCommentRequest.getText());
            comment.setUser(currentUser);
            comment.setPost(currentPost);
            return commentRepository.save(comment);
        } else {
            return null;
        }
    }


    public Comment updateOneComment(Long commentId, UpdateCommentRequest updateCommentRequest) {
        Optional<Comment> currentComment = commentRepository.findById(commentId);
        if (currentComment.isPresent()) {
            Comment comment = currentComment.get();
            comment.setText(updateCommentRequest.getText());
            return commentRepository.save(comment);
        } else {
            return null;
        }
    }

    public void deleteOneComment(Long commentId) {
        commentRepository.deleteById(commentId);
    }
}
