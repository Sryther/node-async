var async = require('./async.js');
/*
 * We suppose the routing allow a GET route with 2 parameters :
 * firstFilename and secondFilename
 * And we suppose that filenames are 2 files which contain html
 */
var concatFile = function(req, res) {
    var firstFilename = req.params.firstFilename;
    var secondFilename = req.params.secondFilename;
    var files = [
        '/' + firstFilename +'.html',
        '/' + secondFilename +'.html'
    ];

    var output = [];

    async.each(files, function(file, next) {
        fs.readFile(__dirname + file, 'utf8', function(err, data) {
            output.push(data);
            next(err);
        });
    }, function(err) {
        if(err) {
            throw err;
        } else {
            res.send(output);
        }
    });
}
