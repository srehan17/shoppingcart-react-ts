// import "@testing-library/jest-dom";

// Object.defineProperty(window, "matchMedia", {
//   writable: true,
//   value: (query: string) => ({
//     matches: false,
//     media: query,
//     onchange: null,
//     addListener: () => undefined,
//     removeListener: () => undefined,
//     addEventListener: () => undefined,
//     removeEventListener: () => undefined,
//     dispatchEvent: () => false,
//   }),
// });

import "@testing-library/jest-dom";
import { vi } from "vitest";

Object.defineProperty(window, "matchMedia", {
  writable: true,
  value: vi.fn().mockImplementation((query: string) => ({
    matches: false,
    media: query,
    onchange: null,
    addListener: vi.fn(),
    removeListener: vi.fn(),
    addEventListener: vi.fn(),
    removeEventListener: vi.fn(),
    dispatchEvent: vi.fn(),
  })),
});

vi.stubGlobal("fetch", vi.fn(() =>
  Promise.resolve({
    ok: true,
    json: async () => [
      {
        id: 1,
        title: "Test Product 1",
        description: "Test description",
        image: "test-image.jpg",
        price: 25,
      },
      {
        id: 2,
        title: "Test Product 2",
        description: "Another test description",
        image: "test-image-2.jpg",
        price: 40,
      },
    ],
  })
));