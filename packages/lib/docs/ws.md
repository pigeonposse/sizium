## What is `sizium`?

`sizium` is a **opensource** tool to get the actual size of any local or remote package.

**Library** usage:

```js
import {Sizium} from 'sizium'

// Get size from remote
const pkg = new Sizium('chalk@5.4.1')
const data = await pkg.get()

console.log(data.size) // size in bytes
```

```js
import {Sizium} from 'sizium'

// Get size from local
const pkg = new Sizium('./package.json')
const data = await pkg.get()

console.log(data.size) // size in bytes
```

**CLI** usage:

```bash
sizium -i chalk
```
