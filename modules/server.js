'use strict';

/**
 * Service to request the server
 * @example
    server: {
        server: ''
    }
 */

module.exports = function (config, libraries, services) {
    var request = libraries.request;

    var post = function (path, data, callback) {
        var options = {
            method: 'post',
            body: data,
            json: true,
            url: config.server + path
        };
        request(options, function (err, res, body) {
            callback(body);
        });
    };

    var get = function (path, callback) {
        request(config.server + path, function (err, res, body) {
            callback(body);
        });
    };

    services.server = { get: get, post: post };
};
