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
    public List<BookLibraryDTO > getBooks() {

        return bookLibraryService.getBooks();
    }

    @GetMapping("{/id}")
    public BookLibraryDTO  getBook(@PathVariable String id) {
        return bookLibraryService.getBook(id);
    }

    @PostMapping
    public BookLibraryDTO  addBook(@RequestBody BookLibraryDTO  book) {

        return bookLibraryService.createBook(book);
    }

    @PutMapping("{/id}")
    public BookLibraryDTO  updateBook(@PathVariable String id, BookLibraryDTO  book) {

        return bookLibraryService.updateBook(book);
    }

    @DeleteMapping("{/id}")
    public void deleteBook(@PathVariable String id) {
        bookLibraryService.deleteBook(id);
    }
}
