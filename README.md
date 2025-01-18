# Sizium

[![Web](https://img.shields.io/badge/Web-grey?style=for-the-badge&logoColor=white)](https://pigeonposse.com)
[![About Us](https://img.shields.io/badge/About%20Us-grey?style=for-the-badge&logoColor=white)](https://pigeonposse.com?popup=about)
[![Donate](https://img.shields.io/badge/Donate-pink?style=for-the-badge&logoColor=white)](https://pigeonposse.com/?popup=donate)
[![Twitter](https://img.shields.io/badge/Twitter-black?style=for-the-badge&logoColor=white&logo=twitter)](https://twitter.com/pigeonposse_)
[![Instagram](https://img.shields.io/badge/Instagram-black?style=for-the-badge&logoColor=white&logo=instagram)](https://www.instagram.com/pigeon.posse/)
[![Medium](https://img.shields.io/badge/Medium-black?style=for-the-badge&logoColor=white&logo=medium)](https://medium.com/@pigeonposse)

[![BANNER](https://github.com/pigeonposse/sizium/blob/main/docs/public/banner.png?raw=true)](https://sizium.pigeonposse.com)

[![License](https://img.shields.io/github/license/pigeonposse/sizium?style=for-the-badge&color=green&logoColor=white)](/LICENSE)
[![Version](https://img.shields.io/npm/v/sizium?style=for-the-badge&color=blue&label=Version)](https://www.npmjs.com/package/sizium)

Get the actual size of any local or remote package

## Table of contents

- [What is `sizium`?](#what-is-sizium)
- [🔑 Installation](#-installation)
- [More](#more)
- [👨‍💻 Development](#-development)
- [☕ Donate](#-donate)
- [📜 License](#-license)
- [🐦 About us](#-about-us)


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



## 🔑 Installation

```bash 
npm install @sizium/core
# or
pnpm install @sizium/core
# or
yarn add @sizium/core
# or
bun add @sizium/core
# or
deno add @sizium/core
```

## More

- [Core](https://sizium.pigeonposse.com/guide/core)
- [Api](https://sizium.pigeonposse.com/guide/api)
- [Api-client](https://sizium.pigeonposse.com/guide/api-client)
- [Cli](https://sizium.pigeonposse.com/guide/cli)
- [Lib](https://sizium.pigeonposse.com/guide/lib)
- [Node-server](https://sizium.pigeonposse.com/guide/node-server)


---

## 👨‍💻 Development

__Sizium__ is an open-source project and its development is open to anyone who wants to participate.

[![Issues](https://img.shields.io/badge/Issues-grey?style=for-the-badge)](https://github.com/pigeonposse/sizium/issues)
[![Pull requests](https://img.shields.io/badge/Pulls-grey?style=for-the-badge)](https://github.com/pigeonposse/sizium/pulls)
[![Read more](https://img.shields.io/badge/Read%20more-grey?style=for-the-badge)](https://sizium.pigeonposse.com)

## ☕ Donate

Help us to develop more interesting things.

[![Donate](https://img.shields.io/badge/Donate-grey?style=for-the-badge)](https://pigeonposse.com/?popup=donate)

## 📜 License

This software is licensed with __[GPL-3.0](https://github.com/pigeonposse/sizium/blob/main/LICENSE)__.

[![Read more](https://img.shields.io/badge/Read-more-grey?style=for-the-badge)](https://github.com/pigeonposse/sizium/blob/main/LICENSE)

## 🐦 About us

*PigeonPosse* is a ✨ __code development collective__ ✨ focused on creating practical and interesting tools that help developers and users enjoy a more agile and comfortable experience. Our projects cover various programming sectors and we do not have a thematic limitation in terms of projects.

[![More](https://img.shields.io/badge/Read-more-grey?style=for-the-badge)](https://github.com/pigeonposse)

---

[![Web](https://img.shields.io/badge/Web-grey?style=for-the-badge&logoColor=white)](https://pigeonposse.com)
[![About Us](https://img.shields.io/badge/About%20Us-grey?style=for-the-badge&logoColor=white)](https://pigeonposse.com?popup=about)
[![Donate](https://img.shields.io/badge/Donate-pink?style=for-the-badge&logoColor=white)](https://pigeonposse.com/?popup=donate)
[![Twitter](https://img.shields.io/badge/Twitter-black?style=for-the-badge&logoColor=white&logo=twitter)](https://twitter.com/pigeonposse_)
[![Instagram](https://img.shields.io/badge/Instagram-black?style=for-the-badge&logoColor=white&logo=instagram)](https://www.instagram.com/pigeon.posse/)
[![Medium](https://img.shields.io/badge/Medium-black?style=for-the-badge&logoColor=white&logo=medium)](https://medium.com/@pigeonposse)

<!--

██████╗ ██╗ ██████╗ ███████╗ ██████╗ ███╗   ██╗██████╗  ██████╗ ███████╗███████╗███████╗
██╔══██╗██║██╔════╝ ██╔════╝██╔═══██╗████╗  ██║██╔══██╗██╔═══██╗██╔════╝██╔════╝██╔════╝
██████╔╝██║██║  ███╗█████╗  ██║   ██║██╔██╗ ██║██████╔╝██║   ██║███████╗███████╗█████╗  
██╔═══╝ ██║██║   ██║██╔══╝  ██║   ██║██║╚██╗██║██╔═══╝ ██║   ██║╚════██║╚════██║██╔══╝  
██║     ██║╚██████╔╝███████╗╚██████╔╝██║ ╚████║██║     ╚██████╔╝███████║███████║███████╗
╚═╝     ╚═╝ ╚═════╝ ╚══════╝ ╚═════╝ ╚═╝  ╚═══╝╚═╝      ╚═════╝ ╚══════╝╚══════╝╚══════╝
                                                                                        
                                                                                        
                                                                                        
█████╗█████╗█████╗█████╗█████╗█████╗█████╗                                              
╚════╝╚════╝╚════╝╚════╝╚════╝╚════╝╚════╝                                              
                                                                                        
                                                                                        
                                                                                        
███████╗██╗███████╗██╗██╗   ██╗███╗   ███╗                                              
██╔════╝██║╚══███╔╝██║██║   ██║████╗ ████║                                              
███████╗██║  ███╔╝ ██║██║   ██║██╔████╔██║                                              
╚════██║██║ ███╔╝  ██║██║   ██║██║╚██╔╝██║                                              
███████║██║███████╗██║╚██████╔╝██║ ╚═╝ ██║                                              
╚══════╝╚═╝╚══════╝╚═╝ ╚═════╝ ╚═╝     ╚═╝                                              
                                                                                        
- Author: [Angelo](https://github.com/angelespejo)



-->

