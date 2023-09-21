import { Route, Routes } from "react-router-dom"
import { Container } from "react-bootstrap"
import Contact from "./pages/Contact"
import MyStore from "./pages/MyStore"
import About from "./pages/About"
import Navbar from "./components/Navbar"
import { ShoppingCartProvider } from "./context/ShoppingCartContext"

const App = () => {
  return (
    <ShoppingCartProvider>
      <Navbar />
      <Container className="mb-4">
        <Routes>
          <Route path="/mystore" element={<MyStore />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
        </Routes>
      </Container>
      <MyStore />
    </ShoppingCartProvider>
  )
}

export default App
