type IndexQueryBuilder = {
  eq: (field: string, value: unknown) => IndexQueryBuilder;
};

type ConvexDocument = {
  _id: string;
  [key: string]: unknown;
};

type QueryBuilder = {
  withIndex: (
    indexName: string,
    callback: (builder: IndexQueryBuilder) => IndexQueryBuilder
  ) => QueryBuilder;
  order: (direction: 'asc' | 'desc') => QueryBuilder;
  first: () => Promise<ConvexDocument | null>;
  collect: () => Promise<ConvexDocument[]>;
};

type ConvexDb = {
  query: (table: string) => QueryBuilder;
  get: (id: unknown) => Promise<unknown>;
  insert: (table: string, value: Record<string, unknown>) => Promise<string>;
  patch: (id: unknown, value: Record<string, unknown>) => Promise<void>;
};

type ConvexContext = {
  db: ConvexDb;
};

type Handler<Args extends Record<string, unknown>, Result> = (
  ctx: ConvexContext,
  args: Args
) => Promise<Result> | Result;

type Definition<Args extends Record<string, unknown>, Result> = {
  args: unknown;
  handler: Handler<Args, Result>;
};

export function query<Args extends Record<string, unknown> = Record<string, unknown>, Result = unknown>(
  definition: Definition<Args, Result>
): Definition<Args, Result> {
  return definition;
}

export function mutation<
  Args extends Record<string, unknown> = Record<string, unknown>,
  Result = unknown,
>(
  definition: Definition<Args, Result>
): Definition<Args, Result> {
  return definition;
}

export function action<
  Args extends Record<string, unknown> = Record<string, unknown>,
  Result = unknown,
>(
  definition: Definition<Args, Result>
): Definition<Args, Result> {
  return definition;
}
