package org.example.backendlibrary;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class BookLibraryService {

    private BookLibraryRepository bookLibraryRepository;

    public List<Book> getBooks() {
        return bookLibraryRepository.findAll();
    }

    public Book createBook(Book book) {
        Book newBook = new Book(
                newBook.id(),
                newBook.author(),
                newBook.image(),
                newBook.title()
        );
        return bookLibraryRepository.save(book);
    }

    public Book updateBook(Book book) {
        return bookLibraryRepository.save(book);
    }

    public void deleteBook(String id) {
        bookLibraryRepository.deleteById(id);
    }
}
