import { useState, useEffect } from "react"
import { getCategories } from "../services/categoriasService"
import { Link } from "react-router-dom"
import { deleteProduct } from "../services/productsService"
import Swal from "sweetalert2"



export default function ProductsView() {

    const [product, setProduct] = useState([])

    const btnDeleteProduct = async (idCat, idProducto) => {
        try {
            const resultado = await Swal.fire({
                title: '¿Desea eliminar este producto?',
                showCancelButton: true,
                confirmButtonText: 'Si, eliminar',
                cancelButtonText: `No, cancelar`,
            })
            if (resultado.isConfirmed) {
                await deleteProduct(idCat, idProducto)
                Swal.fire({
                    title: "Lugar eliminado!",
                    icon: "success"
                })
                obtenerCategories()
            }
        } catch (error) {
            console.log(error)
        }
    }

    const obtenerCategories = async () => {
        try {
            const categorias = await getCategories()
            console.log(categorias);
            // filtrando las categorias que tenga al menos 1 Producto
            // filtro--> usando "filter"
            // cat.productos--< variable de mockapi
            const catFiltradas = categorias.filter((cat) => cat.productos.length > 0)
            console.log("filtrado", catFiltradas);
            // solo estoy utilizando su propiedad productos  y flata para que todo esté en un solo arreglo
            // .flat()--> pone todos los sub-arreglos de arreglos, en un solo arreglo
            const arrProducts = catFiltradas.map((cat) => cat.productos).flat()
            setProduct(arrProducts)
        } catch (error) {
            console.log(error);
        }
    }

    useEffect(() => {

        obtenerCategories()
    }, [])

    return (
        <div>
            <h1 className="mt-5">
                Productos
            </h1>
            <Link className="btn btn-success mt-3 mb-2" to="/crearproducto">
                Crear nuevo Producto
            </Link>
          
            <table className="table mt-3 tableprod">
                <thead>
                    <tr>
                        <th>Nombre</th>
                        <th>Descripción</th>
                        {/* <th>Stock</th> */}
                        <th>Precio</th>
                        <th>Accion</th>
                    </tr>
                </thead>
                <tbody>
                    {product.map(({ prod_nom, prod_desc, prod_stock, prod_price, prod_id, categoriaId }, i) => (

                       


                        <tr key={i}>
                            <td>{prod_nom}</td>
                            <td>{prod_desc}</td>
                            {/* <td>{prod_stock}</td> */}
                            <td>S/.{prod_price}</td>
                            <td>
                                {/* la url para llevarnos a la vista de editar va a a ser armada con editarproducto y el id de la categoria y el producto respectivamente */}
                                <Link className="btn btn-warning btn-sm" to={`/editarproducto/${categoriaId}/${prod_id}`}>
                                    <i className="fa-solid fa-pen-to-square"></i>
                                </Link>
                                <button className="btn btn-danger btn-sm ms-2" onClick={() => { btnDeleteProduct(categoriaId, prod_id) }}>
                                    <i className="fa-solid fa-trash-can"></i>
                                </button>
                            </td>
                        </tr>
                    ))}

                </tbody>
            </table>
        </div>

    )
}
