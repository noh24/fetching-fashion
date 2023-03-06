import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./Home/Home";
import SharedLayout from "./Shared/SharedLayout";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<SharedLayout/>}>
          <Route index element={<Home/>}></Route>
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
