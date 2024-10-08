// src/BookLibrary.tsx
import React, { useEffect, useState } from 'react';
import { Form, Button, Row, Col, Card, Container } from 'react-bootstrap';
import axios from 'axios';
import NavBar from './Navbar';
import Footer from './Footer';

// Book interface
interface Book {
    id: number;
    title: string;
    author: string;
    image: string;
}

const BookLibrary: React.FC = () => {
    const [books, setBooks] = useState<Book[]>([]);  // State to store books
    const [title, setTitle] = useState('');  // State for book title input
    const [author, setAuthor] = useState('');  // State for author input
    const [image, setImage] = useState<string | ArrayBuffer | null>('');  // State for uploaded image
    const [editMode, setEditMode] = useState(false);  // State to control edit mode
    const [editingBookId, setEditingBookId] = useState<number | null>(null);  // State for the book being edited

    const API_URL = 'http://localhost:8080/api/books'; // Adjust your backend URL as needed

    // Fetch books from the backend
    const fetchBooks = async () => {
        try {
            const response = await axios.get(API_URL);
            setBooks(response.data);  // Set books from response
        } catch (error) {
            console.error('Error fetching books:', error);
        }
    };

    useEffect(() => {
        fetchBooks();  // Fetch books on component mount
    }, []);

    // Handle adding a new book
    const handleAddBook = async (e: React.FormEvent) => {
        e.preventDefault();  // Prevent default form submission

        const newBook: Book = {
            id: books.length + 1,  // You might want to remove this if your backend assigns IDs
            title,
            author,
            image: typeof image === 'string' ? image : '', // Store image URL
        };

        try {
            await axios.post(API_URL, newBook);  // Send POST request to add the new book
            setBooks([...books, newBook]); // Add new book to the state
            resetForm();  // Reset the form fields
        } catch (error) {
            console.error('Error adding book:', error);
        }
    };

    // Handle editing a book
    const handleEditBook = (id: number) => {
        const bookToEdit = books.find(book => book.id === id);
        if (bookToEdit) {
            setEditingBookId(bookToEdit.id);
            setTitle(bookToEdit.title);
            setAuthor(bookToEdit.author);
            setImage(bookToEdit.image); // Set the image for editing
            setEditMode(true);  // Enable edit mode
        }
    };

    // Handle saving the edited book
    const handleSaveEdit = async () => {
        if (editingBookId === null) return;

        const updatedBook: Book = {
            id: editingBookId,
            title,
            author,
            image: typeof image === 'string' ? image : '',
        };

        try {
            await axios.put(`${API_URL}/${editingBookId}`, updatedBook); // Send PUT request to update the book
            setBooks(books.map(book => (book.id === editingBookId ? updatedBook : book))); // Update book in state
            resetForm();  // Reset the form fields
        } catch (error) {
            console.error('Error updating book:', error);
        }
    };

    // Handle deleting a book
    const handleDeleteBook = async (id: number) => {
        try {
            await axios.delete(`${API_URL}/${id}`); // Send DELETE request to remove the book
            setBooks(books.filter(book => book.id !== id));  // Remove book from the state
        } catch (error) {
            console.error('Error deleting book:', error);
        }
    };

    // Handle image upload
    const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0]; // Get the uploaded file
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                setImage(reader.result); // Set the preview image
            };
            reader.readAsDataURL(file); // Convert file to base64 URL
        }
    };

    // Reset form fields
    const resetForm = () => {
        setEditMode(false);  // Disable edit mode
        setEditingBookId(null);  // Clear editing book ID
        setTitle('');  // Clear the form fields
        setAuthor('');
        setImage(''); // Clear the image preview
    };

    return (
        <>
            <NavBar />  {/* Include Navbar */}
            <Container className="mt-4">
                <Row>
                    {/* Form to add a new book */}
                    <Col sm={4} className="mb-4">
                        <h2 className="text-center">Add a New Book</h2>
                        <Form onSubmit={editMode ? handleSaveEdit : handleAddBook} className="shadow p-3 mb-5 bg-white rounded">
                            <Form.Group className="mb-3">
                                <Form.Label>Title</Form.Label>
                                <Form.Control
                                    type="text"
                                    value={title}
                                    onChange={(e) => setTitle(e.target.value)}
                                    placeholder="Enter book title"
                                    required
                                />
                            </Form.Group>

                            <Form.Group className="mb-3">
                                <Form.Label>Author</Form.Label>
                                <Form.Control
                                    type="text"
                                    value={author}
                                    onChange={(e) => setAuthor(e.target.value)}
                                    placeholder="Enter author name"
                                    required
                                />
                            </Form.Group>

                            <Form.Group className="mb-3">
                                <Form.Label>Upload Image</Form.Label>
                                <Form.Control
                                    type="file"
                                    accept="image/*"
                                    onChange={handleImageUpload}
                                />
                            </Form.Group>

                            {image && (
                                <div className="mb-3">
                                    <img
                                        src={typeof image === 'string' ? image : ''}
                                        alt="Uploaded"
                                        style={{ maxWidth: '100%', maxHeight: '200px', borderRadius: '8px' }}
                                    />
                                </div>
                            )}

                            <Button variant="primary" type="submit" >
                                {editMode ? 'Save Changes' : 'Add Book'}
                            </Button>
                        </Form>
                    </Col>

                    {/* Books Gallery */}
                    <Col sm={8}>
                        <h2 className="text-center">Book Gallery</h2>
                        <Row className="mt-4">
                            {books.length > 0 ? (
                                books.map((book) => (
                                    <Col key={book.id} sm={6} md={4}>
                                        <Card className="mb-3 shadow">
                                            <Card.Img variant="top" src={book.image} alt={book.title} />
                                            <Card.Body>
                                                <Card.Title>{book.title}</Card.Title>
                                                <Card.Text>{book.author}</Card.Text>
                                                <Button
                                                    variant="warning"
                                                    onClick={() => handleEditBook(book.id)}
                                                >
                                                    Edit
                                                </Button>
                                                <Button
                                                    variant="danger"
                                                    onClick={() => handleDeleteBook(book.id)}
                                                    style={{ marginLeft: '8px' }}
                                                >
                                                    Delete
                                                </Button>
                                            </Card.Body>
                                        </Card>
                                    </Col>
                                ))
                            ) : (
                                <p>No books found. Add a new book above!</p>
                            )}
                        </Row>
                    </Col>
                </Row>
            </Container>

            <Footer />  {/* Include Footer */}
        </>
    );
};

export default BookLibrary;