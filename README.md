
# tabify

convert a list to tabs

## Install

`component-install stagas/tabify`

## Usage

```js
var tabify = require('tabify')

var tabs = tabify(document.getElementById('tabs'))
tabs.on('change', function (targetId, target) {
  console.log(targetId, target)
})
```

## License

MIT
