package example.questionhub.controllers;

import example.questionhub.dto.request.CreateCommentRequest;
import example.questionhub.dto.request.UpdateCommentRequest;
import example.questionhub.dto.response.CommentResponse;
import example.questionhub.entities.Comment;
import example.questionhub.services.CommentService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
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
    public ResponseEntity<List<CommentResponse>> getAllComments(@RequestParam Optional<Long> userId,
                                                                @RequestParam Optional<Long> postId) {
        List<CommentResponse> results = commentService.getAllComments(userId, postId);
        return ResponseEntity.ok(results);
    }

    @PostMapping
    public ResponseEntity<CommentResponse> createOneComment(@RequestBody CreateCommentRequest createCommentRequest) {
        CommentResponse result = commentService.createOneComment(createCommentRequest);
        return ResponseEntity.status(HttpStatus.CREATED).body(result);
    }

    @GetMapping("/{commentId}")
    public ResponseEntity<CommentResponse> getOneComment(@PathVariable Long commentId) {
        CommentResponse result = new CommentResponse(commentService.getOneComment(commentId));
        return ResponseEntity.ok(result);
    }

    @PutMapping("/{commentId}")
    public ResponseEntity<CommentResponse> updateOneComment(@PathVariable Long commentId,
                                                            @RequestBody UpdateCommentRequest updateCommentRequest) {
        CommentResponse result
                = new CommentResponse(commentService.updateOneComment(commentId, updateCommentRequest));
        return ResponseEntity.ok(result);
    }

    @DeleteMapping("/{commentId}")
    public void deleteOneComment(@PathVariable Long commentId) {
        commentService.deleteOneComment(commentId);
    }

}
