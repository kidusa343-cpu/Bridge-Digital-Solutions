import { Switch, Route, Router as WouterRouter, useLocation } from "wouter";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { AuthProvider, useAuth } from "./lib/auth";
import { AdminLayout } from "./components/layout/admin-layout";
import NotFound from "@/pages/not-found";
import { ReactNode, useEffect } from "react";

// Page imports
import Login from "./pages/login";
import Dashboard from "./pages/dashboard";
import Projects from "./pages/projects";
import CaseStudies from "./pages/case-studies";
import Services from "./pages/services";
import Company from "./pages/company";
import Media from "./pages/media";
import Settings from "./pages/settings";
import Users from "./pages/users";

function PrivateRoute({ component: Component }: { component: React.ComponentType }) {
  const { isAuthenticated, isLoading } = useAuth();
  const [, setLocation] = useLocation();

  useEffect(() => {
    if (!isLoading && !isAuthenticated) {
      setLocation("/login");
    }
  }, [isLoading, isAuthenticated, setLocation]);

  if (isLoading) return <div className="flex h-screen items-center justify-center">Loading...</div>;
  if (!isAuthenticated) return null;

  return (
    <AdminLayout>
      <Component />
    </AdminLayout>
  );
}

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: false,
      refetchOnWindowFocus: false,
    },
  },
});

function Router() {
  return (
    <Switch>
      <Route path="/login" component={Login} />
      <Route path="/" component={() => {
        const [, setLocation] = useLocation();
        useEffect(() => { setLocation("/dashboard"); }, []);
        return null;
      }} />
      <Route path="/dashboard"><PrivateRoute component={Dashboard} /></Route>
      <Route path="/projects"><PrivateRoute component={Projects} /></Route>
      <Route path="/case-studies"><PrivateRoute component={CaseStudies} /></Route>
      <Route path="/services"><PrivateRoute component={Services} /></Route>
      <Route path="/company"><PrivateRoute component={Company} /></Route>
      <Route path="/media"><PrivateRoute component={Media} /></Route>
      <Route path="/settings"><PrivateRoute component={Settings} /></Route>
      <Route path="/users"><PrivateRoute component={Users} /></Route>
      <Route component={NotFound} />
    </Switch>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <TooltipProvider>
          <WouterRouter base={import.meta.env.BASE_URL.replace(/\/$/, "")}>
            <Router />
          </WouterRouter>
          <Toaster />
        </TooltipProvider>
      </AuthProvider>
    </QueryClientProvider>
  );
}

export default App;
