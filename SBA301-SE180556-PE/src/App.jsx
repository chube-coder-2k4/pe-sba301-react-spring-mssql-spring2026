import { BrowserRouter, Routes, Route } from 'react-router-dom';
import ShoesList from "./pages/ShoesList";
import ShoesDetail from "./pages/ShoesDetail";
import AddShoes from "./pages/AddShoes";

function App() {
  return (
  <BrowserRouter>
  <Routes>
    <Route path="/" element={<ShoesList/>} />
    <Route path="/add" element={<AddShoes/>} />
    <Route path="/detail/:id" element={<ShoesDetail/>} />
  </Routes>
  </BrowserRouter>
  );
}

export default App;