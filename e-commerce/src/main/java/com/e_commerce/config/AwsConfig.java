package com.e_commerce.config;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import software.amazon.awssdk.regions.Region;
import software.amazon.awssdk.services.ssm.SsmClient;
import software.amazon.awssdk.services.ssm.model.GetParameterRequest;
import software.amazon.awssdk.services.ssm.model.GetParameterResponse;

@Configuration
public class AwsConfig {

    @Value("${AWS_DEFAULT_REGION:eu-central-1}")
    private String awsRegion;

    @Bean
    public SsmClient ssmClient() {
        return SsmClient.builder()
                .region(Region.of(awsRegion))
                .build();
    }

    public String getParameter(String parameterName) {
        try {
            GetParameterRequest request = GetParameterRequest.builder()
                    .name(parameterName)
                    .withDecryption(true)
                    .build();
            
            GetParameterResponse result = ssmClient().getParameter(request);
            return result.parameter().value();
        } catch (Exception e) {
            throw new RuntimeException("Failed to retrieve parameter: " + parameterName, e);
        }
    }
}