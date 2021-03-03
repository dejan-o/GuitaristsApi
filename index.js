const fs = require('fs');
const express = require('express');
const app = express();
const cors = require('cors');
const router = express.Router();
app.use(cors());
app.use(express.json());

//TODO
//guitars route,
//post delete guitarist route
//make async reading from json in routes
//code refactor

const apiParams = ['name', 'strings', 'guitars'];

//Adding image links based on the user directory
const data = JSON.parse(fs.readFileSync(`${__dirname}/data/guitarists.json`));

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

const getImage = (req,res) => {
    const imageName = req.query.image;
    return res.sendFile(`${__dirname}/images/${imageName}`); 
}

app.use('/api/v1/guitarists', router);

router.route('/').get(getGuitarists);

router.route('/images').get(getImage);
app.listen(3002, () => {

    console.log('server started....');

});


