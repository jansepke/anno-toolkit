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

1. extract `assets.xml`, `texts_english.xml` and `texts_german.xml` from the last `.rda` file
2. copy files to import-data folder
3. run `npm run xml-to-json`

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

## License

[MIT](https://choosealicense.com/licenses/mit/)
