'use strict';

// =================================================================================
// App Configuration
// =================================================================================
const https = require('https');

const {
    App
} = require('jovo-framework');

const config = {
    logging: true,
};

const app = new App(config);


// =================================================================================
// App Logic
// =================================================================================

app.setHandler({
    'Default Welcome Intent': function () {
        this.tell('HelloWorldIntent');
    },
    'LAUNCH': function () {
        this.toIntent('HelloWorldIntent');
    },

    'HelloWorldIntent': function () {
        // this.tell('https://www.google.com/');
        this.googleAction().displayText('https://www.google.com/').tell("https://www.google.com/");
    },
    "LocationsIntent": function (city) {

        console.log("this is passed in" + JSON.stringify(city));
        // console.log("this is passed in" + JSON.stringify(date));
        // console.log("this is passed in"+JSON.stringify(geoCity2));
        findPrice(city.value[0] , city.value[1] )
        .then((resolve)=>{
            this.tell('Hey it cost ' + resolve.price + ". duration is  " + resolve.duration + " thats a nice place");
        })
        .catch((err)=>{
            this.tell('there was an error thats a nice place='+err);
            
        });

        // this.tell('Hey ' + city.value[0] + " to " + city.value[1] + " thats a nice place");
    },
});


function findPrice(from,to) {
    return new Promise((resolve,reject)=>{
    let from_loc = from
    let to_loc = to

    let query = 'https://api.skypicker.com/flights?fly_from=' + from_loc + '&fly_to=' + to_loc + '&limit=5&sort=price&curr=USD';

    https.get(query, (resp) => {
        let data = '';

        // A chunk of data has been recieved.
        resp.on('data', (chunk) => {
            data += chunk;
        });

        // The whole response has been received. Print out the result.
        resp.on('end', () => {
            let objdata = JSON.parse(data);
            let obj={
                "price":objdata.best_results[0].price,
                "duration":objdata.best_results[0].duration
            };

            resolve(obj);
            console.log(objdata.best_results[0].price);
            console.log(objdata.best_results[0].duration);
        });

    }).on("error", (err) => {
        reject(err);
        console.log("Error: " + err.message);
    });
});

}

module.exports.app = app;