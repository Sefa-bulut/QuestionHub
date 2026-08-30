package example.questionhub.controllers;

import example.questionhub.dto.request.CreatePostRequest;
import example.questionhub.dto.request.UpdatePostRequest;
import example.questionhub.dto.response.PostResponse;
import example.questionhub.entities.Post;
import example.questionhub.services.PostService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/posts")
public class PostController {

    private final PostService postService;

    public PostController(PostService postService) {
        this.postService = postService;
    }

    @GetMapping
    public ResponseEntity<List<PostResponse>> getAllPosts(@RequestParam Optional<Long> userId) {
        List<PostResponse> results = postService.getAllPosts(userId);
        return ResponseEntity.ok(results);
    }

    @PostMapping
    public ResponseEntity<PostResponse> createOnePost(@RequestBody CreatePostRequest createPostRequest) {
        PostResponse result = postService.createOnePost(createPostRequest);
        return ResponseEntity.status(HttpStatus.CREATED).body(result);
    }

    @GetMapping("/{postId}")
    public ResponseEntity<PostResponse> getOnePost(@PathVariable Long postId) {
        PostResponse result = new PostResponse(postService.getOnePost(postId), 0);
        return ResponseEntity.ok(result);
    }

    @PutMapping("/{postId}")
    public ResponseEntity<PostResponse> updateOnePost(@PathVariable Long postId,
                                                      @RequestBody UpdatePostRequest updatePostRequest) {
        PostResponse result = new PostResponse(postService.updateOnePost(postId, updatePostRequest), 0);
        return ResponseEntity.ok(result);
    }

    @DeleteMapping("/{postId}")
    public void deleteOnePost(@PathVariable Long postId) {
        postService.deleteOnePost(postId);
    }

}
