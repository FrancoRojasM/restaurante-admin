import { useState, useEffect } from "react"
import { getCategories } from "../services/categoriasService"
import { Link } from "react-router-dom";


import React from 'react'

export default function CategoriasView() {

    const [categories, setCategories] = useState([]);
  useEffect(() => {
    getCategories()
      .then((data) => {
        setCategories(data)
      })
      .catch((error) => {
        console.log(error)
      })
    // solo se va a ejecutar una vez
  }, [])

  return (
   <>
      <h1 className="title mt-5">Lista de Categorías</h1>  
      <Link className="btn btn-success mt-3 mb-2" to="/crearcategoria">
                Crear nuevo Categoria
            </Link>  
      <div className="card mt-4">
        <div className="card-body">
          {/* <h4 className="card-title">
          Categorias
          </h4> */}
          <table className="table table-striped">
            <thead>
              <tr>
                <th>Id</th>
                <th>Nombre</th>
                <th>Descripción</th>              
              </tr>
            </thead>
            <tbody>
              {categories.map((item,i)=>( 
                <tr key={i}>
                  <td>
                    {item.cat_id}
                  </td>
                  <td>
                    {item.cat_nom}
                  </td>
                  <td>
                    {item.cat_desc}
                  </td>   
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </>
  )
}
