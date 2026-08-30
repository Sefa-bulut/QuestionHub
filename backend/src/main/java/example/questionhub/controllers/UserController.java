package example.questionhub.controllers;

import example.questionhub.dto.request.UpdateUserRequest;
import example.questionhub.dto.response.UserResponse;
import example.questionhub.dto.response.UserStatsResponse;
import example.questionhub.entities.User;
import example.questionhub.services.UserService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/users")
public class UserController {

    private final UserService userService;

    public UserController(UserService userService) {
        this.userService = userService;
    }

    @GetMapping
    public ResponseEntity<List<UserResponse>> getAllUsers() {
        List<UserResponse> results = userService.getAllUsers();
        return ResponseEntity.ok(results);
    }

    @PostMapping
    public ResponseEntity<UserResponse> createOneUser(@RequestBody User user) {
        UserResponse result = userService.createOneUser(user);
        return ResponseEntity.status(HttpStatus.CREATED).body(result);
    }

    @GetMapping("/{userId}")
    public ResponseEntity<UserResponse> getOneUser(@PathVariable Long userId) {
        UserResponse result = new UserResponse(userService.getOneUser(userId));
        return ResponseEntity.ok(result);
    }

    @PutMapping("/{userId}")
    public ResponseEntity<UserResponse> updateOneUser(@PathVariable Long userId,
                                                      @RequestBody UpdateUserRequest updateUserRequest) {
        UserResponse result = userService.updateOneUser(userId, updateUserRequest);
        return ResponseEntity.ok(result);
    }

    @DeleteMapping("/{userId}")
    public void deleteOneUser(@PathVariable Long userId) {
        userService.deleteOneUser(userId);
    }

    @GetMapping("/stats/{userId}")
    public ResponseEntity<UserStatsResponse> getUserStats(@PathVariable Long userId) {
        UserStatsResponse result = userService.getUserStats(userId);
        return ResponseEntity.ok(result);
    }

}
