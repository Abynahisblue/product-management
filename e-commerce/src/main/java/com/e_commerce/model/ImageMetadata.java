package com.e_commerce.model;

import lombok.Data;
import jakarta.persistence.*;
import java.time.LocalDateTime;

@Data
@Entity
@Table(name = "image_metadata")
public class ImageMetadata {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    
    @Column(nullable = false)
    private String objectUrl;
    
    @Column(columnDefinition = "TEXT")
    private String description;
    
    @Column(name = "upload_date")
    private LocalDateTime uploadDate;
    
    @Column(name = "file_name")
    private String fileName;
    
    @Column(name = "file_size")
    private Long fileSize;
    
    @PrePersist
    protected void onCreate() {
        uploadDate = LocalDateTime.now();
    }
}