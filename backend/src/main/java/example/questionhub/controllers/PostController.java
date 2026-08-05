package example.questionhub.controllers;

import example.questionhub.dto.request.CreatePostRequest;
import example.questionhub.dto.request.UpdatePostRequest;
import example.questionhub.dto.response.PostResponse;
import example.questionhub.entities.Post;
import example.questionhub.services.PostService;
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
    public List<PostResponse> getAllPosts(@RequestParam Optional<Long> userId) {
        return postService.getAllPosts(userId);
    }

    @PostMapping
    public PostResponse createOnePost(@RequestBody CreatePostRequest createPostRequest) {
        return postService.createOnePost(createPostRequest);
    }

    @GetMapping("/{postId}")
    public PostResponse getOnePost(@PathVariable Long postId) {
        return postService.getOnePostResponse(postId);
    }

    @PutMapping("/{postId}")
    public PostResponse updateOnePost(@PathVariable Long postId, @RequestBody UpdatePostRequest updatePostRequest) {
        return postService.updateOnePost(postId, updatePostRequest);
    }

    @DeleteMapping("/{postId}")
    public void deleteOnePost(@PathVariable Long postId) {
        postService.deleteOnePost(postId);
    }

}
