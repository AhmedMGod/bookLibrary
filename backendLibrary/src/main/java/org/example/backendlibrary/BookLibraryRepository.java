package org.example.backendlibrary;

import org.springframework.data.mongodb.repository.MongoRepository;

public interface BookLibraryRepository extends MongoRepository<Book, String> {
}
