'use strict';

// =================================================================================
// App Configuration
// =================================================================================
var price = require("/Users/micha/Desktop/projects/git/ProsChallenge2018/lib/priceGetter");

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
        price.findPrice(city.value[0] , city.value[1] )
        .then((resolve)=>{
            this.tell('Hey it cost ' + resolve.price + ". duration is  " + resolve.duration + " thats a nice place");
        })
        .catch((err)=>{
            this.tell('there was an error thats a nice place='+err);
            
        });

        // this.tell('Hey ' + city.value[0] + " to " + city.value[1] + " thats a nice place");
    },
});




module.exports.app = app;