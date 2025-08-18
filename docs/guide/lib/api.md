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
| `inputType` | `"string"` \| `"json"` \| `"url"` \| `"path"` |
| `pkg` | `undefined` \| [`SiziumResponse`](#siziumresponse) |

***

### SiziumFilter

A class to filter and sort package information based on various criteria.

#### Accessors

##### value

###### Get Signature

```ts
get value(): SiziumResponse
```

###### Returns

[`SiziumResponse`](#siziumresponse)

###### Set Signature

```ts
set value(value: SiziumResponse): void
```

The package information to be filtered and sorted.

###### Parameters

| Parameter | Type |
| ------ | ------ |
| `value` | [`SiziumResponse`](#siziumresponse) |

###### Returns

`void`

#### Constructors

##### new SiziumFilter()

```ts
new SiziumFilter(value?: SiziumResponse): SiziumFilter
```

###### Parameters

| Parameter | Type |
| ------ | ------ |
| `value`? | [`SiziumResponse`](#siziumresponse) |

###### Returns

[`SiziumFilter`](#siziumfilter)

#### Methods

##### filter()

```ts
filter(filter: string): SiziumFilteredResponse
```

Filters the packages by the given filter string.
If no filter string is given, the original package list is returned.

###### Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `filter` | `string` | The filter string. |

###### Returns

`SiziumFilteredResponse`

An object with the original package list and a filtered list of packages
                                         that have a name that matches the given filter string (case-insensitive).

###### Throws

An error if `this.value` is undefined.

##### find()

```ts
find(input: string | {
  name: string;
  version: string;
 }): undefined | PackageInfo
```

Finds a package in the package list by its name and/or version.
If only the name is given, the first package with that name is returned.
If the version is also given, the package with that name and version is returned.
If no package is found, undefined is returned.

###### Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `input` | `string` \| \{ `name`: `string`; `version`: `string`; \} | The input to search for. Can be a string with the name of the package or an object with the name and/or version. |

###### Returns

`undefined` \| [`PackageInfo`](#packageinfo)

The package that matches the input or undefined if no package is found.

###### Examples

```ts
find( 'chalk' ) // finds the latest version of the chalk package
```

```ts
find( 'chalk@^5' ) // finds the latest version of the chalk package that satisfies the version constraint
```

```ts
find( { name: 'chalk', version: '5.0.0' } ) // finds the chalk package with version 5.0.0
```

```ts
find( { name: 'chalk', version: '^4.0.0' } ) // finds the chalk package with a version that satisfies the version constraint
```

##### run()

```ts
run(opts?: {
  filter: string;
  sort: FilterType;
 }): SiziumResponse | SiziumFilteredResponse
```

Runs the filter and/or sort on the package list.

###### Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `opts`? | `object` | An object with options for the filter and/or sort. |
| `opts.filter`? | `string` | A string to filter the packages by name. |
| `opts.sort`? | [`FilterType`](#filtertype) | The type of sorting to apply to the package list. If not provided, the default sorting is by package size. |

###### Returns

[`SiziumResponse`](#siziumresponse) \| `SiziumFilteredResponse`

An object with the filtered and/or sorted package list.

##### sort()

```ts
sort(type?: FilterType): this
```

Sorts the packages based on the given filter type.

###### Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `type`? | [`FilterType`](#filtertype) | The filter type. |

###### Returns

`this`

Resolves to an array of `PackageInfo` sorted by the given filter type.

###### Throws

An error if `this.value` is undefined.

##### sortByDependenceCount()

```ts
sortByDependenceCount(): this
```

Sorts the packages by the number of direct dependencies in descending order.

###### Returns

`this`

The instance of `SiziumFilter` to allow method chaining.

###### Throws

An error if `this.value` is undefined.

##### sortByDependenceLevel()

```ts
sortByDependenceLevel(): this
```

Sorts the packages by the level of dependencies in ascending order.

###### Returns

`this`

The instance of `SiziumFilter` to allow method chaining.

###### Throws

An error if `this.value` is undefined.

##### sortByDependenceSize()

```ts
sortByDependenceSize(): this
```

Sorts the packages by the total number of dependencies (both dependencies and devDependencies) in descending order.

###### Returns

`this`

The instance of `SiziumFilter` to allow method chaining.

###### Throws

An error if `this.value` is undefined.

##### sortByName()

```ts
sortByName(type?: FilterAlphabetType): this
```

Sorts the packages alphabetically by name.

###### Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `type`? | `FilterAlphabetType` | The sorting order, either `'atoz'` (A-Z) or `'ztoa'` (Z-A). Default is `'atoz'`. |

###### Returns

`this`

The instance of `SiziumFilter` to allow method chaining.

###### Throws

An error if `this.value` is undefined.

##### sortBySize()

```ts
sortBySize(): this
```

Sorts the packages by their unpacked size in descending order.

###### Returns

`this`

The instance of `SiziumFilter` to allow method chaining.

###### Throws

An error if `this.value` is undefined.

#### Properties

| Property | Modifier | Type | Description |
| ------ | ------ | ------ | ------ |
| `type` | `public` | \{ `ATOZ`: `"atoz"`; `DEPENDENCES_COUNT`: `"dep-count"`; `DEPENDENCES_SIZE`: `"dep-size"`; `LEVEL`: `"level"`; `SIZE`: `"size"`; `ZTOA`: `"ztoa"`; \} | Type of filter |
| `type.ATOZ` | `readonly` | `"atoz"` | - |
| `type.DEPENDENCES_COUNT` | `readonly` | `"dep-count"` | - |
| `type.DEPENDENCES_SIZE` | `readonly` | `"dep-size"` | - |
| `type.LEVEL` | `readonly` | `"level"` | - |
| `type.SIZE` | `readonly` | `"size"` | - |
| `type.ZTOA` | `readonly` | `"ztoa"` | - |

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
new SiziumLocal(input: string, opts?: PackageSuperOptions): SiziumLocal
```

###### Parameters

| Parameter | Type |
| ------ | ------ |
| `input` | `string` |
| `opts`? | `PackageSuperOptions` |

###### Returns

[`SiziumLocal`](#siziumlocal)

###### Inherited from

`PackageSuper.constructor`

#### Methods

##### get()

```ts
get(): Promise<SiziumResponse>
```

Retrieves the package size information from a local environment.
It processes the package data from the input, resolving dependencies
and aggregating package data to return a comprehensive size response.

###### Returns

`Promise`\<[`SiziumResponse`](#siziumresponse)\>

A promise that resolves with the package response data,
                                   including size and dependency information.

#### Properties

| Property | Modifier | Type | Inherited from |
| ------ | ------ | ------ | ------ |
| `Error` | `public` | *typeof* `SiziumError` | `PackageSuper.Error` |
| `ERROR_ID` | `public` | \{ `GETTING_LOCAL_DATA`: `"GETTING_LOCAL_DATA"`; `GETTING_PKG_NAME`: `"GETTING_PKG_NAME"`; `GETTING_REGISTRY_DATA`: `"GETTING_REGISTRY_DATA"`; `INVALID_PKG_NAME`: `"INVALID_PKG_NAME"`; \} | `PackageSuper.ERROR_ID` |
| `ERROR_ID.GETTING_LOCAL_DATA` | `readonly` | `"GETTING_LOCAL_DATA"` | - |
| `ERROR_ID.GETTING_PKG_NAME` | `readonly` | `"GETTING_PKG_NAME"` | - |
| `ERROR_ID.GETTING_REGISTRY_DATA` | `readonly` | `"GETTING_REGISTRY_DATA"` | - |
| `ERROR_ID.INVALID_PKG_NAME` | `readonly` | `"INVALID_PKG_NAME"` | - |
| `input` | `public` | `string` | `PackageSuper.input` |
| `opts?` | `public` | `PackageSuperOptions` | `PackageSuper.opts` |

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
new SiziumRegistry(input: string, opts?: PackageSuperOptions): SiziumRegistry
```

###### Parameters

| Parameter | Type |
| ------ | ------ |
| `input` | `string` |
| `opts`? | `PackageSuperOptions` |

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

| Property | Modifier | Type | Inherited from |
| ------ | ------ | ------ | ------ |
| `Error` | `public` | *typeof* `SiziumError` | `PackageSuper.Error` |
| `ERROR_ID` | `public` | \{ `GETTING_LOCAL_DATA`: `"GETTING_LOCAL_DATA"`; `GETTING_PKG_NAME`: `"GETTING_PKG_NAME"`; `GETTING_REGISTRY_DATA`: `"GETTING_REGISTRY_DATA"`; `INVALID_PKG_NAME`: `"INVALID_PKG_NAME"`; \} | `PackageSuper.ERROR_ID` |
| `ERROR_ID.GETTING_LOCAL_DATA` | `readonly` | `"GETTING_LOCAL_DATA"` | - |
| `ERROR_ID.GETTING_PKG_NAME` | `readonly` | `"GETTING_PKG_NAME"` | - |
| `ERROR_ID.GETTING_REGISTRY_DATA` | `readonly` | `"GETTING_REGISTRY_DATA"` | - |
| `ERROR_ID.INVALID_PKG_NAME` | `readonly` | `"INVALID_PKG_NAME"` | - |
| `input` | `public` | `string` | `PackageSuper.input` |
| `opts?` | `public` | `PackageSuperOptions` | `PackageSuper.opts` |

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

### FilterType

```ts
type FilterType: typeof FILTER_TYPE[keyof typeof FILTER_TYPE];
```

***

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
  id: string;
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
| `description`? | `string` | The description of the package |
| `devDependencies`? | [`PackageJSON`](#packagejson)\[`"devDependencies"`\] | - |
| `id` | `string` | The id of the package: `name@version` |
| `installedBy`? | `string`[] | - |
| `isCommonJS` | `boolean` | If the package is written in CommonJS |
| `isESM` | `boolean` | If the package is written in ESM |
| `level` | `number` | Level of the dependence installation. Main packages is 0 |
| `license`? | `string` | The license of the package |
| `lifeCycleScripts`? | `{ [key in lifeCycleScripts]?: string }` | Life cycle scripts like: - \{post,pre\}install - \{post,pre\}publish - \{post,pre\}prepare |
| `name` | `string` | The name of the package |
| `types` | `boolean` | If the package has types |
| `unpackedSize` | `number` | Unpacked size in bytes |
| `unpackedSizeKB` | `number` | - |
| `unpackedSizeMB` | `number` | - |
| `url` | \{ `funding`: `string`; `homepage`: `string`; `npm`: `string`; `repository`: `string`; `unpkg`: `string`; \} | - |
| `url.funding`? | `string` | - |
| `url.homepage`? | `string` | - |
| `url.npm` | `string` | - |
| `url.repository`? | `string` | - |
| `url.unpkg`? | `string` | - |
| `version` | `string` | The version of the package |

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

### RegistryPackageJSON

```ts
type RegistryPackageJSON: PackageJSON & {
[key: string]: Any;   _id: string;
  dist: {
     unpackedSize: number;
    };
};
```

#### Type declaration

| Name | Type |
| ------ | ------ |
| `_id` | `string` |
| `dist`? | \{ `unpackedSize`: `number`; \} |
| `dist.unpackedSize` | `number` |

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

## Variables

### FILTER\_TYPE

```ts
const FILTER_TYPE: {
  ATOZ: "atoz";
  DEPENDENCES_COUNT: "dep-count";
  DEPENDENCES_SIZE: "dep-size";
  LEVEL: "level";
  SIZE: "size";
  ZTOA: "ztoa";
};
```

#### Type declaration

| Name | Type |
| ------ | ------ |
| `ATOZ` | `"atoz"` |
| `DEPENDENCES_COUNT` | `"dep-count"` |
| `DEPENDENCES_SIZE` | `"dep-size"` |
| `LEVEL` | `"level"` |
| `SIZE` | `"size"` |
| `ZTOA` | `"ztoa"` |
