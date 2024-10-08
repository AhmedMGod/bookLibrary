import './App.css'

import 'bootstrap/dist/css/bootstrap.min.css';

import Footer from "./components/Footer.tsx";
import AppNavbar from "./components/Navbar.tsx";


function App() {


    return (
        <div>
            <AppNavbar/>
            <h1>Books Library</h1>
            <h2> books Gallery</h2>
            <p> Here all books </p>
            <Footer/>

      </div>
  )
}

export default App
