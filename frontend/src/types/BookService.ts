/*
import axios from 'axios';
import { BookLibrary } from './BookLibrary.ts';

const API_URL = '/api/books';

export class BookService {
    async getBooks(): Promise<BookLibrary[]> {
        const response = await axios.get<BookLibrary[]>(API_URL);
        return response.data;
    }


    async getBook(id: string): Promise<BookLibrary> {
        const response = await axios.get<BookLibrary>(`${API_URL}/${id}`);
        return response.data;
    }

    async createBook(book: Omit<BookLibrary, 'id'>): Promise<BookLibrary> {
        const response = await axios.post<BookLibrary>(API_URL, book);
        return response.data;
    }

    async updateBook(id: string, book: Omit<BookLibrary, 'id'>): Promise<BookLibrary> {
        const response = await axios.put<BookLibrary>(`${API_URL}/${id}`, book);
        return response.data;
    }

    async deleteBook(id: string): Promise<void> {
        await axios.delete(`${API_URL}/${id}`);
    }
}*/
