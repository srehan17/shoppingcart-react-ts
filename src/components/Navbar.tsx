import { Button, Container, Nav, Navbar as NavbarBS } from "react-bootstrap"
import { NavLink } from "react-router-dom"
import { useShoppingCart } from "../hooks/useShoppingCart";
import { useTranslation } from "react-i18next";

const Navbar = () => {
  const { openCart, cartQuantity } = useShoppingCart()
  const { t, i18n } = useTranslation()

  return (
    <NavbarBS sticky="top" className="site-navbar shadow-sm mb-3">
      <Container>
        <Nav className="me-auto">
          <Nav.Link to="/" as={NavLink}>
            {t("nav.store")}
          </Nav.Link>
          <Nav.Link to="/about" as={NavLink}>
            {t("nav.about")}
          </Nav.Link>
          <Nav.Link to="/contact" as={NavLink}>
            {t("nav.contact")}
          </Nav.Link>
        </Nav>
        {cartQuantity > 0 && <Button
          aria-label={t("nav.openCart", { count: cartQuantity })}
          style={{ width: "2.2rem", height: "2.2rem", position: "relative" }}
          variant="outline-primary"
          className="rounded-circle"
          onClick={openCart}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 576 512"
            fill="currentColor"
            style={{ width: "1rem", height: "1rem" }}
          >
            <path d="M96 0C107.5 0 117.4 8.19 119.6 19.51L121.1 32H541.8C562.1 32 578.3 52.25 572.6 72.66L518.6 264.7C514.7 278.5 502.1 288 487.8 288H170.7L179.9 336H488C501.3 336 512 346.7 512 360C512 373.3 501.3 384 488 384H159.1C148.5 384 138.6 375.8 136.4 364.5L76.14 48H24C10.75 48 0 37.25 0 24C0 10.75 10.75 0 24 0H96zM128 464C128 437.5 149.5 416 176 416C202.5 416 224 437.5 224 464C224 490.5 202.5 512 176 512C149.5 512 128 490.5 128 464zM512 464C512 490.5 490.5 512 464 512C437.5 512 416 490.5 416 464C416 437.5 437.5 416 464 416C490.5 416 512 437.5 512 464z" />
          </svg>
          <div
            data-testid="cart-quantity"
            className="rounded-circle bg-danger d-flex justify-content-center align-items-center"
            style={{
              color: "white",
              width: "1rem",
              height: "1rem",
              fontSize: "0.65rem",
              position: "absolute",
              bottom: 0,
              right: 0,
              transform: "translate(28%, 28%)",
            }}
          >
            {cartQuantity}
          </div>
        </Button>}
        <select
          value={i18n.language}
          onChange={(e) => i18n.changeLanguage(e.target.value)}
          className="form-select form-select-sm w-auto ms-3"
          aria-label="Select language"
        >
          <option value="en">English</option>
          <option value="fr">Français</option>
        </select>
      </Container>
    </NavbarBS>
  )
}

export default Navbar
