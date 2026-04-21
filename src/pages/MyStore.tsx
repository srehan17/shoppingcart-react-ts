import { Row, Col } from "react-bootstrap"
import StoreItem from "../components/StoreItem"
import { useShoppingCart } from "../hooks/useShoppingCart"
import StoreItemSkeleton from "../components/StoreItemSkeleton"

const MyStore = () => {
  const { products, loading } = useShoppingCart()

  if (loading) return <p>Loading products...</p>;

  if (!loading && products.length === 0) {
    return <p className="text-center">No products available</p>;
  }

  return (
    <>
      <h2 className="text-center mb-4">My Store</h2>
      <Row md={2} xs={1} lg={3} className="g-3">
        {/* {products.map((item) => (
          <Col key={item.id}>
            <StoreItem {...item} />
          </Col>
        ))} */}
        {loading
        ? Array.from({ length: 6 }).map((_, index) => (
            <Col key={index}>
              <StoreItemSkeleton />
            </Col>
          ))
        : products.map((item) => (
            <Col key={item.id}>
              <StoreItem {...item} />
            </Col>
          ))}
      </Row>
    </>
  )
}

export default MyStore
