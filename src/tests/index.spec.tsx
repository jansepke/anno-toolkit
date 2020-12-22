import "@testing-library/jest-dom";
import { render } from "@testing-library/react";
import { getPage } from "next-page-tester";

jest.setTimeout(10000);

describe("index", () => {
  let page: React.ReactElement;

  beforeAll(async () => {
    ({ page } = await getPage({
      route: "/",
    }));
  });

  it("has title", async () => {
    const { queryByText } = render(page);

    expect(queryByText("common:title.index")).not.toBeNull();
  });

  it("has item buttons", async () => {
    const { queryByText } = render(page);

    const section = queryByText("common:heading.items");
    expect(section).not.toBeNull();

    expect(section?.closest("div")?.querySelectorAll("button")).toHaveLength(5);
  });

  it("has ship item button disabled", async () => {
    const { queryByText } = render(page);

    expect(
      queryByText("common:itemTypes.ship")?.closest("button")
    ).toBeDisabled();
  });

  it("has expedition buttons", async () => {
    const { queryByText } = render(page);

    const section = queryByText("common:heading.expedition");
    expect(section).not.toBeNull();

    expect(section?.closest("div")?.querySelectorAll("button")).toHaveLength(8);
  });
});
