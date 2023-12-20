import { RouterProvider, createBrowserRouter } from "react-router-dom";
import { HomePage } from "../../pages/Home/Home.page";
import { SignInPage } from "../../pages/SignIn/SignIn.page";
import { SignUpPage } from "../../pages/SignUp/SignUp.page";

export const ROUTES = {
  home: {
    path: "/",
    element: <HomePage />,
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
