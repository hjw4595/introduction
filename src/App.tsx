import { BrowserRouter, Route, Routes } from "react-router";
import routes from "./route/routes";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        {routes.map((route) => (
          <Route
            key={route.name}
            path={route.path}
            element={<route.component />}
          />
        ))}
      </Routes>
    </BrowserRouter>
  );
}

export default App;
