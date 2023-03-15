import { assertEquals } from "https://deno.land/std@0.174.0/testing/asserts.ts";

import { route, routeGroup } from "./main.ts";

Deno.test("route#template", async (t) => {
  const r = route("/posts/:slug");

  await t.step("success", () => {
    assertEquals(r.template, "/posts/:slug");
  });
});

Deno.test("route#create", async (t) => {
  const r = route("/posts/:slug/random/:id");

  await t.step("success", () => {
    assertEquals(
      r.create({ slug: "hello", id: 5 }),
      "/posts/hello/random/5",
    );
  });
});

Deno.test("routeGroup#add", async (t) => {
  await t.step("success", () => {
    const g = routeGroup({ prefix: "https://jasonraimondi.com" });
    const route = g.add("/posts/:slug/random/:id");
    assertEquals(
      route.template,
      "https://jasonraimondi.com/posts/:slug/random/:id",
    );
    assertEquals(
      route.create({ slug: "hello", id: 5 }),
      "https://jasonraimondi.com/posts/hello/random/5",
    );
  });
});
