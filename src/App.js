// ACA SE IMPORTA TODAS LAS VISTAS!!!

import "bootstrap/dist/css/bootstrap.min.css"
import {BrowserRouter as Router, Routes, Route} from "react-router-dom"
// vistas
import CreateCategorieView from "./views/CreateCategorieView"
import DashboardView from "./views/DashboardView"
import CreateProductView from "./views/CreateProductView"
import ProductsView from "./views/ProductsView"
import EditProductView from "./views/EditProductView"

// componentes
import Navigation from "./components/Navigation"
import CategoriasView from "./views/CategoriasView"





export default function App() {
  return (
    <>
    <Router>
    <Navigation/>
    <div className="container">
    <Routes>
      <Route path="/" element={<DashboardView/>}></Route>
      <Route path="/crearcategoria" element={<CreateCategorieView/>}></Route>
      <Route path="/productos" element={<ProductsView/>}></Route>
      <Route path="/crearproducto" element={<CreateProductView/>}></Route>
      <Route path="/editarproducto/:idCat/:idProducto" element={<EditProductView/>}></Route>
      <Route path="/categorias" element={<CategoriasView/>}></Route>
    </Routes>
    </div>
    </Router>
    </>
  )
}
