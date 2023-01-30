// ex. scripts/build_npm.ts
import { build, emptyDir } from "https://deno.land/x/dnt/mod.ts";

await emptyDir("./npm");

await build({
  packageManager: "pnpm",
  entryPoints: ["./mod.ts"],
  outDir: "./npm",
  shims: {
    deno: {
      test: true,
    },
  },
  compilerOptions: {
    lib: ["es2021", "dom"],
  },
  package: {
    name: "@jmondi/route-strings",
    version: Deno.args[0]?.replace("v", ""),
    description: "Manage and create typed route strings for your applications.",
    author: "Jason Raimondi <jason@raimondi.us>",
    license: "MIT",
    engines: {
      node: ">=18.0.0",
    },
    repository: {
      type: "git",
      url: "git+https://github.com/jasonraimondi/route-strings.git",
    },
    bugs: {
      url: "https://github.com/jasonraimondi/route-strings/issues",
    },
  },
});

// ensure the test data is ignored in the `.npmignore` file
// so it doesn't get published with your npm package
await Deno.writeTextFile(
  "npm/.npmignore",
  "esm/testdata/\nscript/testdata/\n",
  { append: true },
);

// post build steps
Deno.copyFileSync("LICENSE", "npm/LICENSE");
Deno.copyFileSync("README.md", "npm/README.md");
