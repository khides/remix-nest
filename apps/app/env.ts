declare module "react-router" {
  // v2 で使用されていた AppLoadContext
  interface AppLoadContext {
    whatever: string;
  }
}

export {}; // これをモジュールとして扱うために TS に必要
