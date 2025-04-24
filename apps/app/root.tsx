import {
  Links,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
  useRouteError,
  isRouteErrorResponse,
} from "react-router";
import "~/styles/global.css";
import "highlight.js/styles/github.css";
import "katex/dist/katex.min.css";
import React from "react";
import { ApolloProvider } from "@apollo/client/react";
import { ApolloClient } from "@apollo/client/core";
import { InMemoryCache } from "@apollo/client/cache";

// 新たに追加するインポート
import "@fontsource/inter/100.css";
import "@fontsource/inter/200.css";
import "@fontsource/inter/300.css";
import "@fontsource/inter/400.css";
import "@fontsource/inter/500.css";
import "@fontsource/inter/600.css";
import "@fontsource/inter/700.css";
import "cal-sans";
import "sonner/dist/styles.css";

import { Toaster } from "~/components/ui/sonner";

export const meta = () => {
  return [
    {
      charset: "utf-8",
    },
    {
      title: `${import.meta.env.VITE_APP_NAME} | ${
        import.meta.env.VITE_APP_DESCRIPTION
      }`,
    },
    {
      description: "",
    },
    {
      viewport: "width=device-width,initial-scale=1",
    },
    {
      robots: "noindex, nofollow",
    },
    {
      property: "og:description",
      content: "",
    },
  ];
};

export function HydrateFallback() {
  return <p></p>;
}

const client = new ApolloClient({
  uri: import.meta.env.VITE_GRAPHQL_ENDPOINT || "http://localhost:8000/graphql",
  cache: new InMemoryCache(),
});

interface LayoutProps {
  children: React.ReactNode;
}

// Layoutコンポーネントの修正
export function Layout({ children }: LayoutProps) {
  return (
    <html lang="en" className="h-full font-sans">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="robots" content="noindex, nofollow" />
        <Meta />
        <Links />
      </head>
      <body className="flex flex-col h-full">
        <Toaster />
        {children}
        <Scripts />
        <ScrollRestoration />
      </body>
    </html>
  );
}

// Appコンポーネントの修正
export default function App() {
  return (
    <ApolloProvider client={client}>
        <React.Suspense fallback={<HydrateFallback />}>
          <Outlet />
        </React.Suspense>
    </ApolloProvider>
  );
}

export function ErrorBoundary() {
  const error = useRouteError() as {
    status: number;
    statusText: string;
    data: string;
  } | null;

  if (isRouteErrorResponse(error)) {
    return (
      <>
        <h1>
          {error.status} {error.statusText}
        </h1>
        <p>{error.data}</p>
      </>
    );
  }

  let errorMessage = "Unknown error";
  // @ts-expect-error TODO:ここを修正
  if (error && (error instanceof Error || "message" in error)) {
    //@ts-expect-error TODO:ここを修正
    errorMessage = error.message;
  }

  return (
    <div>
      <h1>Uh oh ...</h1>
      <p>Something went wrong.</p>
      <pre>{errorMessage}</pre>
    </div>
  );
}
