import { useState, useEffect, useRef } from "react";
import { getCategories } from "../services/categoriasService";
import { createProduct, editProduct, getProductForId } from "../services/productsService";
import {useNavigate} from "react-router-dom";
import Swal from "sweetalert2";
import { useParams } from "react-router-dom";
import {uploadFile} from "../config/fireStorage"
import Loading from "../components/Loading"

let myfile=null;

export default function EditProductView() {
    const [inputs, setInputs] = useState({
        prod_nom: "",
        prod_desc: "",
        prod_stock: "",
        prod_price: "",
        categoriaId: 1

    })
    const [categorias, setCategorias] = useState([]);

    const [loadingIcon,setLoadingIcon]=useState(false);

    const inputFile=useRef()

    const navigate=useNavigate()    

    const {idCat,idProducto}=useParams()
    console.log({idCat,idProducto})

    // funcion para manejar los inputs
    const handleInputs = (e) => {
        console.log(e.target.name)
        setInputs({
            ...inputs,
            [e.target.name]: e.target.value
        })
    }

    // funcion para manejar los file

    const handleFile=(e)=>{
        // console.log("handleFile",e.target.files[0])
        myfile=e.target.files[0]
    }

    // funcion para manejar los submit
    const handleSubmit = async(e)=>{
        e.preventDefault();
        try {
            // antes de ejecutar la funcion para cargar un archivo
            setLoadingIcon(true)
            if (myfile===null) {
                // si no he tocado el input de archivo, editamos el producto con la informacion de los input y la imagen que tenemos
                await editProduct(idCat,idProducto, inputs)
            }else{
                // si le agrego una imagen con el inputfiles, se sube una imagen y modifico en la propiedad prod_image
                const fileLoad=await uploadFile(myfile)
                await editProduct(idCat,idProducto,{...inputs, prod_image:fileLoad})
            }
            const fileLoad=await uploadFile(myfile)
            setLoadingIcon(false)
            Swal.fire({
                icon:"success",
                title:"Producto actualizado!"
            })
            navigate("/productos")
        } catch (error) {
            setLoadingIcon(false)
            console.log(error)            
        }

    }

    const validateInputs=()=>{
        // trim para los espacios vacios
        if (inputs.prod_nom.trim()==="" || inputs.prod_desc.trim()==="") {
            return true
        }
        return false
    }

    useEffect(() => {
        const obtCategories = async () => {
            try {
                // aqui obtenemos las categorias
                const categoriesObtenidas = await getCategories()
                const infoCategorias = categoriesObtenidas.map(({ cat_id, cat_nom }) => {
                    return { cat_nom: cat_nom, cat_id: cat_id }
                })
                setCategorias(infoCategorias)
                // despues obtenemos el lugar que queremos editar
                const productoaeditar=await getProductForId(idCat,idProducto);
                console.log(productoaeditar)
                setInputs(productoaeditar)
            } catch (error) {
                console.log(error)
            }
        }
        obtCategories()
    }, [])

    if (loadingIcon) {
        return <Loading/>
    }

    return (
        <div>
            <h1 className="mt-5">
                Editar Producto
            </h1>
            <form onSubmit={(e)=>{handleSubmit(e)}}>
                <div className='mb-3'>
                    <label className='form-label'>
                        Nombre del Producto:
                    </label>
                    <input
                        type="text" placeholder="Ingrese el nombre del Producto"
                        className='form-control'
                        name="prod_nom"
                        value={inputs.prod_nom}
                        onChange={(e) => { handleInputs(e) }}
                    >
                    </input>
                </div>
                <div className='mb-3'>
                    <label className='form-label'>
                        Descripción del Producto:
                    </label>
                    <input
                        type="text" placeholder="Describa el Producto"
                        className='form-control'
                        name="prod_desc"
                        value={inputs.prod_desc}
                        onChange={(e) => { handleInputs(e) }}
                    >
                    </input>
                </div>
                <div className='mb-3'>
                    <label className='form-label'>
                        Stock de Producto:
                    </label>
                    <input
                        type="number"
                        placeholder="Ingrese el stock del Producto"
                        className='form-control'
                        name="prod_stock"
                        value={inputs.prod_stock}
                        onChange={(e) => { handleInputs(e) }}
                    >
                    </input>
                </div>
                <div className='mb-3'>
                    <label className='form-label'>
                        Precio de Producto:
                    </label>
                    <input
                        type="number"
                        placeholder="Ingrese el precio del Producto"
                        className='form-control'
                        name="prod_price"
                        value={inputs.prod_price}
                        onChange={(e) => { handleInputs(e) }}
                    >
                    </input>
                </div>
                <div className="mb-3">
                    <label className="form-label">Seleccione una categoría</label>
                    <select
                    className="form-select"
                    name="categoriaId"
                    value={inputs.categoriaId}
                    onChange={(e) => handleInputs(e)}>
                    {categorias.map(({ cat_id, cat_nom }, i) => (
                    <option value={cat_id} key={i}>
                       {cat_nom}
                    </option>
                        ))}
                    </select>                
                </div>

                <div className="mb-3">
                    <label className="form-label">
                        Seleccione la imagen del producto
                    </label>
                    <input 
                    type="file"
                    className="form-control"
                    ref={inputFile}
                    onChange={(e)=>{handleFile(e)}}
                    >
                    </input>
                </div>


                <button className="btn btn-success" type="submit" disabled={validateInputs()}>
                    Guardar
                </button>
            </form>
        </div>
    )
}
