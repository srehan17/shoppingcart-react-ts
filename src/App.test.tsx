import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { MemoryRouter } from "react-router-dom";
import App from "./App";

function renderApp() {
  return render(
    <MemoryRouter initialEntries={["/"]}>
      <App />
    </MemoryRouter>
  );
}

test("renders store heading", () => {
  renderApp();
  expect(screen.getByRole("heading", { name: /my store/i })).toBeInTheDocument();
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
  await user.click(screen.getByRole("button", { name: /open shopping cart/i }));

  expect(await screen.findByText(/your cart/i)).toBeInTheDocument();
  expect(screen.getByTestId("cart-total")).toHaveTextContent("$109.95");
});
