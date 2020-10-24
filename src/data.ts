import parser from "fast-xml-parser";
import fs from "fs";

const items: { [key: string]: any[] } = {};

export async function getData() {
  const xml = await fs.promises.readFile("./data/assets.xml", "utf8");
  const json = parseXML(xml);

  processGroup(json.AssetList.Groups.Group);

  // console.log(items.GuildhouseItem.length); // 472
  // console.log(items.HarborOfficeItem.length); // 55
  // console.log(items.TownhallItem.length); // 237
  // console.log(items.VehicleItem.length); // 51
  // console.log(items.ShipSpecialist.length); // 48
  // console.log(items.CultureItem.length); // 162

  return {
    HarborOfficeItem: items.HarborOfficeItem,
    GuildhouseItem: items.GuildhouseItem,
    TownhallItem: items.TownhallItem,
  };

  // items.HarborOfficeItem.map((x) =>
  //   console.log(x.Values.Text.LocaText.English.Text)
  // );
}

function parseXML(xml: string) {
  try {
    return parser.parse(xml, {}, true);
  } catch (error) {
    throw new Error("Invalid XML");
  }
}

function processGroup(groups: any) {
  for (let i = 0; i < groups.length; i++) {
    const group = groups[i];

    if (group.Assets) {
      for (let j = 0; j < group.Assets.Asset.length; j++) {
        const asset = group.Assets.Asset[j];

        if (!asset.Template) {
          continue;
        }

        if (!items[asset.Template]) {
          items[asset.Template] = [];
        }

        for (var propName in asset.Values) {
          if (asset.Values[propName] === "") {
            delete asset.Values[propName];
          }
        }

        items[asset.Template].push(asset);
      }
    }

    if (group.Groups) {
      processGroup(group.Groups.Group);
    }
  }
}

function logJSON(data: any) {
  console.log(JSON.stringify(data, null, 2));
}
