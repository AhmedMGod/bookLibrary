import React, {useEffect, useState} from "react";
import {BookLibrary} from "../types/BookLibrary.ts";
import {Toast} from "primereact/toast";
import {BookService} from "../types/BookService.ts";
import {ConfirmDialog, confirmDialog} from "primereact/confirmdialog";
import {InputText} from "primereact/inputtext";
import { Button } from 'primereact/button';
import {DataTable} from "primereact/datatable";
import {Column} from "primereact/column";
import {BookDialogForm} from "./BookDialogForm.tsx";


export const BookList:React.FC = ()=>{
    const [books, setBooks]= useState<BookLibrary[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [showDialog, setShowDialog] = useState<boolean>(false);
    const [selectedBook,setSelectedBook]= useState<BookLibrary |null>(null);
    const [globalFilter, setGlobalFilter]= useState<string>('');


    //hier wird ein veränderliches Objekt erstellen, das zwischen Renderzyklen von React bestehen bleibt,ohne dass eine erneute Komponente gerendet wird
    const toast = React.useRef<Toast>(null);
    const bookService = new BookService();

    useEffect(()=>{
        getbooks();
    },[]);

    // daten von der datenbank Abrufen
    const getbooks = async () => {
        try {
            const data = await bookService.getBooks();
            setBooks(data);
            setLoading(false);
        }catch(error){
            console.log( 'Error fetching books.' ,error);
            setLoading(false);
        }
    };

    //create opendialog

    const openCreateDialog =()=>{
        setSelectedBook(null);
        setShowDialog(true);
    };

    const openEditDialog =(book:BookLibrary)=>{
        setSelectedBook(book);
        setShowDialog(true);
    };
    const closeDialog =()=>{
        setShowDialog(false);
        setSelectedBook(null);
    }

    const onBookSave =(savedBook:BookLibrary)=>{
        setBooks(prevBooks =>{
            const index = prevBooks.findIndex(bookService =>bookService.id===savedBook.id);
            if (index !== -1){
                //update existing book
                return prevBooks.map(book =>book.id===savedBook.id ? savedBook : book);
            } else {
                //add new book
                return [savedBook, ...prevBooks];
            }
        });
        closeDialog()
        toast.current?.show({ severity: 'success', summary: 'success', detail:'Saved book saved' });
    };

    const confirmDelete =(book:BookLibrary)=>{
        confirmDialog.show({
            message: `Do you want to delete $${book.title}?`,
            header: 'Delete Confirmation',
            icon: 'pi pi-info-circle',
            acceptClassName: 'p-button-danger',
            accept:() => deleteBook(book),
        });
    };

    const deleteBook =  async  (book:BookLibrary)=>{
        try {
            await bookService.deleteBook(book.id);
            setBooks(books.filter(b => b.id!==book.id));
            toast.current?.show({severity:'info', summary: 'Confirmed', detail:'book successfully deleted' });
        } catch (error) {
            console.log("Error deleting Book", error);
            toast.current?.show({severity:'error', summary: 'Error', detail: 'Book deleted failed' });
        }
    };

    const header =(
        <div className="table-header">
            <h5 className="mx-0 my-1">Manage Books</h5>
            < span className="p-input-icon-left">
                <i className="pi-pi-seach" />
                <InputText type= "search" onInput={(e) =>setGlobalFilter((e.target as HTMLFormElement).value)} placeholder="Search Books" />

            </span>

        </div>
    );

    const actionBodyTemplate = (rowData:BookLibrary)=>{
        return(
            <React.Fragment>
                <Button icon="pi pi-pencil" className="p-button-rounded p-button-success p-mr-2" onClick={() => openEditDialog(rowData)}></Button>
                <Button icon="pi pi-trahs" className="p-button-rounded p-button-warning" onClick={() => confirmDelete(rowData)}></Button>
            </React.Fragment>
        );
    };

    const imageBodyTemplate = (rowData:BookLibrary)=>{
        return <img src={rowData.image} alt={rowData.title} className="book-image" style={{width: '50px', height: 'auto'}} />

    };


    return(
        <div>
            <Toast ref = {toast}></Toast>
            <ConfirmDialog/>

            <div className="card">
                <DataTable
                    value={books}
                    paginator
                    rows={10}
                    dataKey="id"
                    filters={{global:{value:globalFilter,matchMode:'contains'}}}
                    filterDisplay="menu"
                    loading={loading}
                    globalFilterFields={['title','author']}
                    header={header}
                    emptyMessage="No books found."
                    >
                    <Column field="image" header="Image" body={imageBodyTemplate} />
                    <Column field="title" header="Title" sortable filter filterPlaceholder="Search by title" />
                    <Column field="author" header="Author" sortable filter filterPlaceholder="Search by author" />
                    <Column body={actionBodyTemplate} exportable={false} style={{minWidth: '8rem'}}/>
                </DataTable>

            </div>
            <Button label="Add New Book"
                    icon={"pi pi-plus"}
                    onClick={openCreateDialog}
                    className=" p-mt-2"/>
            <BookDialogForm
                visible={showDialog}
                book={selectedBook}
                onHide={closeDialog}
                onSave={onBookSave}
                />

        </div>
    )



}