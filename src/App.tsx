import { Route, Routes, useLocation } from "react-router-dom"
import { Container } from "react-bootstrap"
import { useEffect } from "react"
import Contact from "./pages/Contact"
import MyStore from "./pages/MyStore"
import About from "./pages/About"
import Navbar from "./components/Navbar"
import ScrollToTopButton from "./components/ScrollToTopButton"
import { ShoppingCartProvider } from "./context/ShoppingCartContext"

const ScrollToTop = () => {
  const { pathname } = useLocation()
  useEffect(() => { window.scrollTo(0, 0) }, [pathname])
  return null
}

const App = () => {
  return (
    <ShoppingCartProvider>
      <Navbar />
      <ScrollToTop />
      <ScrollToTopButton />
      <Container className="mb-4">
        <Routes>
          <Route path="/" element={<MyStore />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
        </Routes>
      </Container>
    </ShoppingCartProvider>
  )
}

export default App
