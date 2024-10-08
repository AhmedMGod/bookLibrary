import './App.css'

import 'bootstrap/dist/css/bootstrap.min.css';

import Footer from "./components/Footer.tsx";
import AppNavbar from "./components/Navbar.tsx";
import {BookList} from "./components/BookList.tsx";


function App() {


    return (
        <div>
            <BookList/>
            <AppNavbar/>
            <Footer/>



      </div>
  )
}

export default App
