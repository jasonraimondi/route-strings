// https://type-level-typescript.com/
type ParseUrlParams<url> = url extends `${infer path}(${infer optionalPath})`
  ? ParseUrlParams<path> & Partial<ParseUrlParams<optionalPath>>
  : url extends `${infer start}/${infer rest}`
    ? ParseUrlParams<start> & ParseUrlParams<rest>
  : url extends `:${infer param}` ? { [k in param]: string | number }
  : {};

let globalPrefix: string | undefined;

export function setGlobalPrefix(prefix?: string) {
  globalPrefix = prefix;
}

export type RouteGroupConfig = {
  prefix?: string;
};

export class RouteGroup {
  constructor(private readonly config: RouteGroupConfig) {}

  add<TPath extends string>(route: TPath) {
    return new Route(route, this.config.prefix);
  }
}

export class Route<TPath extends string> {
  constructor(public readonly path: TPath, public readonly prefix?: string) {}

  toString(): string {
    return this.template;
  }

  get template() {
    return this.appendPrefix(this.path);
  }

  create(params?: ParseUrlParams<TPath>) {
    if (!params) return this.template;

    let path = Object.entries<string>(params).reduce<string>(
      (path, [key, value]) => path.replace(`:${key}`, value),
      this.path,
    );

    path = path.replace(/(\(|\)|\/?:[^\/]+)/g, "");

    return this.appendPrefix(path);
  }

  private appendPrefix(path: string) {
    const prefix = this.prefix ?? globalPrefix;
    return prefix ? prefix + path : path;
  }
}

export function route<TPath extends string>(template: TPath): Route<TPath> {
  return new Route(template);
}

export function routeGroup(config: RouteGroupConfig): RouteGroup {
  return new RouteGroup(config);
}
