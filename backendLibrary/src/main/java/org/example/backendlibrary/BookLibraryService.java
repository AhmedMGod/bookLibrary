package org.example.backendlibrary;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.UUID;

@Service
@RequiredArgsConstructor
public class BookLibraryService {

    private final BookLibraryRepository bookLibraryRepository;

    public List<BookLibraryDTO> getBooks() {
        return bookLibraryRepository.findAll();
    }

    public BookLibraryDTO createBook(BookLibraryDTO bookLibraryDTO) {
        BookLibraryDTO newBook = new BookLibraryDTO(
                UUID.randomUUID().toString(),
                bookLibraryDTO.title(),
                bookLibraryDTO.author(),
                bookLibraryDTO.image()

        );
        return bookLibraryRepository.save(newBook);
    }
// aktuell book wurde aktualisiert
    public BookLibraryDTO updateBook(String id, BookLibraryDTO bookDto) {
        BookLibraryDTO bookToUpdate = bookLibraryRepository.findById(UUID.fromString(id))
                .orElseThrow(() -> new RuntimeException("Book with id: " + id + " not found"));

        // Erstellen einer neuen Entität mit aktualisierten Daten
        BookLibraryDTO updatedBook = new BookLibraryDTO(
                bookDto.id(),
                bookDto.title(),
                bookDto.author(),
                bookDto.image()
        );

        // Speichern des aktualisierten Buches
         return  bookLibraryRepository.save(bookToUpdate);


    }


    public void  deleteBook(UUID id) {

        bookLibraryRepository.deleteById(id);


    }

    public BookLibraryDTO getBook(String id) {
        return bookLibraryRepository.findById(UUID.fromString(id)).orElse(null);
    }
}
