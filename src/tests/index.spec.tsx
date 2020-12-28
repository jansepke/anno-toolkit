import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import { getPage } from "next-page-tester";

describe("index", () => {
  let page: React.ReactElement;

  beforeAll(async () => {
    ({ page } = await getPage({
      route: "/",
    }));
  });

  beforeEach(() => {
    render(page);
  });

  it("has title", async () => {
    expect(screen.queryByText("common:title.index")).toBeInTheDocument();
  });

  it("has item buttons", async () => {
    const section = screen.queryByText("common:heading.items");

    expect(section).toBeInTheDocument();
    expect(section?.closest("div")?.querySelectorAll("button")).toHaveLength(5);
  });

  it("has ship item button disabled", async () => {
    const ship = screen.queryByText("common:itemTypes.ship");

    expect(ship?.closest("button")).toBeDisabled();
  });

  it("has expedition buttons", async () => {
    const section = screen.queryByText("common:heading.expedition");

    expect(section).toBeInTheDocument();
    expect(section?.closest("div")?.querySelectorAll("button")).toHaveLength(8);
  });

  test.each([
    ["harboroffice", "Angler"],
    ["guildhouse", "Juwelier"],
    ["townhall", "Richter"],
    ["arctic-lodge", "Treibholz-​ Walwächter"],
  ])("goes to %s items page", async (itemType, item) => {
    const button = screen
      .queryByText(`common:itemTypes.${itemType}`)
      ?.closest("button");

    expect(button).toBeInTheDocument();

    fireEvent.click(button!);

    await waitFor(() =>
      expect(screen.getByText("common:title.items")).toBeInTheDocument()
    );

    expect(screen.getByText(item)).toBeInTheDocument();
  });
});
