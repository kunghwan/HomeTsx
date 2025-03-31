interface PromiseResult {
  success?: boolean;
  message?: string | null;
}

type PropsFunc<P = any, T = void> = (props: P) => T;
