package com.example.exam_online.controller;

import com.example.exam_online.dto.CustomUserDetails;
import com.example.exam_online.dto.UserDto;
import com.example.exam_online.entity.User;
import com.example.exam_online.exception.CustomException;
import com.example.exam_online.jwt.JwtTokenProvider;
import com.example.exam_online.request.LoginRequest;
import com.example.exam_online.response.ResponseHandler;
import com.example.exam_online.service.UserService;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/auth")
public class UserController {

    @Autowired
    private UserService userService;

    @Autowired
    private ModelMapper mapper;

    @Autowired
    AuthenticationManager authenticationManager;

    @Autowired
    private JwtTokenProvider tokenProvider;

    @GetMapping("/findUser/{userId}")
    public ResponseHandler<UserDto> findUserById(@PathVariable int userId) throws CustomException {
        User user = userService.findById(userId);
        UserDto userDto = mapper.map(user, UserDto.class);
        ResponseHandler<UserDto> responseHandler = new ResponseHandler<UserDto>("successfully found user",
                                                                                HttpStatus.OK.value(), userDto);
        return responseHandler;
    }

    @PostMapping("/login")
    public ResponseHandler<String> authenticateUser(@RequestBody LoginRequest loginRequest) {
        System.out.println("login");
        // Valid username and password.
        Authentication authentication = authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(
                        loginRequest.getUsername(),
                        loginRequest.getPassword()
                )
        );

        // If don't catch exception that mean this is valid information
        // Set infor authentication into Security Context
        SecurityContextHolder.getContext().setAuthentication(authentication);

        // Return jwt for user.
        String jwt = tokenProvider.generateToken((CustomUserDetails) authentication.getPrincipal());
        return new ResponseHandler<>("successfully logged in", HttpStatus.OK.value(), jwt);
    }
}
