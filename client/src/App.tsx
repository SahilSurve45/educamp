import { Toaster } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import NotFound from "@/pages/NotFound";
import { Route, Switch } from "wouter";
import ErrorBoundary from "./components/ErrorBoundary";
import { ThemeProvider } from "./contexts/ThemeContext";
import {
  About,
  AdminPage,
  CollegeDetail,
  ComparePage,
  Finder,
  Guidance,
  Home,
  StudentWorkspace,
} from "./pages/Home";

function Router() {
  return (
    <Switch>
      <Route path="/" component={Home} />
      <Route path="/colleges" component={Finder} />
      <Route path="/college/:slug" component={CollegeDetail} />
      <Route path="/compare" component={ComparePage} />
      <Route path="/guidance" component={Guidance} />
      <Route path="/about" component={About} />
      <Route path="/student" component={StudentWorkspace} />
      <Route path="/admin" component={AdminPage} />
      <Route path="/404" component={NotFound} />
      <Route component={NotFound} />
    </Switch>
  );
}

function App() {
  return (
    <ErrorBoundary>
      <ThemeProvider defaultTheme="light">
        <TooltipProvider>
          <Toaster />
          <Router />
        </TooltipProvider>
      </ThemeProvider>
    </ErrorBoundary>
  );
}

export default App;
