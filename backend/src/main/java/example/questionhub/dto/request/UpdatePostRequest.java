package example.questionhub.dto.request;

import lombok.Data;

@Data
public class UpdatePostRequest {
    private String title;
    private String text;
}
