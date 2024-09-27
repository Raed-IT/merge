"use client";

import { QueryClientProvider, QueryClient } from "@tanstack/react-query";
import React from "react";
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'
// import { setBaseUrl } from "@/lib/data/axios-client";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
      refetchOnReconnect: false,
      retry: 0
    }
  }
})

const ReactQueryDevtoolsProduction = React.lazy(() =>
  import('@tanstack/react-query-devtools/build/modern/production.js').then(
    (d) => ({
      default: d.ReactQueryDevtools,
    }),
  ),
)

const ReactQueryProvider = ({ children }: Readonly<{
  children: React.ReactNode;
}>) => {
  const [showDevtools, setShowDevtools] = React.useState(false)
  React.useEffect(() => {
    // setBaseUrl("/api")
    // @ts-expect-error
    window.toggleReactQueryDevtools = () => setShowDevtools((old) => !old)
  }, [])

  return (
    <QueryClientProvider client={queryClient}>
      <ReactQueryDevtools initialIsOpen={false} />
      {
        showDevtools
          ?
          (
            <React.Suspense fallback={null}>
              <ReactQueryDevtoolsProduction />
            </React.Suspense>
          )
          :
          null
      }
      {children}
    </QueryClientProvider>
  );
};

export default ReactQueryProvider;