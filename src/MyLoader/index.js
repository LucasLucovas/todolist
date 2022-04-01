import React from "react"
import { Triangle } from "react-loader-spinner"
import './MyLoader.css'


const MyLoader = (props) => (

  <Triangle 
    color="#00BFFF" height={150} width={150} wrapperClass='loader'
  />

)

export { MyLoader }


