import { QueryClient, QueryClientProvider } from "react-query";
import { AuthProvider } from "./Context/AuthContext";
import { GlobalStyles } from "./GlobalStyles";
import AppRoutes from "./routes";

function App() {
  console.log(import.meta.env.MODE);

  const queryClient = new QueryClient();

  return (
    <>
      <GlobalStyles />
      <QueryClientProvider client={queryClient}>
        <AuthProvider>
          <AppRoutes />
        </AuthProvider>
      </QueryClientProvider>
    </>
  );
}

export default App;
