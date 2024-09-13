package com.e_commerce.controller;

import org.springframework.boot.actuate.endpoint.annotation.Endpoint;
import org.springframework.boot.actuate.endpoint.annotation.ReadOperation;
import org.springframework.web.bind.annotation.RestController;

@RestController
@Endpoint(id = "custom-endpoint")
public class CustomActuator {
    @ReadOperation
    public String customInfo() {
        return "my application is running fine";
    }
}
