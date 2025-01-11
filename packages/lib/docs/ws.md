## What is `sizium`?

`sizium` is a **opensource** tool to get the actual size of any local or remote package.

**Library** usage:

```js
import {Sizium} from 'sizium'
const size = new Sizium('chalk@5.4.1')
const data = await size.get()
```

**CLI** usage:

```bash
sizium -i chalk
```
