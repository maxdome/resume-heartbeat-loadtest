'use strict';

// Initialize New Relic Node.js agent

if (process.env.NEW_RELIC_LICENSE_KEY) {
    require('newrelic');
}

// Load the libraries and modules

var config = {
    libraries: {
        request: require('request')
    },
    directory: __dirname + '/modules/',
    modules: {
        directory: {
            server: {
                server: process.env.SERVER
            },
            loadtest: {}
        }
    }
};
require('dragonnodejs')(config);
