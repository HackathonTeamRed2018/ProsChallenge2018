'use strict';

// =================================================================================
// App Configuration
// =================================================================================

const {App} = require('jovo-framework');

const config = {
    logging: true,
};

const app = new App(config);


// =================================================================================
// App Logic
// =================================================================================

app.setHandler({
    'Default Welcome Intent': function() {
        this.tell('HelloWorldIntent');
    },
    'LAUNCH': function() {
        this.toIntent('HelloWorldIntent');
    },

    'HelloWorldIntent': function() {
        this.tell('Hello World!');
    },

    'MyNameIsIntent': function(name) {
        this.tell('Hey ' + name.value + ', nice to meet you!');
    },
});

module.exports.app = app;
