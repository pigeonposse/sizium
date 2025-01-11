# What is `sizium`?

`sizium` is a **opensource** tool to get the actual size of any local or remote package.

![help](/cli-help.png)

## Usage

You can use the full **Sizium** by installing the `sizium` library or you can use only the parts you need to get better performance.

## Library

- [Read more](/guide/lib/)

## Core Library

Use in your `JavaScript` or `TypeScript` project.

::: code-group

```bash [npm]
npm install @sizium/core
```

```bash [pnpm]
pnpm install @sizium/core
```

```bash [yarn]
yarn add @sizium/core
```

```bash [bun]
bun add @sizium/core
```

```bash [deno]
deno add @sizium/core
```

:::

```js twoslash
import {Sizium} from '@sizium/core'

const size = new Sizium('chalk@5.4.1')
const data = await size.get()

console.log(data)
```

- [View more](./lib)

## CLI

Use the Command line Interface in your system.

::: code-group

```bash [npm]
npm install @sizium/cli
```

```bash [pnpm]
pnpm install @sizium/cli
```

```bash [yarn]
yarn add @sizium/cli
```

```bash [bun]
bun add @sizium/cli
```

```bash [deno]
deno add @sizium/cli
```

:::

```bash
sizium -i chalk
```

- [View more](./cli)

## REST API

You can implement the API wherever you want and even extend it if you wish.

The API is built with [backan](https://backan.pigeonposse.com/), which is a wrapper for [hono](https://hono.dev/), meaning that **hono** instructions can be used to implement the API wherever you want.

::: code-group

```bash [npm]
npm install @sizium/api
```

```bash [pnpm]
pnpm install @sizium/api
```

```bash [yarn]
yarn add @sizium/api
```

```bash [bun]
bun add @sizium/api
```

```bash [deno]
deno add @sizium/api
```

:::

- [View more](./api)

### Node server

We have a package that already has the API on a Node.js server.
Below is an example of its use.

::: code-group

```bash [npm]
npm install @sizium/node-server
```

```bash [pnpm]
pnpm install @sizium/node-server
```

```bash [yarn]
yarn add @sizium/node-server
```

```bash [bun]
bun add @sizium/node-server
```

```bash [deno]
deno add @sizium/node-server
```

:::

```bash
sizium-server --port 1312
```

```bash
curl http://localhost:1312/size?input=bepp
```

- [View more](./node-server)

## Executables

You can use `sizium` as a standalone executable for your **OS**.

This is perfect if you want to use it outside of a Javascript environment.

> Available for `x64` and `arm64` architectures

- [Download](https://github.com/pigeonposse/sizium/releases)
