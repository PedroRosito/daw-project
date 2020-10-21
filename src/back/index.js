/*=============================================================================
 * Authors: Agustin Bassi, Brian Ducca, Santiago Germino 
 * Date: Jul 2020
 * Licence: GPLV3+
 * Project: DAW - CEIoT - Project Structure
 * Brief: Main backend file
=============================================================================*/

//=======[ Settings, Imports & Data ]==========================================

var PORT    = 3000;

var express = require('express');
var bodyParser = require('body-parser');
var app     = express();
var mysql   = require('./mysql-connector');
var maxid;
//var datos = require('./datos.json');


// to parse application/json
app.use(express.json()); 
app.use(bodyParser.json());
// to serve static files
app.use(express.static('/home/node/app/static/'));
// for parsing application/xwww-urlencoded
app.use(bodyParser.urlencoded({ extended: true })); 



//=======[ Main module code ]==================================================

app.post('/modstate/', function(req,res){
    mysql.query('UPDATE Devices SET state=? WHERE id=?',[req.body.state,req.body.id],function(err, response){
        if(err){
            res.send(err).status(400);
            return;
        }
        res.send("ID: " + req.body.id + " Estado: " + req.body.state);
    });
});

app.post('/apagar/', function(req,res){
    mysql.query('UPDATE Devices SET state=0',function(err, response){
        if(err){
            res.send(err).status(400);
            return;
        }
    });
});

app.post('/rmform/',function(req,res){
    mysql.query('DELETE FROM Devices WHERE name=? AND description=?',[req.body.rmform_name,req.body.rmform_des],function(err,response){
        if(err){
            res.send(err).status(400);
            return;
        }
        res.redirect("http://localhost:8000");
    });
})


app.post('/addform/',function(req,res){
    mysql.query(`INSERT INTO Devices (name, description, state, type) VALUES ('${req.body.addform_name}','${req.body.addform_des}','${req.body.addform_state}','${req.body.addform_type}')`,function(err, response){
       if(err){
           res.send(err).status(400);
           return;
       }
       res.redirect("http://localhost:8000");
   });

});

app.get('/devices/', function(req, res, next) {
    //response = "{ 'key1':'value1' }"
    //res.send(JSON.stringify(datos)).status(200);
    mysql.query('SELECT * FROM Devices',function(err, response){
        if(err){
            res.send(err).status(400);
            return;
        }
        res.send(response);
    });
});



app.get('/devices/:id', function(req,res,next){
    mysql.query('SELECT * FROM Devices WHERE id=?',[req.params.id],function(err, response){
        if(err){
            res.send(err).status(400);
            return;
        }
        res.send(response);
    });
});

app.listen(PORT, function(req, res) {
    console.log("NodeJS API running correctly");
});

//=======[ End of file ]=======================================================
