import { Row, Col } from "react-bootstrap"
import StoreItem from "../components/StoreItem"
import { useShoppingCart } from "../context/ShoppingCartContext"

const MyStore = () => {
  const { products } = useShoppingCart()

  return (
    <>
      <h2 className="text-center mb-4">My Store</h2>
      <Row md={2} xs={1} lg={3} className="g-3">
        {products.map((item) => (
          <Col key={item.id}>
            <StoreItem {...item} />
          </Col>
        ))}
      </Row>
    </>
  )
}

export default MyStore
