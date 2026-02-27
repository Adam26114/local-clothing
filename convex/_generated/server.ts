type Handler<Args, Result> = (ctx: any, args: Args) => Promise<Result> | Result;

type Definition<Args, Result> = {
  args: unknown;
  handler: Handler<Args, Result>;
};

export function query<Args = any, Result = any>(
  definition: Definition<Args, Result>
): Definition<Args, Result> {
  return definition;
}

export function mutation<Args = any, Result = any>(
  definition: Definition<Args, Result>
): Definition<Args, Result> {
  return definition;
}

export function action<Args = any, Result = any>(
  definition: Definition<Args, Result>
): Definition<Args, Result> {
  return definition;
}
