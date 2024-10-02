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
                book.id(),

                book.author(),
                book.image(),
                book.title()
        );
        return bookLibraryRepository.save(newBook);
    }

    public Book updateBook(Book book) {

        return bookLibraryRepository.save(book);
    }

    public void deleteBook(String id) {

        bookLibraryRepository.deleteById(id);
    }

    public Book getBook(String id) {
        return bookLibraryRepository.findById(id).orElse(null);
    }
}
