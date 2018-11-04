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
            let routes="";
            for(let i=0;i<resolve.route.length;i++){
                if(i!=resolve.route.length-1)
                {
                    routes+=resolve.route[i]+"->";
                }else
                {
                    routes+=resolve.route[i];
                }
            }
            let speech = this.speechBuilder()
                .addText('The cheaptest flight is  $'+resolve.price+". ")
                .addBreak('300ms')
                .addText(" The route it took to get there is " + routes+". ")
                .addBreak('300ms')
                .addText("Total distance traveled is "+resolve.duration+". ")
                .addBreak('300ms')
                .addText("Would you like to go anywhere else?")
                .addBreak('300ms')
            // let speech ='The cheaptest flight is  $' +
            //  resolve.price +".<break> the route it took to get there is " + routes 
            //  + "<break>total distance traveled is "
            // +resolve.duration+"<break>would you like to go anywhere else?" 
            this.tell(speech);
        })
        .catch((err)=>{
            this.tell('there was an error thats a nice place='+err);
            
        });

        // this.tell('Hey ' + city.value[0] + " to " + city.value[1] + " thats a nice place");
    },
});




module.exports.app = app;