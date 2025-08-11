package com.e_commerce.repository;

import com.e_commerce.model.ImageMetadata;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

public interface ImageMetadataRepository extends JpaRepository<ImageMetadata, Long> {
    
    @Query("SELECT i FROM ImageMetadata i ORDER BY i.uploadDate DESC")
    Page<ImageMetadata> findAllOrderByUploadDateDesc(Pageable pageable);
}