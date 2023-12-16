import React from "react";
import { Button } from "./components/Button.component";
import { testApi } from "./apis/test.apis";

export function App() {
  React.useEffect(() => {
    testApi();
  }, []);

  return (
    <div className="text-center hover:bg-pink-100">
      Hello, this is Google Scraper FE {process.env.SERVER_URL}
      <Button>OK</Button>
    </div>
  );
}
