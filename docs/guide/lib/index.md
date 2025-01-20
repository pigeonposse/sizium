# Sizium Documentation

`sizium` is a **opensource** tool to get the actual size of any local or remote package.

## Features

- Gets the full details of the **npm** package. [view more](/guide/core/api#siziumresponse)
- Supports _URL_, _paths_ and _strings_ as inputs
- Supports **semantic versioning** of packages. Example: @bepp/bepp@1.3.17
- Can be used in different ways: JS/TS library, REST API, CLI, executable...

## 🔑 Installation

::: code-group

```bash [npm]
npm install sizium
```

```bash [pnpm]
pnpm install sizium
```

```bash [yarn]
yarn add sizium
```

```bash [bun]
bun add sizium
```

```bash [deno]
deno add sizium
```

:::

## Usage

Examples of use:

### Library

```js twoslash
/**
 * Get size from remote package
 */
import {Sizium} from 'sizium'

const pkg = new Sizium('chalk@5.4.1')
const data = await pkg.get()

console.log(data.size)
```

```js twoslash
/**
 * Get size from local package
 */
import {Sizium} from 'sizium'

const pkg = new Sizium('./package.json')
const data = await pkg.get()

console.log(data.size)
```

### CLI

```bash
sizium -i chalk
```

## ➕ More

- 📖 [API Docs](api.md)
- 📦 [NPM](https://www.npmjs.com/package/sizium)
