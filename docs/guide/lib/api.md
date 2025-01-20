# `sizium` - API documentation

## Classes

### Sizium

Represents the main class for handling package size.

#### Examples

```ts
const size = new Sizium( 'chalk' )
const data = await size.get()

console.log(data) // all data
console.log(data.size) // total size on bytes
```

```ts
// Directory input
const size = new Sizium( './' )
const data = await size.get()
```

```ts
// package.json input
const size = new Sizium( './package.json' )
const data = await size.get()
```

```ts
// remote package.json input
const size = new Sizium( 'https://raw.githubusercontent.com/chalk/chalk/refs/heads/main/package.json' )
const data = await size.get()
```

```ts
// package.json string input
const pkg = {name: 'chalk', ... }
const size = new Sizium(JSON.stringify(pkg) )
const data = await size.get()
```

#### Constructors

##### new Sizium()

```ts
new Sizium(input: string): Sizium
```

###### Parameters

| Parameter | Type |
| ------ | ------ |
| `input` | `string` |

###### Returns

[`Sizium`](#sizium)

#### Methods

##### get()

```ts
get(): Promise<SiziumResponse>
```

Retrieves the package information based on the input.
It uses either the registry or local search mechanism depending on the input type.

###### Returns

`Promise`\<[`SiziumResponse`](#siziumresponse)\>

A promise that resolves with the package response data.

###### See

https://sizium.pigeonposse.com/guide/core/api#siziumresponse

#### Properties

| Property | Type |
| ------ | ------ |
| `filter` | [`SiziumFilter`](#siziumfilter) |
| `input` | `string` |
| `inputType` | `"string"` \| `"url"` \| `"json"` \| `"path"` |
| `pkg` | `undefined` \| [`SiziumResponse`](#siziumresponse) |

***

### SiziumFilter

A class to filter and sort package information based on various criteria.

#### Constructors

##### new SiziumFilter()

```ts
new SiziumFilter(pkg?: SiziumResponse): SiziumFilter
```

###### Parameters

| Parameter | Type |
| ------ | ------ |
| `pkg`? | [`SiziumResponse`](#siziumresponse) |

###### Returns

[`SiziumFilter`](#siziumfilter)

#### Methods

##### byDependenceCount()

```ts
byDependenceCount(): Promise<PackageInfo[]>
```

Sorts the packages by the number of direct dependencies in descending order.

###### Returns

`Promise`\<[`PackageInfo`](#packageinfo)[]\>

A promise that resolves to an array of `PackageInfo` sorted by the number of dependencies.

###### Throws

An error if `this.pkg` is undefined.

##### byDependenceLevel()

```ts
byDependenceLevel(): Promise<PackageInfo[]>
```

Sorts the packages by their dependency level in ascending order.
The dependency level indicates how "deep" the package is in the dependency tree.

###### Returns

`Promise`\<[`PackageInfo`](#packageinfo)[]\>

A promise that resolves to an array of `PackageInfo` sorted by dependency level.

###### Throws

An error if `this.pkg` is undefined.

##### byDependenceSize()

```ts
byDependenceSize(): Promise<PackageInfo[]>
```

Sorts the packages by the total number of dependencies (both dependencies and devDependencies) in descending order.

###### Returns

`Promise`\<[`PackageInfo`](#packageinfo)[]\>

A promise that resolves to an array of `PackageInfo` sorted by total dependency size.

###### Throws

An error if `this.pkg` is undefined.

##### byName()

```ts
byName(type?: "atoz" | "ztoa"): Promise<PackageInfo[]>
```

Sorts the packages alphabetically by name.

###### Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `type`? | `"atoz"` \| `"ztoa"` | The sorting order, either `'atoz'` (A-Z) or `'ztoa'` (Z-A). Default is `'atoz'`. |

###### Returns

`Promise`\<[`PackageInfo`](#packageinfo)[]\>

A promise that resolves to an array of `PackageInfo` sorted by name.

###### Throws

An error if `this.pkg` is undefined.

##### bySize()

```ts
bySize(): Promise<PackageInfo[]>
```

Sorts the packages by their unpacked size in descending order.

###### Returns

`Promise`\<[`PackageInfo`](#packageinfo)[]\>

A promise that resolves to an array of `PackageInfo` sorted by unpacked size.

###### Throws

An error if `this.pkg` is undefined.

#### Properties

| Property | Type |
| ------ | ------ |
| `pkg?` | [`SiziumResponse`](#siziumresponse) |

***

### SiziumLocal

Represents the class to get the `true` package size from **local** enviroment.

#### Examples

```ts
// Directory input
const size = new SiziumLocal( './' )
const data = await size.get()
```

```ts
// package.json input
const size = new SiziumLocal( './package.json' )
const data = await size.get()
```

```ts
// remote package.json input
const size = new SiziumLocal( 'https://raw.githubusercontent.com/chalk/chalk/refs/heads/main/package.json' )
const data = await size.get()
```

```ts
// package.json string input
const pkg = {name: 'chalk', ... }
const size = new SiziumLocal(JSON.stringify(pkg) )
const data = await size.get()
```

#### Extends

- `PackageSuper`

#### Constructors

##### new SiziumLocal()

```ts
new SiziumLocal(input: string, opts?: {
  skipError: boolean;
 }): SiziumLocal
```

###### Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `input` | `string` | - |
| `opts`? | `object` | - |
| `opts.skipError`? | `boolean` | Skip error on package dependence and return undefined |

###### Returns

[`SiziumLocal`](#siziumlocal)

###### Inherited from

`PackageSuper.constructor`

#### Methods

##### get()

```ts
get(): Promise<SiziumResponse>
```

###### Returns

`Promise`\<[`SiziumResponse`](#siziumresponse)\>

#### Properties

| Property | Modifier | Type | Description | Inherited from |
| ------ | ------ | ------ | ------ | ------ |
| `Error` | `public` | *typeof* `SiziumError` | - | `PackageSuper.Error` |
| `ERROR_ID` | `public` | \{ `GETTING_LOCAL_DATA`: `"GETTING_LOCAL_DATA"`; `GETTING_PKG_NAME`: `"GETTING_PKG_NAME"`; `GETTING_REGISTRY_DATA`: `"GETTING_REGISTRY_DATA"`; `INVALID_PKG_NAME`: `"INVALID_PKG_NAME"`; \} | - | `PackageSuper.ERROR_ID` |
| `ERROR_ID.GETTING_LOCAL_DATA` | `readonly` | `"GETTING_LOCAL_DATA"` | - | - |
| `ERROR_ID.GETTING_PKG_NAME` | `readonly` | `"GETTING_PKG_NAME"` | - | - |
| `ERROR_ID.GETTING_REGISTRY_DATA` | `readonly` | `"GETTING_REGISTRY_DATA"` | - | - |
| `ERROR_ID.INVALID_PKG_NAME` | `readonly` | `"INVALID_PKG_NAME"` | - | - |
| `input` | `public` | `string` | - | `PackageSuper.input` |
| `opts?` | `public` | \{ `skipError`: `boolean`; \} | - | `PackageSuper.opts` |
| `opts.skipError` | `public` | `boolean` | Skip error on package dependence and return undefined | - |

***

### SiziumRegistry

Represents the class to get the `true` package size from the npm registry URL.

#### Example

```ts
const size = new SiziumRegistry( 'chalk' )
const data = await size.get()

console.log(data) // all data
console.log(data.size) // total size on bytes
```

#### Extends

- `PackageSuper`

#### Constructors

##### new SiziumRegistry()

```ts
new SiziumRegistry(input: string, opts?: {
  skipError: boolean;
 }): SiziumRegistry
```

###### Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `input` | `string` | - |
| `opts`? | `object` | - |
| `opts.skipError`? | `boolean` | Skip error on package dependence and return undefined |

###### Returns

[`SiziumRegistry`](#siziumregistry)

###### Inherited from

`PackageSuper.constructor`

#### Methods

##### get()

```ts
get(): Promise<SiziumResponse>
```

###### Returns

`Promise`\<[`SiziumResponse`](#siziumresponse)\>

#### Properties

| Property | Modifier | Type | Description | Inherited from |
| ------ | ------ | ------ | ------ | ------ |
| `Error` | `public` | *typeof* `SiziumError` | - | `PackageSuper.Error` |
| `ERROR_ID` | `public` | \{ `GETTING_LOCAL_DATA`: `"GETTING_LOCAL_DATA"`; `GETTING_PKG_NAME`: `"GETTING_PKG_NAME"`; `GETTING_REGISTRY_DATA`: `"GETTING_REGISTRY_DATA"`; `INVALID_PKG_NAME`: `"INVALID_PKG_NAME"`; \} | - | `PackageSuper.ERROR_ID` |
| `ERROR_ID.GETTING_LOCAL_DATA` | `readonly` | `"GETTING_LOCAL_DATA"` | - | - |
| `ERROR_ID.GETTING_PKG_NAME` | `readonly` | `"GETTING_PKG_NAME"` | - | - |
| `ERROR_ID.GETTING_REGISTRY_DATA` | `readonly` | `"GETTING_REGISTRY_DATA"` | - | - |
| `ERROR_ID.INVALID_PKG_NAME` | `readonly` | `"INVALID_PKG_NAME"` | - | - |
| `input` | `public` | `string` | - | `PackageSuper.input` |
| `opts?` | `public` | \{ `skipError`: `boolean`; \} | - | `PackageSuper.opts` |
| `opts.skipError` | `public` | `boolean` | Skip error on package dependence and return undefined | - |

## Functions

### getPackageSize()

```ts
function getPackageSize(input: string): Promise<SiziumResponse>
```

Retrieves the size information of a given package.

#### Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `input` | `string` | The input string representing a package name, path, or URL. |

#### Returns

`Promise`\<[`SiziumResponse`](#siziumresponse)\>

A promise that resolves with the package response data.

#### Example

```ts
const data = await getPackageSize( 'chalk' )

console.log(data) // all data
console.log(data.size) // total size on bytes
```

## Type Aliases

### PackageInfo

```ts
type PackageInfo: {
  author: {
     name: string;
     url: string;
    };
  dependencies: PackageJSON["dependencies"];
  description: string;
  devDependencies: PackageJSON["devDependencies"];
  installedBy: string[];
  isCommonJS: boolean;
  isESM: boolean;
  level: number;
  license: string;
  lifeCycleScripts: { [key in lifeCycleScripts]?: string };
  name: string;
  types: boolean;
  unpackedSize: number;
  unpackedSizeKB: number;
  unpackedSizeMB: number;
  url: {
     funding: string;
     homepage: string;
     npm: string;
     repository: string;
     unpkg: string;
    };
  version: string;
};
```

#### Type declaration

| Name | Type | Description |
| ------ | ------ | ------ |
| `author`? | \{ `name`: `string`; `url`: `string`; \} | - |
| `author.name` | `string` | - |
| `author.url` | `string` | - |
| `dependencies`? | [`PackageJSON`](#packagejson)\[`"dependencies"`\] | - |
| `description`? | `string` | - |
| `devDependencies`? | [`PackageJSON`](#packagejson)\[`"devDependencies"`\] | - |
| `installedBy`? | `string`[] | - |
| `isCommonJS` | `boolean` | - |
| `isESM` | `boolean` | - |
| `level` | `number` | Level of the dependence installation. Main packages is 0 |
| `license`? | `string` | - |
| `lifeCycleScripts`? | `{ [key in lifeCycleScripts]?: string }` | - |
| `name` | `string` | - |
| `types` | `boolean` | - |
| `unpackedSize` | `number` | Unpacked size in bytes |
| `unpackedSizeKB` | `number` | - |
| `unpackedSizeMB` | `number` | - |
| `url` | \{ `funding`: `string`; `homepage`: `string`; `npm`: `string`; `repository`: `string`; `unpkg`: `string`; \} | - |
| `url.funding`? | `string` | - |
| `url.homepage`? | `string` | - |
| `url.npm` | `string` | - |
| `url.repository`? | `string` | - |
| `url.unpkg`? | `string` | - |
| `version` | `string` | - |

***

### PackageJSON

```ts
type PackageJSON: JSONSchemaForNPMPackageJsonFiles & {
  name: string;
  version: string;
};
```

#### Type declaration

| Name | Type |
| ------ | ------ |
| `name` | `string` |
| `version` | `string` |

***

### SiziumResponse

```ts
type SiziumResponse: {
  id: string;
  packageNum: number;
  packages: PackageInfo[];
  size: number;
  sizeKB: number;
  sizeMB: number;
};
```

#### Type declaration

| Name | Type | Description |
| ------ | ------ | ------ |
| `id` | `string` | - |
| `packageNum` | `number` | Number of total packages installed |
| `packages` | [`PackageInfo`](#packageinfo)[] | All data from packages |
| `size` | `number` | Size in bytes |
| `sizeKB` | `number` | Size in kylobytes |
| `sizeMB` | `number` | Size in megabytes |
