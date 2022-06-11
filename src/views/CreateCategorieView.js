import { useState } from "react"
import { CreateCategories } from "../services/categoriasService"
import {useNavigate} from "react-router-dom"
import Swal from  "sweetalert2"

export default function CreateCategorieView() {

  // dos estados pero en forma de objeto
  const [inputs,SetInputs]=useState({
    cat_nom:"",
    cat_desc:""
  })

  const navigate= useNavigate() //creando una instancia


  // creando una funcion para el evento onchange
  // function->manejar input
  //  [e.target.name]:e.target.value -> se almacenan los datos en name
  const handleInput=(e)=>{
    SetInputs({
      ...inputs,
      [e.target.name]:e.target.value
    })
  }

  const handleSubmit=async(e)=>{
    e.preventDefault();
    try {
      await CreateCategories(inputs)
      Swal.fire({
        icon:"succes",
        title:"Categoria Creada!"
      }) 
      navigate('/') //direccionar al home
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <>
      <h1 className="mt-5">Crear Categoria</h1>
      <form onSubmit={(e)=>{handleSubmit(e)}}>
        <div className="mt-3 mb-3">
          <label className="form-label">
            Nombre Categoría
          </label>
          <input className="form-control" type="text"
            placeholder="Escriba el nombre de la categoría"
            name="cat_nom"
            value={inputs.cat_nom}
            onChange={(e)=>{handleInput(e)}}
            >
          </input>
        </div>
        <div className="mb-3">
          <label className="form-label">
            Descripcion de categoría
          </label>
          <input className="form-control" type="text"
            placeholder="Escriba una breve descripción de la categoría"
            name="cat_desc"
            value={inputs.cat_desc}
            onChange={(e)=>{handleInput(e)}}
            >
          </input>
        </div>
        <button type="submit" className="btn btn-success">Guardar</button>
        
      </form>
    </>
  )
}
