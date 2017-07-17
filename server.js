/**
 * Created by amarshanand on 17/7/17.
 */

var app = require('express')();
app.use(require('body-parser').json());
app.listen(parseInt(process.env.PORT, 10) || 8080);

// as per the specs, i am providing only one post method
app.post('/', function(req, res) {
    try {
        var f = function(str){return str?str:""}
        var resArray = req.body.payload.reduce(function(result, elem) {
            if(elem.type==='htv' && elem.workflow==='completed') result.push({
                concataddress : (f(elem.address.unitNumber)+" "+f(elem.address.buildingNumber)+" "+f(elem.address.street)+" "+f(elem.address.suburb)+" "+f(elem.address.state)+" "+f(elem.address.postcode)).trim(),
                type: "htv",
                workflow: "completed"
            });
            return result;
        }, []);
        res.send({response:resArray});
    } catch(err) {
        res.status(400).send({"error": "Could not decode request: JSON parsing failed"});
    }
});
