package example.questionhub.controllers;

import example.questionhub.dto.request.UpdateUserRequest;
import example.questionhub.dto.response.UserResponse;
import example.questionhub.dto.response.UserStatsResponse;
import example.questionhub.entities.User;
import example.questionhub.services.UserService;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/users")
public class UserController {

    private final UserService userService;

    public UserController(UserService userService) {
        this.userService = userService;
    }

    @GetMapping
    public List<UserResponse> getAllUsers() {
        return userService.getAllUsers();
    }

    @PostMapping
    public UserResponse createOneUser(@RequestBody User user) {
        return userService.createOneUser(user);
    }

    @GetMapping("/{userId}")
    public UserResponse getOneUser(@PathVariable Long userId) {
        return new UserResponse(userService.getOneUser(userId));
    }

    @PutMapping("/{userId}")
    public UserResponse updateOneUser(@PathVariable Long userId, @RequestBody UpdateUserRequest updateUserRequest) {
        return userService.updateOneUser(userId, updateUserRequest);
    }

    @DeleteMapping("/{userId}")
    public void deleteOneUser(@PathVariable Long userId) {
        userService.deleteOneUser(userId);
    }

    @GetMapping("/stats/{userId}")
    public UserStatsResponse getUserStats(@PathVariable Long userId) {
        return userService.getUserStats(userId);
    }

}
