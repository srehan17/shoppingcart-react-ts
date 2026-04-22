import { Offcanvas, Stack, Button } from "react-bootstrap";
import { useShoppingCart } from "../hooks/useShoppingCart";
import CartItem from "./CartItem";
import { formatCurrency } from "../utilities/formatCurrency";
import { useTranslation } from "react-i18next";

interface ShoppingCartProps {
  isOpen: boolean;
}

const ShoppingCart = ({ isOpen }: ShoppingCartProps) => {
  const { closeCart, cartItems, products } = useShoppingCart();
  const { t, i18n } = useTranslation();

  const total = cartItems.reduce((sum, cartItem) => {
    const item = products.find((p) => p.id === cartItem.id);
    return sum + (item?.price || 0) * cartItem.quantity;
  }, 0);

  return (
    <Offcanvas show={isOpen} placement="end" onHide={closeCart}>
      <Offcanvas.Header closeButton>
        <Offcanvas.Title>{t("cart.title")}</Offcanvas.Title>
      </Offcanvas.Header>
      <Offcanvas.Body className="d-flex flex-column">
        {cartItems.length === 0 ? (
          <p className="text-muted text-center mt-4">{t("cart.empty")}</p>
        ) : (
          <>
            <Stack gap={3} className="flex-grow-1">
              {cartItems.map((item) => (
                <CartItem key={item.id} {...item} />
              ))}
            </Stack>
            <hr />
            <div data-testid="cart-total" className="d-flex justify-content-between fw-bold fs-5 mb-3">
              <span>{t("cart.total")}</span>
              <span>{formatCurrency(total, i18n.language)}</span>
            </div>
            <Button size="lg" className="w-100">
              {t("cart.checkout")}
            </Button>
          </>
        )}
      </Offcanvas.Body>
    </Offcanvas>
  );
};

export default ShoppingCart;
