import { QueryClient, QueryClientProvider } from "react-query";
import { AuthProvider } from "./Context/AuthContext";
import { GlobalStyles } from "./GlobalStyles";
import AppRoutes from "./routes";
import { ReactQueryDevtools } from 'react-query/devtools'


function App() {
  const queryClient = new QueryClient({
    defaultOptions: {
      queries: {
        refetchInterval: 5 * 1000,
      }
    }
  });

  return (
    <>
      <GlobalStyles />
      <AuthProvider>
        <QueryClientProvider client={queryClient}>
          <AppRoutes />
          <ReactQueryDevtools />
        </QueryClientProvider>
      </AuthProvider>
    </>
  );
}

export default App;
