import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import App from "./App.tsx";
import Query from "./components/providers/query-client.tsx";
import { Toaster } from "./components/ui/sonner.tsx";
import "./index.css";
import ClassReportPage from "./pages/class-report.tsx";
import ClassPage from "./pages/class.tsx";
import StudentReportPage from "./pages/student-report.tsx";

const router = createBrowserRouter([
  {
    path: "/",
    Component: App,
  },
  {
    path: "/class",
    Component: ClassPage,
  },
  {
    path: "/report/student/:id",
    Component: () => (
      <section className="py-28 container">
        <StudentReportPage />,
      </section>
    ),
  },
  {
    path: "/report/class/:id",
    Component: () => (
      <section className="py-28 container">
        <ClassReportPage />,
      </section>
    ),
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
