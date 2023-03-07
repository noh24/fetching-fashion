import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./screens/home/Home";
import SharedLayout from "./shared/SharedLayout";
import SingleWinterApparel from "./screens/SingleWinterApparel";
import WinterApparel from "./screens/WinterApparel";

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
          <Route path='/product/:id' element={<SingleWinterApparel />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
