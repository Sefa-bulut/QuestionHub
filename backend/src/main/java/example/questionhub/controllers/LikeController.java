package example.questionhub.controllers;

import example.questionhub.dto.request.CreateLikeRequest;
import example.questionhub.dto.response.LikeResponse;
import example.questionhub.entities.Like;
import example.questionhub.services.LikeService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/likes")
public class LikeController {
    private final LikeService likeService;

    public LikeController(LikeService likeService) {
        this.likeService = likeService;
    }

    @GetMapping
    public ResponseEntity<List<LikeResponse>> getAllLikes(@RequestParam Optional<Long> userId,
                                                          @RequestParam Optional<Long> postId) {
        List<LikeResponse> results = likeService.getAllLikes(userId, postId);
        return ResponseEntity.ok(results);
    }

    @PostMapping
    public ResponseEntity<LikeResponse> createOneLike(@RequestBody CreateLikeRequest createLikeRequest) {
        LikeResponse result = likeService.createOneLike(createLikeRequest);
        return ResponseEntity.ok(result);
    }

    @GetMapping("/{likeId}")
    public ResponseEntity<LikeResponse> getOneLike(@PathVariable Long likeId) {
        LikeResponse result = new LikeResponse(likeService.getOneLike(likeId));
        return ResponseEntity.ok(result);
    }

    @DeleteMapping("/{likeId}")
    public void deleteOneLike(@PathVariable Long likeId) {
        likeService.deleteOneLike(likeId);
    }

}
