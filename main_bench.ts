import { route, routeGroup } from "./main.ts";

Deno.bench("route#template", () => {
  route("/example/:slug/one").template;
});

Deno.bench("route#create", () => {
  route("/example/:one/:two/:three/:four").create({
    one: "a",
    two: "b",
    three: "c",
    four: "d",
  });
});

Deno.bench("routeGroup#add#template", () => {
  routeGroup({ prefix: "https://jasonraimondi.com" }).add("/example/:slug/one")
    .template;
});

Deno.bench("routeGroup#add#create", () => {
  routeGroup({ prefix: "https://jasonraimondi.com" }).add(
    "/example/:one/:two/:three/:four",
  ).create({ one: "a", two: "b", three: "c", four: "d" });
});
