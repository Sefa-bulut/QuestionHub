package example.questionhub.controllers;

import example.questionhub.dto.request.CreateCommentRequest;
import example.questionhub.dto.request.UpdateCommentRequest;
import example.questionhub.dto.response.CommentResponse;
import example.questionhub.entities.Comment;
import example.questionhub.services.CommentService;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/comments")
public class CommentController {

    private final CommentService commentService;

    public CommentController(CommentService commentService) {
        this.commentService = commentService;
    }

    @GetMapping
    public List<CommentResponse> getAllComments(@RequestParam Optional<Long> userId,
                                                @RequestParam Optional<Long> postId) {
        return commentService.getAllComments(userId, postId);
    }

    @PostMapping
    public CommentResponse createOneComment(@RequestBody CreateCommentRequest createCommentRequest) {
        return commentService.createOneComment(createCommentRequest);
    }

    @GetMapping("/{commentId}")
    public Comment getOneComment(@PathVariable Long commentId) {
        return commentService.getOneComment(commentId);
    }

    @PutMapping("/{commentId}")
    public Comment updateOneComment(@PathVariable Long commentId,
                                    @RequestBody UpdateCommentRequest updateCommentRequest) {
        return commentService.updateOneComment(commentId, updateCommentRequest);
    }

    @DeleteMapping("/{commentId}")
    public void deleteOneComment(@PathVariable Long commentId) {
        commentService.deleteOneComment(commentId);
    }

}
