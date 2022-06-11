import axios from "axios"
// procces.env -> variable de entorno
const URL=process.env.REACT_APP_API;


const createProduct=async(newProduct)=>{
    console.log({newProduct})
    try { 
        const headers = {
            "Content-Type":"application/json"
        }
        // .post (URL,datos,{headers})
        const endpoint = `${URL}/categorias/${newProduct.categoriaId}/productos`
        console.log({endpoint})
        const { data, status } = await axios.post(endpoint, newProduct, {headers})
        if (status===201) {
            return data
        }else{
            // Error() es una manera de enviar un error nativo de JS
            throw Error("Error al crear")
        }
    } catch (error) {
        throw error
    }   
}

const getProductForId=async(idCat,idProducto)=>{
    try {
        const endpoint= `${URL}/categorias/${idCat}/productos/${idProducto}`
        const {data,status}=await axios.get(endpoint)
        if (status===200) {
            return data
        }else{
            throw Error("Error al obtener el Producto")
        }
    } catch (error) {
        throw error
    }
}

const editProduct= async(idCat,idProducto,productEdited)=>{
    try {
        const headers={
            "Content-Type":"application/json"
        }
        const endpoint= `${URL}/categorias/${idCat}/productos/${idProducto}`
        const {data, status}=await axios.put(endpoint,productEdited,{headers})
        if (status===200) {
            return data
        }else{
            throw Error("Error al editar Producto")
        }
    } catch (error) {
        return error
    }
}

const deleteProduct=async(idCat,idProducto)=>{
    try {
        const endpoint= `${URL}/categorias/${idCat}/productos/${idProducto}`
        const {status}= await axios.delete(endpoint)
        console.log(status)
        if (status===200) {
            return "ok"
        }else{
            return Error("Error al eliminar Producto")
        }
    } catch (error) {
        throw error
    }
}

export{
    createProduct,
    getProductForId,
    editProduct,
    deleteProduct
}