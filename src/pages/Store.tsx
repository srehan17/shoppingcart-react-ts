import { useState, useEffect } from "react";
import { Row, Col } from "react-bootstrap";
import StoreItem from "../components/StoreItem";

interface Products {
  id: number;
  title: string;
  description: string;
  image: string;
  price: number;
}

const Store = () => {
  const [products, setProducts] = useState<Products[]>([]);

  useEffect(() => {
    const fetchData = fetch("https://fakestoreapi.com/products")
      .then((res) => res.json())
      .then((data) => {
        setProducts(data);
      })
      .catch((error) => console.log("Error fetching products"));
  }, []);

  return (
    <>
      <h1>Store</h1>
      <Row md={2} xs={1} lg={3} className="g-3">
        {products.map((item) => (
          <Col key={item.id}>
            <StoreItem {...item} />
          </Col>
        ))}
      </Row>
    </>
  );
};

export default Store;
