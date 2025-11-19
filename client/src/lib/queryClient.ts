// import { QueryClient } from "@tanstack/react-query";

// export const queryClient = new QueryClient({
//   defaultOptions: {
//     queries: {
//       retry: 1,
//       staleTime: 1000 * 60 * 1, // 1 minute
//       gcTime: 1000 * 60 * 5, // 5 minutes
//       refetchOnWindowFocus: false,
//       refetchOnReconnect: true,
//       refetchOnMount: false,
//     },
//   },
// });

import { QueryClient } from "@tanstack/react-query";

export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 1000 * 60 * 1, // 1 minute
      gcTime: 1000 * 60 * 5, // 5 minutes
      refetchOnWindowFocus: false,
      refetchOnReconnect: true,
      refetchOnMount: false,

      // React Query v5: retry must be synchronous (cannot be async)
      retry: (failureCount, error: any) => {
        if (error?.response?.status === 401) return false; // don't retry 401
        return failureCount < 1; // retry all others once
      },
    },
  },
});
