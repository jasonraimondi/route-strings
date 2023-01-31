# @jmondi/route-strings

[![Deno Version](https://shield.deno.dev/x/route_strings?style=flat-square)](https://deno.land/x/route_strings)
[![Npmjs.org Version](https://img.shields.io/npm/v/@jmondi/route-strings?style=flat-square)](https://www.npmjs.com/package/@jmondi/route-strings)
[![GitHub Workflow Status](https://img.shields.io/github/actions/workflow/status/jasonraimondi/route-strings/test.yml?branch=main&label=Unit%20Tests&style=flat-square)](https://github.com/jasonraimondi/route-strings)
[![Test Coverage](https://img.shields.io/codeclimate/coverage/jasonraimondi/route-strings?style=flat-square)](https://codeclimate.com/github/jasonraimondi/route-strings)
[![NPM Downloads](https://img.shields.io/npm/dt/@jmondi/route-strings?label=npm%20downloads&style=flat-square)](https://www.npmjs.com/package/@jmondi/route-strings)

A typed route string generator to help keep urls under control.

## Install

```bash
pnpm add @jmondi/route-strings
```

### Deno

```ts
import { route } from "https://deno.land/x/route_strings/mod.ts";
```

## Usage

```ts
import { Route } from "@jmondi/route-strings";
const r = route("/posts/:slug");
r.template
// /posts/:slug
```

```ts
const r = route("/posts/:slug/random/:id");
r.create({ slug: "hello", id: 5 });
// /posts/hello/random/5
```

```ts
const g = routeGroup({ prefix: "/api/v1" });
const route = g.add("/posts/:slug/random/:id");
route.template
// /api/v1/posts/:slug/random/:id
route.create({ slug: "hello", id: 5 });
// /api/v1/posts/hello/random/5
```