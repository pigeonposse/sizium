# `@sizium/cli` - API documentation

## Functions

### run()

```ts
function run(): Promise<void>
```

Executes the CLI command based on the provided flags and options.

This function processes the command-line arguments and executes the appropriate
action based on the specified flags. It supports options for displaying help,
version information, input processing, and execution time measurement.

The function uses the `Sizium` class to retrieve package size information
based on the input provided. It outputs the result in different formats
depending on the specified resolution type.

#### Returns

`Promise`\<`void`\>

***

### updater()

```ts
function updater(__namedParameters: {
  name: string;
  version: string;
}): Promise<void>
```

#### Parameters

| Parameter | Type |
| ------ | ------ |
| `__namedParameters` | `object` |
| `__namedParameters.name` | `string` |
| `__namedParameters.version` | `string` |

#### Returns

`Promise`\<`void`\>
