import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import "./index.css";
import App from "./App.tsx";
import { Home } from "./routes/home";
import { Blog } from "./routes/blog";
import { Post } from "./routes/post";
import { AboutSection } from "./routes/about/index.tsx";
import { Projects } from "./routes/projects/index.tsx";
import { AdminPanel } from "./routes/admin/index.tsx";
import { ContactForm } from "./routes/contact/index.tsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: "",
        element: <Home />,
      },
      {
        path: "/about",
        element: <AboutSection />,
      },
      {
        path: "/blog",
        element: <Blog />,
      },
      {
        path: "/blog/:slug",
        element: <Post />,
      },
      {
        path: "/projects",
        element: <Projects />,
      },
      {
        path: "/admin",
        element: <AdminPanel />,
      },
      { path: "/contact", element: <ContactForm /> },
    ],
  },
]);

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>,
);
