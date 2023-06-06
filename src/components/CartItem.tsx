import { Stack, Image, Button } from "react-bootstrap";
import { useShoppingCart } from "../context/ShoppingCartContext";
import { formatCurrency } from "../utilities/formatCurrency";

interface CartItemProps {
  id: number;
  quantity: number;
}

const CartItem = ({ id, quantity }: CartItemProps) => {
  const { products, removeFromCart } = useShoppingCart();

  const item = products.find((element) => element.id === id);

  if (item == null) return null;

  return (
    <Stack direction="horizontal" gap={2} className="d-flex align-items-center">
      <Image
        src={item.image}
        style={{
          width: "125px",
          height: "75px",
          marginRight: "1rem",
          objectFit: "contain",
        }}
      />
      <div className="me-auto">
        <div>
          <span>{item.title} </span>
          {quantity > 1 && (
            <span className="text-muted" style={{ fontSize: "0.8rem" }}>
              x{quantity}
            </span>
          )}
        </div>
        <div className="text-muted" style={{ fontSize: "0.75rem" }}>
          {formatCurrency(item.price)}
        </div>
      </div>
      <div>{formatCurrency(item.price * quantity)}</div>
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
