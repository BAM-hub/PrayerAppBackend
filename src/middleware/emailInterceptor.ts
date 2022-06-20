import { GraphQLResolveInfo } from "graphql";

interface ArgsDictionary {
  [argName: string]: any;
}

interface ResolverData<ContextType = {}> {
  root: any;
  args: ArgsDictionary;
  context: ContextType;
  info: GraphQLResolveInfo;
}

type NextFn = () => Promise<any>;

type MiddlewareFn<TContext = {}> = (
  action: ResolverData<TContext>,
  next: NextFn
) => Promise<any>;

interface MiddlewareInterface<TContext = {}> {
  use: MiddlewareFn<TContext>;
}
interface MiddlewareClass<TContext = {}> {
  new (...args: any[]): MiddlewareInterface<TContext>;
}

type Middleware<TContext = {}> =
  | MiddlewareFn<TContext>
  | MiddlewareClass<TContext>;

export const EmailInterceptor: MiddlewareFn = async ({ args }, next) => {
  // illigal characters in email
  const specialChars = /[`!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?~]/;

  // split on @ must only be two parts
  const splited = args.email.split("@");
  if (splited.length !== 2) throw new Error("Email Must Be valid");

  // check for illigal chars
  const illigalChrs = specialChars.test(
    splited[1].charAt(splited[1].length - 1)
  );
  if (illigalChrs) throw new Error("Email Must Be valid");

  if (splited[1].split(".").length === 0)
    throw new Error("Email Must Be valid");

  return await next();
};
