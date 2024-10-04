package org.example.backendlibrary;

import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

import java.util.UUID;

@Repository

public interface BookLibraryRepository extends MongoRepository<BookLibraryDTO, UUID> {

}
