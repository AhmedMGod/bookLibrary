package org.example.backendlibrary;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.UUID;

@Service
@RequiredArgsConstructor
public class BookLibraryService {

    private BookLibraryRepository bookLibraryRepository;

    public List<BookLibraryDTO> getBooks() {
        return bookLibraryRepository.findAll();
    }

    public BookLibraryDTO createBook(BookLibraryDTO bookLibraryDTO) {
        BookLibraryDTO newBook = new BookLibraryDTO(
                UUID.randomUUID(),
                bookLibraryDTO.author(),
                bookLibraryDTO.image(),
                bookLibraryDTO.title()
        );
        return bookLibraryRepository.save(newBook);
    }

    public BookLibraryDTO updateBook(BookLibraryDTO book) {

        return bookLibraryRepository.save(book);
    }

    public void deleteBook(String id) {

        bookLibraryRepository.deleteById(UUID.fromString(id));
    }

    public BookLibraryDTO getBook(String id) {
        return bookLibraryRepository.findById(UUID.fromString(id)).orElse(null);
    }
}
