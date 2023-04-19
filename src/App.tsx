import { QueryClient, QueryClientProvider } from "react-query";
import { AuthProvider } from "./Context/AuthContext";
import { GlobalStyles } from "./GlobalStyles";
import AppRoutes from "./routes";
import { ReactQueryDevtools } from 'react-query/devtools'


function App() {
  const queryClient = new QueryClient({
    defaultOptions: {
      queries: {
        refetchInterval: 60 * 1000,
        refetchOnWindowFocus: false,
      }
    }
  });

  return (
    <>
      <QueryClientProvider client={queryClient}>
        <AppRoutes />
      </QueryClientProvider>
    </>
  );
}

export default App;
