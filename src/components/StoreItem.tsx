import { Card, Button } from "react-bootstrap";
import { formatCurrency } from "../utilities/formatCurrency";
import { useShoppingCart } from "../hooks/useShoppingCart";
import { useTranslation } from "react-i18next";
import "./StoreItem.css";

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
  const { t, i18n } = useTranslation();
  const quantity = getItemQuantity(id);

  return (
    <Card className="h-100 store-card">
      <Card.Img
        variant="top"
        src={image}
        height="200px"
        className="mt-5"
        style={{ objectFit: "contain" }}
      />
      <Card.Body className="d-flex flex-column">
        <Card.Title className="my-4" style={{ minHeight: "4rem" }}>
          <span
            style={{
              display: "-webkit-box",
              WebkitLineClamp: 2,
              WebkitBoxOrient: "vertical",
              overflow: "hidden",
            }}
          >
            {title}
          </span>
          <span className="text-muted fs-6 fw-normal">{formatCurrency(price, i18n.language)}</span>
        </Card.Title>
        <div className="mt-auto d-flex flex-column justify-content-center" style={{ minHeight: "5rem" }}>
          {quantity === 0 ? (
            <Button
              aria-label={t("cart.addAriaLabel", { id })}
              className="w-100"
              onClick={() => increaseCartQuantity(id)}>
              {t("cart.addToCart")}
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
                  aria-label={t("cart.decreaseAriaLabel", { id })}
                  onClick={() => decreaseCartQuantity(id)}
                >
                  -
                </Button>
                <div style={{ minWidth: "100px"}} className="text-center">
                  <span className="fs-4 fw-bold">{quantity} </span>
                </div>
                <Button
                  aria-label={t("cart.increaseAriaLabel", { id })}
                  onClick={() => increaseCartQuantity(id)}
                >
                  +
                </Button>
              </div>
              <Button
                variant="danger"
                size="sm"
                onClick={() => removeFromCart(id)}
              >
                {t("cart.remove")}
              </Button>
            </div>
          )}
        </div>
      </Card.Body>
    </Card>
  );
};

export default StoreItem;
