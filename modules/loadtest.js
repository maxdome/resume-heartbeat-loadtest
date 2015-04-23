'use strict';

/**
 * Runs the loadtest
 * @example
    loadtest: {}
 */

module.exports = function (config, libraries, services) {
    var server = services.server;

    var last_user_id = 0;
    var asset_id = 0;
    setInterval(function () {
        var user_id = ++last_user_id;
        console.log('new user ' + user_id);
        server.post('/token', { user_id: user_id, asset_id: asset_id }, function (token) {
            var newPlaybackPosition = 1;
            setInterval(function () {
                ++newPlaybackPosition;
                server.post('/store', { token: token, playbackPosition: newPlaybackPosition }, function () {});
            }, 1000);

            setInterval(function () {
                server.get('/load/' + user_id + '/' + asset_id, function (oldPlaybackPosition) {
                    console.log('load ' + user_id + ': ' + oldPlaybackPosition);
                });
            }, 10000);
        });
    }, 2200);
};
