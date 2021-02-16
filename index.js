const fs = require('fs');
const express = require('express');
const app = express();

const router = express.Router();

app.use(express.json());
//TODO
//guitars route,
//post delete guitarist route
//make async reading from json in routes
//code refactor

const apiParams = ['name', 'strings', 'guitars'];

//Adding image links based on the user directory
const dataTemp = JSON.parse(fs.readFileSync(`${__dirname}/data/guitarists.json`));
const data = {...dataTemp, guitarists: dataTemp.guitarists.map( guitarist => {return {...guitarist, image: `${__dirname}/images/${guitarist.image}`}}) };
fs.writeFileSync(`${__dirname}/data/guitarists.json`, JSON.stringify(data));

const getGuitarists = (req,res) => {
    const queries = req.query;
    let filteredData = {...data};

    //if queries doesn't exists return all guitarists 
    if(queries){
        for( key in queries) {
            
            //if query param is not supported by api return false
            if(!apiParams.includes(key)){
                return res.status(404).json({
                    status: 'error',
                    msg: 'wrong parameter'
                }); 
            }
            //apply filters
            filteredData.guitarists = filteredData.guitarists.filter( guitarist => guitarist[key].toLowerCase().includes(queries[key].toLowerCase()) )
        }
    }
    return res.status(200).json({
        status: 'success',
        result: filteredData.length,
        data: filteredData
    });

};

app.use('/api/v1/guitarists', router);

router.route('/').get(getGuitarists);

app.listen(3002, () => {

    console.log('server started....');

});


// /api/v1/guitarists  returns all guitarists
// parameters that you can apply individually or combine them together
// name:string     /api/v1/guitarists?name=someName
// strings:number  /api/v1/guitarists?strings=6
// guitars:string  /api/v1/guitarists?guitars=guitarName
// combining example /api/v1/guitarists?guitars=guitarName&strings=6