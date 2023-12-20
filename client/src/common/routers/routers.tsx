import { RouterProvider, createBrowserRouter } from "react-router-dom";
import { HomePage } from "../../pages/HomePage/Home.page";
import { SignInPage } from "../../pages/AuthPages/SignIn.page";
import { SignUpPage } from "../../pages/AuthPages/SignUp.page";
import { PageGuard } from "../authentication/PageGuard.component";

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
};

const browserRouter = createBrowserRouter(Object.values(ROUTES));
export function AppRouter() {
  return <RouterProvider router={browserRouter} />;
}
