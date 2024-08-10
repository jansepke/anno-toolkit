# Anno 1800 items

View and filter all Items of Anno 1800. Access it here: [anno-toolkit.jansepke.de](https://anno-toolkit.jansepke.de/)

## Contributing

Pull requests are welcome. For major changes, please open an issue first to discuss what you would like to change.

```bash
npm install   # install dependencies
npm run dev   # run development server
npm run build # create production build
npm run start # run production build
```

## Update game data

1. download and start [RDA Explorer](https://github.com/lysannschlegel/RDAExplorer)
1. open lastest `.rda` file (e.g. `C:\Program Files (x86)\Ubisoft\Ubisoft Game Launcher\games\Anno 1800\maindata\data31.rda`)
1. extract `data/config/export/main/asset/assets.xml`, `data/config/gui/texts_english.xml` and `data/config/gui/texts_german.xml`
1. copy files to the `./import-data` folder
1. run `npm run xml-to-json`

## TODO

- add ship items
- sort list (e.g. select effect values)
- select and summarize items in expedition list
- add ship values to expedition list
- add resources to expedition list (product.json)
- filter for specific traits
- filter by ship type
- add ship stats
- add where to get item
- ship expedition slot optimizer
- support active items
- filter by world
- filter by DLC
- share item button
- add icons for effects (icon.json)
- automatically switch between centered and scrollable tabs
- refactor data loading
- Progressive Web App https://github.com/vercel/next.js/tree/master/examples/progressive-web-app
- mark CraftableItem as non researchable

## License

[MIT](https://choosealicense.com/licenses/mit/)
