import { RouterProvider, createBrowserRouter } from "react-router-dom";
import { HomePage } from "../../pages/HomePage/Home.page";
import { SignInPage } from "../../pages/AuthPages/SignIn.page";
import { SignUpPage } from "../../pages/AuthPages/SignUp.page";
import { PageGuard } from "../authentication/PageGuard.component";
import { ViewHtmlPage } from "../../pages/ViewHtmlPage/ViewHtmlPage";
import { NotFoundPage } from "../../pages/NotFoundPage/NotFound.page";

export const ROUTES = {
  home: {
    path: "/",
    element: (
      <PageGuard>
        <HomePage />
      </PageGuard>
    ),
  },
  signIn: {
    path: "/sign-in",
    element: <SignInPage />,
  },
  signUp: {
    path: "/sign-up",
    element: <SignUpPage />,
  },
  viewHtml: {
    path: "/view-html/:searchResultId",
    element: (
      <PageGuard>
        <ViewHtmlPage />
      </PageGuard>
    ),
  },
  notFound: {
    path: "*",
    element: <NotFoundPage />,
  },
};

const browserRouter = createBrowserRouter(Object.values(ROUTES));
export function AppRouter() {
  return <RouterProvider router={browserRouter} />;
}
