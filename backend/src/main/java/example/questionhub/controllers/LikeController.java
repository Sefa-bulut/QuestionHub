package example.questionhub.controllers;

import example.questionhub.dto.request.CreateLikeRequest;
import example.questionhub.dto.response.LikeResponse;
import example.questionhub.entities.Like;
import example.questionhub.services.LikeService;
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
    public List<LikeResponse> getAllLikes(@RequestParam Optional<Long> userId,
                                          @RequestParam Optional<Long> postId) {
        return likeService.getAllLikes(userId, postId);
    }

    @PostMapping
    public LikeResponse createOneLike(@RequestBody CreateLikeRequest createLikeRequest) {
        return likeService.createOneLike(createLikeRequest);
    }

    @GetMapping("/{likeId}")
    public Like getOneLike(@PathVariable Long likeId) {
        return likeService.getOneLike(likeId);
    }

    @DeleteMapping("/{likeId}")
    public void deleteOneLike(@PathVariable Long likeId) {
        likeService.deleteOneLike(likeId);
    }

}
