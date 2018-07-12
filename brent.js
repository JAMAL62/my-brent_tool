var fs = require('fs');
var path = require("path");
var jsonFile = 'brentconfig.json';

fs.readFile(jsonFile, 'utf8', function (err, jsonfile) {
    if (err) {
        console.log("error on the Json file!");
        return
    }

    var strToJson = JSON.parse(jsonfile);
    var sourceFolder = strToJson.source;
    var groupOfFiles=readSourceFolderFiles(sourceFolder,function (files) {
        console.log(files)
    });
   
   

});



function readSourceFolderFiles(sourceFolder,cb) {
    fs.readdir(sourceFolder, 'utf8', function (err, files) {
        if (err) {

            console.log('error on fetching directoryFile!');
            return
        }

        for (var i = 0; i < files.length; i++) {
            var filePath = path.join(sourceFolder, files[i])

            fs.readFile(filePath, 'utf8', function (err, collectionOfFiles) {
                if (err) {

                    console.log('error on fetching SourceFile!');
                    return
                }
                cb(collectionOfFiles)
            }); 
        }
    });
}
