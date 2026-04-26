import { Button, Container, Dropdown, Nav, Navbar as NavbarBS } from "react-bootstrap"
import { NavLink } from "react-router-dom"
import { useShoppingCart } from "../hooks/useShoppingCart";
import { useTranslation } from "react-i18next";

const Navbar = () => {
  const { openCart, cartQuantity } = useShoppingCart()
  const { t, i18n } = useTranslation()

  return (
    <NavbarBS expand="lg" sticky="top" className="site-navbar shadow-sm mb-3">
      <Container>
        <NavbarBS.Brand as={NavLink} to="/" className="me-3">
          <svg width="28" height="28" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <rect width="24" height="24" rx="4" fill="white" fillOpacity="0.15"/>
            <path d="M3 3h2l3 12h10l3-8H6" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </NavbarBS.Brand>

        <div className="d-flex align-items-center gap-2 ms-auto d-lg-none">
          {cartQuantity > 0 && (
            <Button
              aria-label={t("nav.openCart", { count: cartQuantity })}
              style={{ width: "2.2rem", height: "2.2rem", position: "relative" }}
              variant="outline-primary"
              className="rounded-circle"
              onClick={openCart}
            >
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 576 512" fill="currentColor" style={{ width: "1rem", height: "1rem" }}>
                <path d="M96 0C107.5 0 117.4 8.19 119.6 19.51L121.1 32H541.8C562.1 32 578.3 52.25 572.6 72.66L518.6 264.7C514.7 278.5 502.1 288 487.8 288H170.7L179.9 336H488C501.3 336 512 346.7 512 360C512 373.3 501.3 384 488 384H159.1C148.5 384 138.6 375.8 136.4 364.5L76.14 48H24C10.75 48 0 37.25 0 24C0 10.75 10.75 0 24 0H96zM128 464C128 437.5 149.5 416 176 416C202.5 416 224 437.5 224 464C224 490.5 202.5 512 176 512C149.5 512 128 490.5 128 464zM512 464C512 490.5 490.5 512 464 512C437.5 512 416 490.5 416 464C416 437.5 437.5 416 464 416C490.5 416 512 437.5 512 464z" />
              </svg>
              <div
                data-testid="cart-quantity"
                className="rounded-circle bg-danger d-flex justify-content-center align-items-center"
                style={{ color: "white", width: "1rem", height: "1rem", fontSize: "0.65rem", position: "absolute", bottom: 0, right: 0, transform: "translate(28%, 28%)" }}
              >
                {cartQuantity}
              </div>
            </Button>
          )}
          <NavbarBS.Toggle aria-controls="main-nav" />
        </div>

        <NavbarBS.Collapse id="main-nav">
          <Nav className="me-auto">
            <Nav.Link to="/" as={NavLink} className="fw-bold fs-5">
              {t("nav.store")}
            </Nav.Link>
            <Nav.Link to="/about" as={NavLink}>
              {t("nav.about")}
            </Nav.Link>
            <Nav.Link to="/contact" as={NavLink}>
              {t("nav.contact")}
            </Nav.Link>
          </Nav>
          <div className="d-none d-lg-flex align-items-center gap-2">
            {cartQuantity > 0 && (
              <Button
                aria-label={t("nav.openCart", { count: cartQuantity })}
                style={{ width: "2.2rem", height: "2.2rem", position: "relative" }}
                variant="outline-primary"
                className="rounded-circle"
                onClick={openCart}
              >
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 576 512" fill="currentColor" style={{ width: "1rem", height: "1rem" }}>
                  <path d="M96 0C107.5 0 117.4 8.19 119.6 19.51L121.1 32H541.8C562.1 32 578.3 52.25 572.6 72.66L518.6 264.7C514.7 278.5 502.1 288 487.8 288H170.7L179.9 336H488C501.3 336 512 346.7 512 360C512 373.3 501.3 384 488 384H159.1C148.5 384 138.6 375.8 136.4 364.5L76.14 48H24C10.75 48 0 37.25 0 24C0 10.75 10.75 0 24 0H96zM128 464C128 437.5 149.5 416 176 416C202.5 416 224 437.5 224 464C224 490.5 202.5 512 176 512C149.5 512 128 490.5 128 464zM512 464C512 490.5 490.5 512 464 512C437.5 512 416 490.5 416 464C416 437.5 437.5 416 464 416C490.5 416 512 437.5 512 464z" />
                </svg>
                <div
                  data-testid="cart-quantity"
                  className="rounded-circle bg-danger d-flex justify-content-center align-items-center"
                  style={{ color: "white", width: "1rem", height: "1rem", fontSize: "0.65rem", position: "absolute", bottom: 0, right: 0, transform: "translate(28%, 28%)" }}
                >
                  {cartQuantity}
                </div>
              </Button>
            )}
            <Dropdown align="end" className="ms-2 text-white">
              <Dropdown.Toggle variant="outline-light" size="sm">
                {{ en: "English (CA)", fr: "Français (CA)", es: "Español (ES)" }[i18n.language] ?? i18n.language}
              </Dropdown.Toggle>
              <Dropdown.Menu className="lang-menu">
                <Dropdown.Item onClick={() => i18n.changeLanguage("en")}>English (CA)</Dropdown.Item>
                <Dropdown.Item onClick={() => i18n.changeLanguage("fr")}>Français (CA)</Dropdown.Item>
                <Dropdown.Item onClick={() => i18n.changeLanguage("es")}>Español (ES)</Dropdown.Item>
              </Dropdown.Menu>
            </Dropdown>
          </div>
          <div className="d-lg-none mt-2">
            <Dropdown className="text-white">
              <Dropdown.Toggle variant="outline-light" size="sm">
                {{ en: "English (CA)", fr: "Français (CA)", es: "Español (ES)" }[i18n.language] ?? i18n.language}
              </Dropdown.Toggle>
              <Dropdown.Menu className="lang-menu">
                <Dropdown.Item onClick={() => i18n.changeLanguage("en")}>English (CA)</Dropdown.Item>
                <Dropdown.Item onClick={() => i18n.changeLanguage("fr")}>Français (CA)</Dropdown.Item>
                <Dropdown.Item onClick={() => i18n.changeLanguage("es")}>Español (ES)</Dropdown.Item>
              </Dropdown.Menu>
            </Dropdown>
          </div>
        </NavbarBS.Collapse>
      </Container>
    </NavbarBS>
  )
}

export default Navbar
