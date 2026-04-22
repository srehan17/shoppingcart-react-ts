import { useState } from "react"
import { Row, Col, Nav } from "react-bootstrap"
import StoreItem from "../components/StoreItem"
import { useShoppingCart } from "../hooks/useShoppingCart"
import StoreItemSkeleton from "../components/StoreItemSkeleton"
import { useTranslation } from "react-i18next"

const CATEGORIES = ["men's clothing", "women's clothing", "electronics", "jewelery"] as const
type Category = typeof CATEGORIES[number]

const MyStore = () => {
  const { products, loading } = useShoppingCart()
  const { t, i18n } = useTranslation()
  const [activeCategory, setActiveCategory] = useState<Category | null>(null)

  const filtered = activeCategory
    ? products.filter((p) => p.category === activeCategory)
    : products

  if (loading) return <p>{t("store.loading")}</p>

  return (
    <>
      <h2 className="text-center mb-3">{t("store.title")}</h2>

      <Nav variant="pills" className="justify-content-center mb-4 gap-1">
        <Nav.Item>
          <Nav.Link
            active={activeCategory === null}
            onClick={() => setActiveCategory(null)}
          >
            {t("categories.all")}
          </Nav.Link>
        </Nav.Item>
        {CATEGORIES.map((cat) => (
          <Nav.Item key={cat}>
            <Nav.Link
              active={activeCategory === cat}
              onClick={() => setActiveCategory(cat)}
            >
              {t(`categories.${cat}`)}
            </Nav.Link>
          </Nav.Item>
        ))}
      </Nav>

      {filtered.length === 0 ? (
        <p className="text-center">{t("store.noProducts")}</p>
      ) : (
        <Row md={2} xs={1} lg={3} className="g-3">
          {loading
            ? Array.from({ length: 6 }).map((_, index) => (
                <Col key={index}>
                  <StoreItemSkeleton />
                </Col>
              ))
            : filtered.map((item) => (
                <Col key={item.id}>
                  <StoreItem
                    {...item}
                    title={i18n.language === "fr" ? (item.titleFr ?? item.title) : item.title}
                  />
                </Col>
              ))}
        </Row>
      )}
    </>
  )
}

export default MyStore
