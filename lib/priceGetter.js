const https = require('https');


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
            // console.log("testing"+JSON.stringify(objdata.data[3].route,null,4)+"\n\n\n\n\n\n\n\n")
            let route=[];
            for(let i=0;i<objdata.data[3].route.length;i++)
            {   
                if(i==0) {
                    route.push(objdata.data[3].route[i].mapIdfrom);
                }
                
                route.push(objdata.data[3].route[i].cityTo);
                console.log(objdata.data[3].route[i].mapIdfrom+" "+objdata.data[3].route[i].cityTo);
            }
            for (let i in route) {
                route[i] = route[i].charAt(0).toUpperCase() + route[i].slice(1);
            }
            console.log(route);
            
            let obj={
                "route":route,
                "from":route[0],
                "to":route[route.length-1],
                "price":objdata.best_results[0].price,
                "duration":objdata.best_results[0].duration
            };
            console.log(JSON.stringify(obj,null,2));
            

            resolve(obj);
            console.log("found"+objdata.best_results[0].price);
            console.log("found"+objdata.best_results[0].duration);
        });

    }).on("error", (err) => {
        reject(err);
        console.log("Error: " + err.message);
    });
});

}

module.exports={
    findPrice
};