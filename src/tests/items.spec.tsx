import { render, screen, within } from "@testing-library/react";
import { getPage } from "next-page-tester";

describe("index", () => {
  let page: React.ReactElement;

  beforeAll(async () => {
    ({ page } = await getPage({
      route: "/items/harboroffice",
    }));
  });

  beforeEach(() => {
    render(page);
  });

  it("has title", async () => {
    expect(screen.queryByText("common:title.items")).toBeInTheDocument();
  });

  it("has tab buttons", async () => {
    const tabs = screen.queryAllByRole("tab");

    expect(tabs).toHaveLength(4);
  });

  it("renders item", async () => {
    const id = screen.queryByText("(ID: 190615)");

    expect(id).toBeInTheDocument();
    const card = within(id?.closest(".MuiCard-root") as HTMLElement);

    expect(card.queryByText("Fischerin")).toBeInTheDocument();
    expect(card.queryByText("Gewöhnlich")).toBeInTheDocument();
    expect(card.queryByText("Fischereien")).toBeInTheDocument();
    expect(
      card.queryByText("common:upgrades.ProductivityUpgrade: 10%")
    ).toBeInTheDocument();
  });
});
