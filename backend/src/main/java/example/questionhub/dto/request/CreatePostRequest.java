package example.questionhub.dto.request;

import lombok.Data;

@Data
public class CreatePostRequest {
    private String title;
    private String text;
    private Long userId;
}
