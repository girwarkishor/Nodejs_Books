var express = require('express')
var walk    = require('walk');

var app = express()

app.get('/', function (req, res) {

    var files   = [],

        Books = "<h1>My favorite Node.js Books</h1><ul>"; 

    // Walker options
    var walker  = walk.walk('public', { followLinks: false });

    walker.on('file', function(root, stat, next) {

       // Add this file to the list of files
       files.push(root + '/' + stat.name);
       Books += "<li><a href='public/"+ stat.name +"'>" + stat.name + "</a></li>";
       next();

    });

    Books += "</ul>";

    walker.on('end', function() {

           res.send( Books );
           console.log( files ) 
    });     
});

var server = app.listen(8080, function(){

 var host = server.address().address, 

     port = server.address().port;

 console.log('App listening at http://%s:%s', host, port);

})