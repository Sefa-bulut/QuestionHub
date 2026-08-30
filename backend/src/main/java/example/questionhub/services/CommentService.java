package example.questionhub.services;

import example.questionhub.dto.request.CreateCommentRequest;
import example.questionhub.dto.request.UpdateCommentRequest;
import example.questionhub.dto.response.CommentResponse;
import example.questionhub.entities.Comment;
import example.questionhub.entities.Post;
import example.questionhub.entities.User;
import example.questionhub.exceptions.CommentNotFoundException;
import example.questionhub.exceptions.PostNotFoundException;
import example.questionhub.repositories.CommentRepository;
import org.springframework.stereotype.Service;

import java.util.Date;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

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

    public List<CommentResponse> getAllComments(Optional<Long> userId, Optional<Long> postId) {
        List<Comment> comments;
        if (userId.isPresent() && postId.isPresent()) {
            comments = commentRepository.findByUserIdAndPostId(userId.get(), postId.get());
        } else if (userId.isPresent()) {
            comments = commentRepository.findByUserId(userId.get());
        } else if (postId.isPresent()) {
            comments = commentRepository.findByPostId(postId.get());
        } else {
            comments = commentRepository.findAll();
        }
        // use mapper to transform comment to commentResponse
        return comments.stream().map(c -> new CommentResponse(c)).collect(Collectors.toList());
    }

    public Comment getOneComment(Long commentId) {
        return commentRepository.findById(commentId)
                .orElseThrow(() -> new CommentNotFoundException("Comment not found with id: " + commentId));
    }

    public CommentResponse createOneComment(CreateCommentRequest createCommentRequest) {
        User currentUser = userService.getOneUser(createCommentRequest.getUserId());
        Post currentPost = postService.getOnePost(createCommentRequest.getPostId());
        if (currentUser != null && currentPost != null) {
            Comment comment = new Comment();
            comment.setText(createCommentRequest.getText());
            comment.setUser(currentUser);
            comment.setPost(currentPost);
            comment.setCreatedAt(new Date());
            return new CommentResponse(commentRepository.save(comment));
        } else {
            throw new PostNotFoundException("Post or User not found");
        }
    }


    public Comment updateOneComment(Long commentId, UpdateCommentRequest updateCommentRequest) {
        Optional<Comment> currentComment = commentRepository.findById(commentId);
        if (currentComment.isPresent()) {
            Comment comment = currentComment.get();
            comment.setText(updateCommentRequest.getText());
            return commentRepository.save(comment);
        } else {
            throw new CommentNotFoundException("Comment not found with id: " + commentId);
        }
    }

    public void deleteOneComment(Long commentId) {
        commentRepository.deleteById(commentId);
    }
}
