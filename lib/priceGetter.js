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
            console.log("testing"+JSON.stringify(objdata.data,null,4)+"\n\n\n\n\n\n\n\n")
            let obj={
                "price":"price: $"+objdata.best_results[0].price,
                "duration":objdata.best_results[0].duration
            };

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