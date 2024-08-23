import { FC } from "react"
import { QueryClient, QueryClientProvider } from "@tanstack/react-query"
import { IQueryContext } from "@/types"

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
      refetchOnReconnect: false,
      staleTime: 5 * 60 * 1000,
      retry: false,
    },
    mutations: {},
  },
})

const QueryProvider: FC<IQueryContext> = ({ children }) => {
  return (
    <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
  )
}

export default QueryProvider
