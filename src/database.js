import mongoose from "mongoose";
const database = mongoose.connect("mongodb+srv://daianayanilalegre:Cosmos255@cluster0.fkqnoku.mongodb.net/ecommerce?retryWrites=true&w=majority&appName=Cluster0")

.then (()=> console.log("conectado a BD OMG!!!"))
.catch ((error)=> console.log("error algo salio mal", error));


export default database;