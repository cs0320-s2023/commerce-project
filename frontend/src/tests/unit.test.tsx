import { render, screen } from "@testing-library/react";
import { ProductPriceStats } from "../components/ProductPriceStats";


describe("ProductPriceStats", () => {
  const sku = "example_sku";

  describe("when price stats list is defined", () => {
    beforeEach(() => {
      const mapProductPrice = new Map();
      const priceStats = [
        {
          platformName: "Example Platform",
          minPriceUsd: 40,
          avgPriceUsd: 20,
          lastPriceUsd: 30,
        },
      ];
      mapProductPrice.set(sku, priceStats);

      render(<ProductPriceStats sku={sku} mapProductPrice={mapProductPrice} />);
    });

    it("displays price values", () => {
      const minPrice = screen.getByText("40");
      const avgPrice = screen.getByText("20");
      const lastPrice = screen.getByText("30");
      expect(minPrice).toBeInTheDocument();
      expect(avgPrice).toBeInTheDocument();
      expect(lastPrice).toBeInTheDocument();
    });
  });

  describe("when filtering price stats by selected platforms", () => {
    beforeEach(() => {
      const mapProductPrice = new Map();
      const priceStats = [
        {
          platformName: "Platform 1",
          minPriceUsd: 10,
          avgPriceUsd: 20,
          lastPriceUsd: 30,
        },
        {
          platformName: "Platform 2",
          minPriceUsd: 15,
          avgPriceUsd: 25,
          lastPriceUsd: 35,
        },
      ];
      mapProductPrice.set(sku, priceStats);

      const pageState = {
        platforms: [
          { name: "Platform 1", selected: true },
          { name: "Platform 2", selected: false },
        ],
      };

      render(
        <ProductPriceStats
          sku={sku}
          mapProductPrice={mapProductPrice}
          pageState={pageState}
        />
      );
    });

    it("displays only selected platform", () => {
      const platformName2 = screen.queryByText("Platform 2");
      expect(platformName2).toBeNull();
    });
  });
});
