/*
import {BookLibrary} from "../types/BookLibrary.ts";
import {BookService} from "../types/BookService.ts";

import {ChangeEvent, useEffect, useState} from "react";


interface BookDialogProps {
    visible: boolean;
    book:BookLibrary |null;
    onHide: () => void;
    onSave: (book:BookLibrary) => void;
}

export const BookDialogForm: React.FC<BookDialogProps> = ({visible, onHide, book}) => {
    const [formState,setFormState]= useState<BookLibrary>({
         id:'',
        title:'',
        author:'',
        image:'',
    });
    const bookService = new BookService();

    useEffect(()=>{
        if (book){
            setFormState(book) ;// Formular mit Buchdaten füllen
        } else{
            setFormState({
                id:'',
                title:'',
                author:'',
                image:'',
            }) ;  //Formular mit leeren Feldern zurücksetzen
        }


    },[book]);

    const handleInputChange = (event:ChangeEvent<HTMLInputElement>) => {
        const {name,value} = event.target;
        setFormState(prevState => ({
            ...prevState, [name]: value}));
    };

    const onSubmit = async ()=>{
        try {
            let savedBook:BookLibrary;
            if (book){
                savedBook=await bookService.updateBook(book.id,formState);
            }else{
                savedBook=await bookService.createBook(formState);
            }
            onSave(savedBook);
        }catch(error){
            console.error("error saving book:" ,error);
        }
    };

    return(
        <div className="bookDialogForm">
            <form onSubmit={(e)=>{e.preventDefault();onSubmit();}}>
                <input
                type="text"
                name="title"
                value={formState.title}
                onChange={handleInputChange}/>

                <input
                type="text"
                name="author"
                value={formState.author}
                onChange={handleInputChange}/>

                <input
                type="file"
                accept="image/png,image/gif,image/jpeg"
                name="image"
                value={formState.image}
                onChange={handleInputChange}
                />

                <button type="submit">Save</button>


            </form>
        </div>
    )
*/

import React, { useEffect } from 'react';
import { Dialog } from 'primereact/dialog';
import { Button } from 'primereact/button';
import { InputText } from 'primereact/inputtext';
import { useForm, Controller } from 'react-hook-form';
import { BookService } from '../types/BookService';
import { BookLibrary } from '../types/BookLibrary';

interface BookDialogProps {
    visible: boolean;
    book: BookLibrary | null;
    onHide: () => void;
    onSave: (book: BookLibrary) => void;
}

export const BookDialogForm: React.FC<BookDialogProps> = ({ visible, book, onHide, onSave }) => {
    const { control, handleSubmit, reset } = useForm<BookLibrary>();
    const bookService = new BookService();

    useEffect(() => {
        if (book) {
            reset(book);  // Formular mit buchdaten füllen
        } else {
            reset({
                id: '',
                title: '',
                author: '',
                image: '',
            });
        }
    }, [book, reset]);

    const onSubmit = async (data: BookLibrary) => {
        try {
            let savedBook: BookLibrary;
            if (book) {
                savedBook = await bookService.updateBook(book.id, data);
            } else {
                savedBook = await bookService.createBook(data);
            }
            onSave(savedBook);
        } catch (error) {
            console.error('Error saving book:', error);
            // Handle error (e.g., show error message)
        }
    };

    return (
        <Dialog visible={visible} style={{ width: '450px' }} header={book ? 'Edit Book' : 'Add Book'} modal className="p-fluid" onHide={onHide}>
            <form onSubmit={handleSubmit(onSubmit)}>
                <div className="p-field">
                    <label htmlFor="title">Title</label>
                    <Controller
                        name="title"
                        control={control}
                        rules={{ required: 'Title is required.' }}
                        render={({ field, fieldState }) => (
                            <InputText id={field.name} {...field} autoFocus className={fieldState.invalid ? 'p-invalid' : ''} />
                        )}
                    />
                </div>
                <div className="p-field">
                    <label htmlFor="author">Author</label>
                    <Controller
                        name="author"
                        control={control}
                        rules={{ required: 'Author is required.' }}
                        render={({ field, fieldState }) => (
                            <InputText id={field.name} {...field} className={fieldState.invalid ? 'p-invalid' : ''} />
                        )}
                    />
                </div>
                <div className="p-field">
                    <label htmlFor="image">Image URL</label>
                    <Controller
                        name="image"
                        control={control}
                        rules={{ required: 'Image URL is required.' }}
                        render={({ field, fieldState }) => (
                            <InputText id={field.name} {...field} className={fieldState.invalid ? 'p-invalid' : ''} />
                        )}
                    />
                </div>
                <Button type="submit" label="Save" icon="pi pi-check" className="p-mt-2" />
            </form>
        </Dialog>
    );
};
