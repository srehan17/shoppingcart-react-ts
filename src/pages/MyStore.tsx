import { useMemo, useState } from "react"
import { Row, Col, Nav, Form } from "react-bootstrap"
import StoreItem from "../components/StoreItem"
import { useShoppingCart } from "../hooks/useShoppingCart"
import StoreItemSkeleton from "../components/StoreItemSkeleton"
import { useTranslation } from "react-i18next"

const CATEGORIES = ["men's clothing", "women's clothing", "electronics", "jewelery"] as const
type Category = typeof CATEGORIES[number]
type SortOption = "default" | "price-asc" | "price-desc" | "name-asc" | "name-desc"

const MyStore = () => {
  const { products, loading } = useShoppingCart()
  const { t, i18n } = useTranslation()
  const [activeCategory, setActiveCategory] = useState<Category | null>(null)
  const [searchTerm, setSearchTerm] = useState("")
  const [sortBy, setSortBy] = useState<SortOption>("default")

  const filtered = useMemo(() => {
    const lang = i18n.language as keyof (typeof products)[0]["title"]

    const result = products.filter((p) => {
      const matchesCategory = activeCategory ? p.category === activeCategory : true
      const localizedTitle = (p.title[lang] ?? p.title.en).toLowerCase()
      return matchesCategory && localizedTitle.includes(searchTerm.toLowerCase())
    })

    switch (sortBy) {
      case "price-asc":  return [...result].sort((a, b) => a.price - b.price)
      case "price-desc": return [...result].sort((a, b) => b.price - a.price)
      case "name-asc":   return [...result].sort((a, b) => (a.title[lang] ?? a.title.en).localeCompare(b.title[lang] ?? b.title.en))
      case "name-desc":  return [...result].sort((a, b) => (b.title[lang] ?? b.title.en).localeCompare(a.title[lang] ?? a.title.en))
      default:           return result
    }
  }, [products, activeCategory, searchTerm, sortBy, i18n.language])

  if (loading) return <p>{t("store.loading")}</p>

  return (
    <>
      <div className="d-flex align-items-center justify-content-between mb-4 gap-3 flex-wrap">
        <Nav variant="pills" className="gap-1">
          <Nav.Item>
            <Nav.Link
              active={activeCategory === null}
              onClick={() => { setActiveCategory(null); setSearchTerm("") }}
            >
              {t("categories.all")}
            </Nav.Link>
          </Nav.Item>
          {CATEGORIES.map((cat) => (
            <Nav.Item key={cat}>
              <Nav.Link
                active={activeCategory === cat}
                onClick={() => { setActiveCategory(cat); setSearchTerm("") }}
              >
                {t(`categories.${cat}`)}
              </Nav.Link>
            </Nav.Item>
          ))}
        </Nav>
        <div className="d-flex gap-2">
          <Form.Control
            type="search"
            placeholder={t("store.searchPlaceholder")}
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            style={{ maxWidth: "200px" }}
          />
          <Form.Select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value as SortOption)}
            style={{ maxWidth: "220px" }}
          >
            <option value="default">{t("store.sortDefault")}</option>
            <option value="price-asc">{t("store.sortPriceLow")}</option>
            <option value="price-desc">{t("store.sortPriceHigh")}</option>
            <option value="name-asc">{t("store.sortNameAZ")}</option>
            <option value="name-desc">{t("store.sortNameZA")}</option>
          </Form.Select>
        </div>
      </div>

      {filtered.length === 0 ? (
        <div className="d-flex justify-content-center align-items-center" style={{ minHeight: "40vh" }}>
          <p className="text-muted fs-5">{t("store.noProducts")}</p>
        </div>
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
                    title={item.title[i18n.language as keyof typeof item.title] ?? item.title.en}
                  />
                </Col>
              ))}
        </Row>
      )}
    </>
  )
}

export default MyStore
