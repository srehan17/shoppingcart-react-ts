import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { MemoryRouter } from "react-router-dom";
import App from "./App";
import i18n from "./i18n";

beforeEach(() => {
  i18n.changeLanguage("en");
});

function renderApp() {
  return render(
    <MemoryRouter initialEntries={["/"]}>
      <App />
    </MemoryRouter>
  );
}

// ─── Existing tests ───────────────────────────────────────────────────────────

test("renders store heading", () => {
  renderApp();
  expect(screen.getAllByRole("link", { name: /mystore/i })[0]).toBeInTheDocument();
});

test("renders products from local data", () => {
  renderApp();
  expect(screen.getByText(/fjallraven/i)).toBeInTheDocument();
});

test("increases quantity when plus is clicked", async () => {
  const user = userEvent.setup();
  renderApp();

  await user.click(screen.getByRole("button", { name: /add product 1 to cart/i }));
  await user.click(screen.getByRole("button", { name: /increase quantity for product 1/i }));

  expect(screen.getByTestId("cart-quantity")).toHaveTextContent("2");
});

test("decreases quantity when minus is clicked", async () => {
  const user = userEvent.setup();
  renderApp();

  await user.click(screen.getByRole("button", { name: /add product 1 to cart/i }));
  await user.click(screen.getByRole("button", { name: /increase quantity for product 1/i }));
  await user.click(screen.getByRole("button", { name: /decrease quantity for product 1/i }));

  expect(screen.getByTestId("cart-quantity")).toHaveTextContent("1");
});

test("removes item from cart", async () => {
  const user = userEvent.setup();
  renderApp();

  await user.click(screen.getByRole("button", { name: /add product 1 to cart/i }));
  await user.click(screen.getByRole("button", { name: /remove/i }));

  expect(screen.queryByTestId("cart-quantity")).not.toBeInTheDocument();
});

test("opens cart and shows item with correct total", async () => {
  const user = userEvent.setup();
  renderApp();

  await user.click(screen.getByRole("button", { name: /add product 1 to cart/i }));
  await user.click(screen.getAllByRole("button", { name: /open cart/i })[0]);

  expect(await screen.findByText(/your cart/i)).toBeInTheDocument();
  expect(screen.getByTestId("cart-total")).toHaveTextContent("$109.95");
});

// ─── Search ───────────────────────────────────────────────────────────────────

test("search filters products by title", async () => {
  const user = userEvent.setup();
  renderApp();

  await user.type(screen.getByPlaceholderText(/search products/i), "jacket");

  expect(screen.getByText(/mens cotton jacket/i)).toBeInTheDocument();
  expect(screen.queryByText(/fjallraven/i)).not.toBeInTheDocument();
});

test("search with no match shows empty state", async () => {
  const user = userEvent.setup();
  renderApp();

  await user.type(screen.getByPlaceholderText(/search products/i), "zzznomatch");

  expect(screen.getByText(/no products available/i)).toBeInTheDocument();
});

test("search clears when category pill is clicked", async () => {
  const user = userEvent.setup();
  renderApp();

  await user.type(screen.getByPlaceholderText(/search products/i), "jacket");
  await user.click(screen.getByRole("button", { name: /all/i }));

  expect(screen.getByPlaceholderText(/search products/i)).toHaveValue("");
  expect(screen.getByText(/fjallraven/i)).toBeInTheDocument();
});

// ─── Category filter ──────────────────────────────────────────────────────────

test("category filter shows only matching products", async () => {
  const user = userEvent.setup();
  renderApp();

  await user.click(screen.getByRole("button", { name: /electronics/i }));

  expect(screen.getByText(/sandisk/i)).toBeInTheDocument();
  expect(screen.queryByText(/fjallraven/i)).not.toBeInTheDocument();
});

// ─── Sort ─────────────────────────────────────────────────────────────────────

test("sort by price low to high orders products correctly", async () => {
  const user = userEvent.setup();
  renderApp();

  await user.selectOptions(screen.getByRole("combobox"), "price-asc");

  const cards = screen.getAllByRole("button", { name: /add product/i });
  const firstProductId = cards[0].getAttribute("aria-label")?.match(/\d+/)?.[0];

  // product 19 has the lowest price ($7.95) — id 19
  expect(firstProductId).toBe("19");
});

test("sort by price high to low orders products correctly", async () => {
  const user = userEvent.setup();
  renderApp();

  await user.selectOptions(screen.getByRole("combobox"), "price-desc");

  const cards = screen.getAllByRole("button", { name: /add product/i });
  const firstProductId = cards[0].getAttribute("aria-label")?.match(/\d+/)?.[0];

  // product 14 has the highest price ($999.99) — id 14
  expect(firstProductId).toBe("14");
});

// ─── Language switching ───────────────────────────────────────────────────────

test("switching to French updates nav and product titles", async () => {
  const user = userEvent.setup();
  renderApp();

  await user.click(screen.getAllByRole("button", { name: /english \(ca\)/i })[0]);
  await user.click(screen.getAllByRole("button", { name: /français \(ca\)/i })[0]);

  expect(screen.getAllByText(/ma boutique/i)[0]).toBeInTheDocument();
  expect(screen.getByText(/veste en coton pour homme/i)).toBeInTheDocument();
});

test("switching to Spanish updates nav and product titles", async () => {
  const user = userEvent.setup();
  renderApp();

  await user.click(screen.getAllByRole("button", { name: /english \(ca\)/i })[0]);
  await user.click(screen.getAllByRole("button", { name: /español \(es\)/i })[0]);

  expect(screen.getAllByText(/mi tienda/i)[0]).toBeInTheDocument();
  expect(screen.getByText(/chaqueta de algodón para hombre/i)).toBeInTheDocument();
});

// ─── Plural rules ─────────────────────────────────────────────────────────────

test("cart title shows 0 items when empty", async () => {
  const user = userEvent.setup();
  renderApp();

  await user.click(screen.getAllByRole("button", { name: /open cart/i })[0]);

  expect(await screen.findByText(/0 items/i)).toBeInTheDocument();
});

test("cart title shows singular when 1 item", async () => {
  const user = userEvent.setup();
  renderApp();

  await user.click(screen.getByRole("button", { name: /add product 1 to cart/i }));
  await user.click(screen.getAllByRole("button", { name: /open cart/i })[0]);

  expect(await screen.findByText(/\(1 item\)/i)).toBeInTheDocument();
});

test("cart title shows plural when 2 items", async () => {
  const user = userEvent.setup();
  renderApp();

  await user.click(screen.getByRole("button", { name: /add product 1 to cart/i }));
  await user.click(screen.getByRole("button", { name: /increase quantity for product 1/i }));
  await user.click(screen.getAllByRole("button", { name: /open cart/i })[0]);

  expect(await screen.findByText(/\(2 items\)/i)).toBeInTheDocument();
});

test("French cart shows singular for 1 item", async () => {
  const user = userEvent.setup();
  renderApp();

  await user.click(screen.getAllByRole("button", { name: /english \(ca\)/i })[0]);
  await user.click(screen.getAllByRole("button", { name: /français \(ca\)/i })[0]);
  await user.click(screen.getByRole("button", { name: /ajouter le produit 1 au panier/i }));
  await user.click(screen.getAllByRole("button", { name: /ouvrir le panier/i })[0]);

  expect(await screen.findByText(/\(1 article\)/i)).toBeInTheDocument();
});

// ─── Cart persistence ─────────────────────────────────────────────────────────

test("cart restores from localStorage on reload", async () => {
  const user = userEvent.setup();
  const { unmount } = renderApp();

  await user.click(screen.getByRole("button", { name: /add product 1 to cart/i }));
  expect(screen.getByTestId("cart-quantity")).toHaveTextContent("1");

  unmount();
  renderApp();

  expect(screen.getByTestId("cart-quantity")).toHaveTextContent("1");
});
