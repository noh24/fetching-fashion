import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./screens/Home";
import SharedLayout from "./components/SharedLayout";
import SingleWinterApparel from "./screens/SingleWinterApparel";
import WinterApparel from "./screens/WinterApparel";
import Cart from "./screens/Cart";
import SignIn from "./screens/SignIn";
import Shipping from "./screens/Shipping";
import Payment from "./screens/Payment";
import Order from "./screens/Order";

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
          <Route path='/cart' element={<Cart />} />
          <Route path='/signin' element={<SignIn />} />
          <Route path='/shipping' element={<Shipping />} />
          <Route path='/payment' element={<Payment />} />
          <Route path='/order/:id' element={<Order />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
