import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import {
  createBrowserRouter,
  RouterProvider
} from "react-router-dom";
import App from "./App.tsx";
import Query from "./components/providers/query-client.tsx";
import { Toaster } from "./components/ui/sonner.tsx";
import "./index.css";
import ClassPage from "./pages/class.tsx";

const router = createBrowserRouter([
  {
    path: "/",
    Component: App,
  },
  {
    path: "/class",
    Component: ClassPage,
  },
]);
createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <Query>
      <RouterProvider router={router} />
      <Toaster richColors />
    </Query>
  </StrictMode>
);
