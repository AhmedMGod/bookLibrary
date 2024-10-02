package org.example.backendlibrary;


import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequiredArgsConstructor
@RequestMapping("api/books")
public class BookLibraryController {

    private final BookLibraryService bookLibraryService;

    @GetMapping
    public List<Book> getBooks() {

        return bookLibraryService.getBooks();
    }
    @GetMapping("{/id}")
    public Book getBook(@PathVariable String id) {
        return bookLibraryService.getBook(id);
    }

    @PostMapping
    public Book addBook(@RequestBody Book book) {

        return bookLibraryService.createBook(book);
    }

    @PutMapping("{/id}")
    public Book updateBook(@PathVariable String id, Book book) {

        return bookLibraryService.updateBook(book);
    }

    @DeleteMapping("{/id}")
    public void deleteBook(@PathVariable String id) {
        bookLibraryService.deleteBook(id);
    }
}
