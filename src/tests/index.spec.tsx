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
    ["harboroffice", 190615],
    ["guildhouse", 190623],
    ["townhall", 101240],
    ["arctic-lodge", 116041],
  ])("goes to %s items page", async (itemType, itemId) => {
    const button = screen
      .queryByText(`common:itemTypes.${itemType}`)
      ?.closest("button");

    expect(button).toBeInTheDocument();

    fireEvent.click(button!);

    await waitFor(() =>
      expect(screen.getByText("common:title.items")).toBeInTheDocument()
    );

    expect(screen.getByText(`(ID: ${itemId})`)).toBeInTheDocument();
  });

  test.each([
    ["might", 191436],
    ["faith", 190719],
    ["diplomacy", 111024],
    ["hunting", 190622],
    ["medicine", 190410],
    ["melee", 191010],
    ["navigation", 121023],
    ["crafting", 190829],
  ])("goes to %s expedition page", async (itemType, itemId) => {
    const button = screen
      .queryByText(`common:expeditionThreats.${itemType}`)
      ?.closest("button");

    expect(button).toBeInTheDocument();

    fireEvent.click(button!);

    await waitFor(() =>
      expect(screen.getByText("common:title.expedition")).toBeInTheDocument()
    );

    expect(screen.getByText(`(ID: ${itemId})`)).toBeInTheDocument();
  });
});
