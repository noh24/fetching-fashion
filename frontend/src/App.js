import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./screens/Home";
import SharedLayout from "./components/SharedLayout";
import SingleWinterApparel from "./screens/SingleWinterApparel";
import WinterApparel from "./screens/WinterApparel";
import SignIn from "./screens/SignIn";
import Shipping from "./screens/Shipping";
import Payment from "./screens/Payment";
import Order from "./screens/Order";
import SignUp from "./screens/SignUp";
import OrderHistory from "./screens/OrderHistory";
import Profile from "./screens/Profile";
import ScrollToTop from "./Utility/ScrollToTop";

function App() {
  return (
    <BrowserRouter>
      <ScrollToTop>
        <Routes>
          <Route path='/' element={<SharedLayout />}>
            <Route index element={<Home />}></Route>
            <Route
              path='/products/winter-apparel'
              element={<WinterApparel />}
            ></Route>
            <Route path='/product/:id' element={<SingleWinterApparel />} />
            <Route path='/signin' element={<SignIn />} />
            <Route path='/signup' element={<SignUp />} />
            <Route path='/shipping' element={<Shipping />} />
            <Route path='/payment' element={<Payment />} />
            <Route path='/order/:id' element={<Order />} />
            <Route path='/orderhistory' element={<OrderHistory />} />
            <Route path='/profile' element={<Profile />} />
          </Route>
        </Routes>
      </ScrollToTop>
    </BrowserRouter>
  );
}

export default App;
