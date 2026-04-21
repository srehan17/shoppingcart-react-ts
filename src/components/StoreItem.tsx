import { Card, Button } from "react-bootstrap";
import { formatCurrency } from "../utilities/formatCurrency";
import { useShoppingCart } from "../hooks/useShoppingCart";

interface StoreItemProps {
  id: number;
  title: string;
  price: number;
  image: string;
}

const StoreItem = ({ id, title, price, image }: StoreItemProps) => {
  const {
    getItemQuantity,
    increaseCartQuantity,
    decreaseCartQuantity,
    removeFromCart,
  } = useShoppingCart();
  const quantity = getItemQuantity(id);

  return (
    <Card className="h-100">
      <Card.Img
        variant="top"
        src={image}
        height="200px"
        className="mt-5"
        style={{ objectFit: "contain" }}
      />
      <Card.Body className="d-flex flex-column">
        <Card.Title className="d-flex justify-content-between align-items-baseline my-4 mh-100">
          <span className="fs-10" style={{ marginRight: "10px" }}>
            {title}
          </span>
          <span className="ms-2 text-muted">{formatCurrency(price)}</span>
        </Card.Title>
        <div className="mt-auto" style={{ minHeight: "80px"}}>
          {quantity === 0 ? (
            <Button 
              aria-label={`add product ${id} to cart`}
              className="w-100 " 
              onClick={() => increaseCartQuantity(id)}>
              + Add to Cart
            </Button>
          ) : (
            <div
              className="d-flex align-items-center flex-column"
              style={{ gap: "0.5rem" }}
            >
              <div
                className="d-flex align-items-center justify-content-center flex-row"
                style={{ gap: "0.5rem" }}
              >
                <Button
                  aria-label={`decrease quantity for product ${id}`}
                  onClick={() => {
                    decreaseCartQuantity(id);
                  }}
                >
                  -
                </Button>
                <div style={{ minWidth: "100px"}} className="text-center">
                  <span className="fs-4 fw-bold">{quantity} </span>
                  
                </div>
                <Button
                  aria-label={`increase quantity for product ${id}`}
                  onClick={() => {
                    increaseCartQuantity(id);
                  }}
                >
                  +
                </Button>
              </div>
              <Button
                variant="danger"
                size="sm"
                onClick={() => {
                  removeFromCart(id);
                }}
              >
                Remove
              </Button>
            </div>
          )}
        </div>
      </Card.Body>
    </Card>
  );
};

export default StoreItem;
