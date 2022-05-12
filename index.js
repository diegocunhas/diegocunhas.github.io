const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
require('dotenv').config({ path: './.env'});

const app = express();

app.use(cors());
app.use(bodyParser.json());

console.log("port", process.env.PORTT);
console.log("senha", process.env.password);
// const Pool = require("pg").Pool;
// const pool = new Pool({
//     user: "ffvkynvtaqjhow",
//     host: "ec2-44-196-8-220.compute-1.amazonaws.com",
//     dataase: "d5u41h9ficmo7e",
//     password: "e7f906db811665563f28752ac1dd625b0366669f9474a6a832768ecc32738a3f",
//     port: 5432,
//     useSSL: true
// });

//--------------CREATE-------------------------

app.post("https://check-fit.herokuapp.com/#/alimento",(req,res)=>{
    const {label,status,priority}= req.body;

    pool.query(
        "INSERT INTO ALIMENTOS (nm_alimento,ds_alimento,nm_categoria_alimento) VALUES ($1,$2,$3)",
        [nome,descricao,categoria],
        (error, results) => {
            if (error){
                throw error;
            }

            res.sendStatus(201);
        }
    )
});

//---------------------READ------------------------------------------------

app.get("https://check-fit.herokuapp.com/#/alimento",(req,res)=>{
    
    pool.query(
        "SELECT nm_alimento,ds_alimento,nm_categoria_alimento FROM alimentos ORDER BY nm_alimento ASC",
        [],
        (error, results)=>{
            if (error){
                throw error;
            }

        res.status(200).json(results.rows);
        }
    );
});

app.get("https://check-fit.herokuapp.com/#/alimento/:id",(req,res)=>{
    const {id} = req.params;
    
    pool.query(
        "SELECT nm_alimento,ds_alimento,nm_categoria_alimento FROM alimentos WHERE cd_alimento=$1",
        [id],
        (error, results)=>{
            if (error){
                throw error;
            }

        res.status(200).json(results.rows);
        }
    );
});

//---------------UPDATE
app.put("https://check-fit.herokuapp.com/#/alimento/:id",(req,res)=>{
    const {id} = req.params;
    const {nm_alimento,ds_alimento,nm_categoria_alimento} = req.body;
    
    pool.query(
        "UPDATE alimentos SET nm_alimento, ds_alimento, nm_categoria_alimento WHERE cd_alimento=$1",
        [id,nm_alimento,ds_alimento,nm_categoria_alimento],
        (error, results)=>{
            if (error){
                throw error;
            }

        res.sendStatus(200);
        }
    );
});

//------------DELETE
app.delete("https://check-fit.herokuapp.com/#/alimento/:id",(req,res)=>{
    const {id} = req.params;
    
    pool.query(
        "DELETE FROM alimentos WHERE cd_alimento=id",
        [id],
        (error, results)=>{
            if (error){
                throw error;
            }

        res.sendStatus(200);
        }
    );
});

var port = process.env.PORT || 8080;
app.listen(port, () =>{console.log('server rodando');});