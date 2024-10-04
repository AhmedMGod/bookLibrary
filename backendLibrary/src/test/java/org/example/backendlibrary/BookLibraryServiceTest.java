package org.example.backendlibrary;

import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;

import java.util.List;
import java.util.Optional;
import java.util.UUID;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.*;


@ExtendWith(MockitoExtension.class)
class BookLibraryServiceTest {
    @Mock
    BookLibraryRepository bookLibraryRepository;
    @InjectMocks
    BookLibraryService bookLibraryService;

    @Test
    public void test_should_rturn_book_library_When_Call_With_Id() {
        //GIVEN
        BookLibraryDTO expeted = new BookLibraryDTO(UUID.randomUUID(),"Roman de France","Jean Paul Satre","roman.jpeg");
        bookLibraryRepository.save(expeted);

        when(bookLibraryRepository.findAll()).thenReturn(List.of(expeted));

        List<BookLibraryDTO> actaul = bookLibraryService.getBooks();

        assertEquals(expeted, actaul.get(0));
    }

    @Test
    public void test_should_rturn_book_By_Id_When_Call_With_Id() {
        //GIVEN
        UUID expetedId = UUID.randomUUID();
        BookLibraryDTO generated = new BookLibraryDTO(expetedId,"Holloween","Rene descarte","grenn.jpeg");
        bookLibraryRepository.save(generated);

        when(bookLibraryRepository.findById(expetedId)).thenReturn(Optional.of(generated));
        //Act

        BookLibraryDTO actual = bookLibraryService.getBook(String.valueOf(expetedId));
        assertEquals(generated, actual);
    }

    @Test
    public void test_should_create_book() {
        BookLibraryDTO created = new BookLibraryDTO(UUID.randomUUID(),"Sommer Sale","Martin camus","meen.jpeg");
        bookLibraryRepository.save(created);

        when(bookLibraryRepository.save(any(BookLibraryDTO.class))).thenReturn(created);

        BookLibraryDTO actual = bookLibraryService.createBook(created);
        assertEquals(created, actual);
    }

    @Test
    public void test_should_update_book_When_Call_With_Id() {
        UUID expetedId = UUID.randomUUID();
        BookLibraryDTO neue = new BookLibraryDTO(expetedId,"Arabische film","Mandator","krieg.jpg");
        bookLibraryRepository.save(neue);

        when(bookLibraryRepository.findById(expetedId)).thenReturn(Optional.of(neue));
        when(bookLibraryRepository.save(any(BookLibraryDTO.class))).thenReturn(neue);
        BookLibraryDTO actual = bookLibraryService.updateBook(expetedId,neue);

        assertEquals(neue, actual);



    }

    @Test
    public void test_should_delete_book_When_Call_With_Id() {
        UUID expectedId = UUID.randomUUID();
        BookLibraryDTO deleted = new BookLibraryDTO(expectedId,"sehenswürdigkeitfilm","Samory","kunsz.jpeg");
        bookLibraryRepository.save(deleted);


         bookLibraryService.deleteBook(expectedId);

         verify(bookLibraryRepository,times(1)).deleteById(expectedId);



    }
  
}