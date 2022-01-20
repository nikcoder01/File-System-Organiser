
const fs = require('fs');
const path = require('path');

function treefn(dirpathh) {
    let destpath;
    if (dirpathh == undefined) {
        console.log("Please enter valid directory path");   // checks if dirpath is passed or not
        return;
    }
    else {
        let doesExist = fs.existsSync(dirpathh)
        if (doesExist == true) {
            treeHelper(dirpathh, " ")
        }
    }
}

function treeHelper(targetPath, indent) {

    let isFile = fs.lstatSync(targetPath).isFile()
           // here we have checked wheter the targetPath is a file or a folder

    if (isFile == true) {
        let fileName = path.basename(targetPath)
        console.log(indent + "├──" + fileName)
                 // this will display the files

    }
    else {
        let dirName = path.basename(targetPath)
        console.log(indent + "└──" + dirName)
               // this will display the folders


        let children = fs.readdirSync(targetPath)
        // console.log(children)
         // here we took out all the children of test folder


        for (let i = 0; i < children.length; i++) {
            let childpath = path.join(targetPath, children[i])

            // console.log(childpath)
            treeHelper(childpath, indent + '\t')
              // using Recursion to repeat the process for all files and Folders

        }
    }
}

module.exports={     // exporting tree module
    treekey:treefn
}