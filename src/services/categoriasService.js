// peticiones con axios
// se instaló npm i axios

import axios from "axios";
const URL="https://6287cf1e7864d2883e8cefaa.mockapi.io/categorias";

// obteniendoCategorias
// Siguiendo documentacion de axios
const getCategories = ()=>{
    return new Promise((resolve,reject)=>{
        axios.get(URL)
        .then(({data,status})=>{
            if (status===200) {
                resolve(data)
            }else{
                reject("Error al obtener data")
            }
        })
        .catch((error)=>{
            reject(error)
        })
    })
}

const CreateCategories=async(newCategories)=>{
    try {
        // enviar un json a mockapi
        const headers={
            "content-Type":"application/json"
        }
        // .post(url,data,{headers})
        const  {data,status}= await axios.post(URL,newCategories,{headers})
        if (status===201) {
            return data
        } else{
            throw "Error al obtener data"
        }
    } catch (error) {
        throw error
    }
}

// se exporta la funcion pq lo vamos a utilizar en otro archivo
export{
    getCategories,
    CreateCategories
}

