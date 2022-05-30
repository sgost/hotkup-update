# hotkup-ui

## Project setup
```
npm install
```

### Compiles and hot-reloads for development
```
npm run serve
```

### Compiles and minifies for production
```
npm run build

npm run build && cp ./dist/* ./htmls/resources/js/plugins/hotkup-ui && echo "Hotkup-UI :: Copied compiled vue files to the html folder" && osascript -e 'display notification "HOTKUP-UI :: Copied compiled vue files to the html resources folder"'
```

### Lints and fixes files
```
npm run lint
```

### Customize configuration
See [Configuration Reference](https://cli.vuejs.org/config/).
