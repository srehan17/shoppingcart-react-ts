import { Stack, Button } from "react-bootstrap";
import { useShoppingCart } from "../hooks/useShoppingCart";
import { formatCurrency } from "../utilities/formatCurrency";
import { useTranslation } from "react-i18next";

interface CartItemProps {
  id: number;
  quantity: number;
}

const CartItem = ({ id, quantity }: CartItemProps) => {
  const { products, removeFromCart } = useShoppingCart();
  const { i18n } = useTranslation();

  const item = products.find((element) => element.id === id);

  if (item == null) return null;

  const title = i18n.language === "fr" ? (item.titleFr ?? item.title) : item.title;

  return (
    <Stack
      direction="horizontal"
      gap={2}
      style={{ margin: "1rem 0" }}
      className="d-flex align-items-center justify-content-between"
    >
      <img
        src={item.image}
        style={{
          width: "100px",
          height: "auto",
          objectFit: "contain",
        }}
      />
      <div className="me-auto">
        <div>
          <span>{title} </span>
          {quantity > 1 && (
            <span className="text-muted" style={{ fontSize: "0.8rem" }}>
              x{quantity}
            </span>
          )}
        </div>
        <div className="text-muted" style={{ fontSize: "0.75rem" }}>
          {formatCurrency(item.price, i18n.language)}
        </div>
      </div>
      <div>{formatCurrency(item.price * quantity, i18n.language)}&nbsp;</div>
      <Button
        variant="outline-danger"
        size="sm"
        onClick={() => removeFromCart(item.id)}
      >
        &times;
      </Button>
    </Stack>
  );
};

export default CartItem;
