import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./Home/Home";
import SharedLayout from "./Shared/SharedLayout";
import WinterApparel from "./Winter/WinterApparel";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<SharedLayout />}>
          <Route index element={<Home />}></Route>
          <Route
            path='/products/winter-apparel'
            element={<WinterApparel />}
          ></Route>
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
