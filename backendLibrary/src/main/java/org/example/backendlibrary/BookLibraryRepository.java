package org.example.backendlibrary;

import org.springframework.data.mongodb.repository.MongoRepository;

import java.util.UUID;

public interface BookLibraryRepository extends MongoRepository<BookLibraryDTO, UUID> {

}
