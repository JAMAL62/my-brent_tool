var fs = require('fs');
var path = require("path");
var http = require("http");
var jsonFile = 'brentconfig.json';

fs.readFile(jsonFile, 'utf8', function (err, jsonfile) {
    if (err) {
        console.log("error on the Json file!");
        return;
    }

    var strToJson = JSON.parse(jsonfile);
    var sourceFolder = strToJson.source;

    var destinationFolder = strToJson.destination;
    var bundleFileName = strToJson.bundleName + ".js";
    var bundleFilePath = path.join(destinationFolder, bundleFileName);

    var htmlFileNameToRead = 'index.html';
    var pathToCreateHtml = path.join(destinationFolder, htmlFileNameToRead);

    readSourceFolderFiles(sourceFolder, function (filedata) {
        createDistFolder(destinationFolder, bundleFilePath,pathToCreateHtml, function () {
            writeFile(bundleFilePath, filedata);
            readhtmlFile(htmlFileNameToRead,function (htmlData) {
                var generatedHtml = addScriptTagTohtml(htmlData,bundleFileName);
                writeFile(pathToCreateHtml,generatedHtml);


            });
        });
    });

    //createServer()




});


function readSourceFolderFiles(sourceFolder, cb) {
    var dataofallthefiles = "";
    fs.readdir(sourceFolder, 'utf8', function (err, files) {
        if (err) {

            console.log('error on fetching directoryFile!');
            return
        }


        for (var i = 0; i < files.length; i++) {

            var filePath = path.join(sourceFolder, files[i]);


            fs.readFile(filePath, 'utf8', function (err, filedata) {
                if (err) {

                    console.log('error on fetching SourceFile!');
                    return
                }

                dataofallthefiles += filedata + "\n";
                cb(dataofallthefiles);
            });
        }

    });
}

function createDistFolder(foldername, bundleFilePath,indexhtmlpath, cb) {
    if (fs.existsSync(bundleFilePath)) {
        fs.unlinkSync(bundleFilePath);
    }
    if (fs.existsSync(indexhtmlpath)) {
        fs.unlinkSync(indexhtmlpath);
    }
    if (fs.existsSync(foldername)) {
        fs.rmdirSync(foldername);
    }
    fs.mkdir(foldername, function (err) {
        if (err) {
            console.log('error in creating dist');
        } else {
            cb()
        }
    });

}

function writeFile(filepath, dataToWrite) {
    fs.writeFile(filepath, dataToWrite, function (err) {
        if (err) {
            console.log('The file has been saved!');
        }
    });
}


function readhtmlFile(htmlfilename, cb) {
    fs.readFile(htmlfilename, 'utf8', function (err, htmldata) {
        if (err) {
            console.log('error');
        }
        cb(htmldata)
    })
}


function addScriptTagTohtml(htmlstring, bundleFileName) {
    var appendScriptString = "<script src='" + bundleFileName + "'" + "></script>";
    var splitTheHtml = htmlstring.split('<body>').join('<body>' +'\n'+ appendScriptString)
    return splitTheHtml;
}



function createServer() {
    const s = http.createServer(function (req,res) {
        res.statusCode = 200;
        res.setHeader('Content-Type', 'text/plain');
        res.end('Hello World!\n')
    });

    s.listen(9090,"localhost",function () {
        console.log("server running")
    })

}