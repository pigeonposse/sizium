# `@sizium/api-client` - API documentation

## Functions

### createClient()

```ts
function createClient(opts?: ClientOptions): Client<paths, `${string}/${string}`>
```

#### Parameters

| Parameter | Type |
| ------ | ------ |
| `opts`? | `ClientOptions` |

#### Returns

`Client`\<[`paths`](#paths), \`$\{string\}/$\{string\}\`\>

## Type Aliases

### ClientOpts

```ts
type ClientOpts: NonNullable<Parameters<typeof createClientCore>[0]>;
```

***

### ClientRes

```ts
type ClientRes: ReturnType<typeof createClientCore>;
```

## Interfaces

### paths

#### Properties

##### /health

```ts
/health: {
  delete: undefined;
  get: {
     parameters: {
        cookie: undefined;
        header: undefined;
        path: undefined;
        query: undefined;
       };
     requestBody: undefined;
     responses: {
        200: {
           content: {
              application/json: {
                 ok: true;
                };
             };
           headers: {};
          };
        400: {
           content: {
              application/json: {
                 error: Record<string, never>;
                 help: string;
                 id: string;
                 message: string;
                 status: 400;
                };
             };
           headers: {};
          };
        500: {
           content: {
              application/json: {
                 error: Record<string, never>;
                 help: string;
                 id: string;
                 message: string;
                 status: 500;
                };
             };
           headers: {};
          };
       };
    };
  head: undefined;
  options: undefined;
  parameters: {
     cookie: undefined;
     header: undefined;
     path: undefined;
     query: undefined;
    };
  patch: undefined;
  post: undefined;
  put: undefined;
  trace: undefined;
};
```

###### delete?

```ts
optional delete: undefined;
```

###### get

```ts
get: {
  parameters: {
     cookie: undefined;
     header: undefined;
     path: undefined;
     query: undefined;
    };
  requestBody: undefined;
  responses: {
     200: {
        content: {
           application/json: {
              ok: true;
             };
          };
        headers: {};
       };
     400: {
        content: {
           application/json: {
              error: Record<string, never>;
              help: string;
              id: string;
              message: string;
              status: 400;
             };
          };
        headers: {};
       };
     500: {
        content: {
           application/json: {
              error: Record<string, never>;
              help: string;
              id: string;
              message: string;
              status: 500;
             };
          };
        headers: {};
       };
    };
};
```

Check API health status

###### Description

Check if your API goes into trouble.

###### get.parameters

```ts
parameters: {
  cookie: undefined;
  header: undefined;
  path: undefined;
  query: undefined;
};
```

###### get.parameters.cookie?

```ts
optional cookie: undefined;
```

###### get.parameters.header?

```ts
optional header: undefined;
```

###### get.parameters.path?

```ts
optional path: undefined;
```

###### get.parameters.query?

```ts
optional query: undefined;
```

###### get.requestBody?

```ts
optional requestBody: undefined;
```

###### get.responses

```ts
responses: {
  200: {
     content: {
        application/json: {
           ok: true;
          };
       };
     headers: {};
    };
  400: {
     content: {
        application/json: {
           error: Record<string, never>;
           help: string;
           id: string;
           message: string;
           status: 400;
          };
       };
     headers: {};
    };
  500: {
     content: {
        application/json: {
           error: Record<string, never>;
           help: string;
           id: string;
           message: string;
           status: 500;
          };
       };
     headers: {};
    };
};
```

###### get.responses.200

```ts
200: {
  content: {
     application/json: {
        ok: true;
       };
    };
  headers: {};
};
```

###### Description

Successfully fetched data

###### get.responses.200.content

```ts
content: {
  application/json: {
     ok: true;
    };
};
```

###### get.responses.200.content.application/json

```ts
application/json: {
  ok: true;
};
```

###### get.responses.200.content.application/json.ok

```ts
ok: true;
```

###### get.responses.200.headers

```ts
headers: {};
```

###### Index Signature

 \[`name`: `string`\]: `unknown`

###### get.responses.400

```ts
400: {
  content: {
     application/json: {
        error: Record<string, never>;
        help: string;
        id: string;
        message: string;
        status: 400;
       };
    };
  headers: {};
};
```

###### Description

Bad request

###### get.responses.400.content

```ts
content: {
  application/json: {
     error: Record<string, never>;
     help: string;
     id: string;
     message: string;
     status: 400;
    };
};
```

###### get.responses.400.content.application/json

```ts
application/json: {
  error: Record<string, never>;
  help: string;
  id: string;
  message: string;
  status: 400;
};
```

###### get.responses.400.content.application/json.error

```ts
error: Record<string, never>;
```

###### get.responses.400.content.application/json.help

```ts
help: string;
```

###### get.responses.400.content.application/json.id

```ts
id: string;
```

###### get.responses.400.content.application/json.message

```ts
message: string;
```

###### get.responses.400.content.application/json.status

```ts
status: 400;
```

###### get.responses.400.headers

```ts
headers: {};
```

###### Index Signature

 \[`name`: `string`\]: `unknown`

###### get.responses.500

```ts
500: {
  content: {
     application/json: {
        error: Record<string, never>;
        help: string;
        id: string;
        message: string;
        status: 500;
       };
    };
  headers: {};
};
```

###### Description

Internal Server error

###### get.responses.500.content

```ts
content: {
  application/json: {
     error: Record<string, never>;
     help: string;
     id: string;
     message: string;
     status: 500;
    };
};
```

###### get.responses.500.content.application/json

```ts
application/json: {
  error: Record<string, never>;
  help: string;
  id: string;
  message: string;
  status: 500;
};
```

###### get.responses.500.content.application/json.error

```ts
error: Record<string, never>;
```

###### get.responses.500.content.application/json.help

```ts
help: string;
```

###### get.responses.500.content.application/json.id

```ts
id: string;
```

###### get.responses.500.content.application/json.message

```ts
message: string;
```

###### get.responses.500.content.application/json.status

```ts
status: 500;
```

###### get.responses.500.headers

```ts
headers: {};
```

###### Index Signature

 \[`name`: `string`\]: `unknown`

###### head?

```ts
optional head: undefined;
```

###### options?

```ts
optional options: undefined;
```

###### parameters

```ts
parameters: {
  cookie: undefined;
  header: undefined;
  path: undefined;
  query: undefined;
};
```

###### parameters.cookie?

```ts
optional cookie: undefined;
```

###### parameters.header?

```ts
optional header: undefined;
```

###### parameters.path?

```ts
optional path: undefined;
```

###### parameters.query?

```ts
optional query: undefined;
```

###### patch?

```ts
optional patch: undefined;
```

###### post?

```ts
optional post: undefined;
```

###### put?

```ts
optional put: undefined;
```

###### trace?

```ts
optional trace: undefined;
```

##### /size

```ts
/size: {
  delete: undefined;
  get: {
     parameters: {
        cookie: undefined;
        header: undefined;
        path: undefined;
        query: {
           input: string;
          };
       };
     requestBody: undefined;
     responses: {
        200: {
           content: {
              application/json: Record<string, never>;
             };
           headers: {};
          };
        400: {
           content: {
              application/json: {
                 error: Record<string, never>;
                 help: string;
                 id: string;
                 message: string;
                 status: 400;
                };
             };
           headers: {};
          };
        500: {
           content: {
              application/json: {
                 error: Record<string, never>;
                 help: string;
                 id: string;
                 message: string;
                 status: 500;
                };
             };
           headers: {};
          };
       };
    };
  head: undefined;
  options: undefined;
  parameters: {
     cookie: undefined;
     header: undefined;
     path: undefined;
     query: undefined;
    };
  patch: undefined;
  post: undefined;
  put: undefined;
  trace: undefined;
};
```

###### delete?

```ts
optional delete: undefined;
```

###### get

```ts
get: {
  parameters: {
     cookie: undefined;
     header: undefined;
     path: undefined;
     query: {
        input: string;
       };
    };
  requestBody: undefined;
  responses: {
     200: {
        content: {
           application/json: Record<string, never>;
          };
        headers: {};
       };
     400: {
        content: {
           application/json: {
              error: Record<string, never>;
              help: string;
              id: string;
              message: string;
              status: 400;
             };
          };
        headers: {};
       };
     500: {
        content: {
           application/json: {
              error: Record<string, never>;
              help: string;
              id: string;
              message: string;
              status: 500;
             };
          };
        headers: {};
       };
    };
};
```

Get Package size data

###### get.parameters

```ts
parameters: {
  cookie: undefined;
  header: undefined;
  path: undefined;
  query: {
     input: string;
    };
};
```

###### get.parameters.cookie?

```ts
optional cookie: undefined;
```

###### get.parameters.header?

```ts
optional header: undefined;
```

###### get.parameters.path?

```ts
optional path: undefined;
```

###### get.parameters.query

```ts
query: {
  input: string;
};
```

###### get.parameters.query.input

```ts
input: string;
```

###### Description

Set the input

###### get.requestBody?

```ts
optional requestBody: undefined;
```

###### get.responses

```ts
responses: {
  200: {
     content: {
        application/json: Record<string, never>;
       };
     headers: {};
    };
  400: {
     content: {
        application/json: {
           error: Record<string, never>;
           help: string;
           id: string;
           message: string;
           status: 400;
          };
       };
     headers: {};
    };
  500: {
     content: {
        application/json: {
           error: Record<string, never>;
           help: string;
           id: string;
           message: string;
           status: 500;
          };
       };
     headers: {};
    };
};
```

###### get.responses.200

```ts
200: {
  content: {
     application/json: Record<string, never>;
    };
  headers: {};
};
```

###### Description

Successfully fetched data

###### get.responses.200.content

```ts
content: {
  application/json: Record<string, never>;
};
```

###### get.responses.200.content.application/json

```ts
application/json: Record<string, never>;
```

###### get.responses.200.headers

```ts
headers: {};
```

###### Index Signature

 \[`name`: `string`\]: `unknown`

###### get.responses.400

```ts
400: {
  content: {
     application/json: {
        error: Record<string, never>;
        help: string;
        id: string;
        message: string;
        status: 400;
       };
    };
  headers: {};
};
```

###### Description

Bad request

###### get.responses.400.content

```ts
content: {
  application/json: {
     error: Record<string, never>;
     help: string;
     id: string;
     message: string;
     status: 400;
    };
};
```

###### get.responses.400.content.application/json

```ts
application/json: {
  error: Record<string, never>;
  help: string;
  id: string;
  message: string;
  status: 400;
};
```

###### get.responses.400.content.application/json.error

```ts
error: Record<string, never>;
```

###### get.responses.400.content.application/json.help

```ts
help: string;
```

###### get.responses.400.content.application/json.id

```ts
id: string;
```

###### get.responses.400.content.application/json.message

```ts
message: string;
```

###### get.responses.400.content.application/json.status

```ts
status: 400;
```

###### get.responses.400.headers

```ts
headers: {};
```

###### Index Signature

 \[`name`: `string`\]: `unknown`

###### get.responses.500

```ts
500: {
  content: {
     application/json: {
        error: Record<string, never>;
        help: string;
        id: string;
        message: string;
        status: 500;
       };
    };
  headers: {};
};
```

###### Description

Internal Server error

###### get.responses.500.content

```ts
content: {
  application/json: {
     error: Record<string, never>;
     help: string;
     id: string;
     message: string;
     status: 500;
    };
};
```

###### get.responses.500.content.application/json

```ts
application/json: {
  error: Record<string, never>;
  help: string;
  id: string;
  message: string;
  status: 500;
};
```

###### get.responses.500.content.application/json.error

```ts
error: Record<string, never>;
```

###### get.responses.500.content.application/json.help

```ts
help: string;
```

###### get.responses.500.content.application/json.id

```ts
id: string;
```

###### get.responses.500.content.application/json.message

```ts
message: string;
```

###### get.responses.500.content.application/json.status

```ts
status: 500;
```

###### get.responses.500.headers

```ts
headers: {};
```

###### Index Signature

 \[`name`: `string`\]: `unknown`

###### head?

```ts
optional head: undefined;
```

###### options?

```ts
optional options: undefined;
```

###### parameters

```ts
parameters: {
  cookie: undefined;
  header: undefined;
  path: undefined;
  query: undefined;
};
```

###### parameters.cookie?

```ts
optional cookie: undefined;
```

###### parameters.header?

```ts
optional header: undefined;
```

###### parameters.path?

```ts
optional path: undefined;
```

###### parameters.query?

```ts
optional query: undefined;
```

###### patch?

```ts
optional patch: undefined;
```

###### post?

```ts
optional post: undefined;
```

###### put?

```ts
optional put: undefined;
```

###### trace?

```ts
optional trace: undefined;
```
