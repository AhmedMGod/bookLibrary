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
                UUID.randomUUID(),
                bookLibraryDTO.title(),
                bookLibraryDTO.author(),
                bookLibraryDTO.image()

        );
        return bookLibraryRepository.save(newBook);
    }
// aktuell book wurde aktualisiert
    public BookLibraryDTO updateBook(UUID id, BookLibraryDTO bookDto) {
        BookLibraryDTO bookToUpdate = bookLibraryRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Book with id: " + id + " not found"));

        // Erstellen einer neuen Entität mit aktualisierten Daten
        BookLibraryDTO updatedBook = new BookLibraryDTO(
                id,
                bookDto.title(),
                bookDto.author(),
                bookDto.image()
        );

        // Speichern des aktualisierten Buches
         return  bookLibraryRepository.save(updatedBook);


    }


    public void deleteBook(String id) {

        bookLibraryRepository.deleteById(UUID.fromString(id));
    }

    public BookLibraryDTO getBook(String id) {
        return bookLibraryRepository.findById(UUID.fromString(id)).orElse(null);
    }
}
