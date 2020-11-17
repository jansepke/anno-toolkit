# Anno 1800 items

View and filter all Items of Anno 1800. Access it here: [anno-toolkit.one](https://anno-toolkit.one/)

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

- more item types
- improve font loading performance
- Upload save game
- Favorite items
- support active items
- filter by world
- filter by DLC
- PWA
- sort list (e.g. select effect values)
- share item button
- interpolate anno translations with variables
- favicon
- do not show negative effects when filtering by effect type
- expedition attribute view

## License

[MIT](https://choosealicense.com/licenses/mit/)
