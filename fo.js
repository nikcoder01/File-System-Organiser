/*   <------File System Organiser project------> */
// We will be creating a File System Organizer//
//Features of the Project -
//If you have numerous Files in a folder and they are not Properly arranged
//So you can use this tool to arrange them in specific directory according to their extension
// like text files will go into text File Folder .exe files will go into application folder and so on
// so at the end you will have a arranged set of files in specific folders


//JS me input array ke form me jata hai and that array is process.argv Array
const fs = require('fs');    // inputting fs module of Node
const path = require('path');   // inputing path module of node
const helpModule=require('./commands/help')    //User defined module for help
const organiseModule=require('./commands/organise')    //User defined module for Organise
const treeModule=require('./commands/tree')   //User defined module for tree


//This is the externally called object for getting category of the files to organise our folder
let types = {
    media: ["mp4", "mkv", "mp3"],
    archives: ["zip", "7z", "rar", "tar", "gz", "ar", "iso", "xz", "msi"],
    images: ["jpg", "jpeg", "png"],
    documents: [
        "docx",
        "doc",
        "pdf",
        "xlsx",
        "xls",
        "odt",
        "ods",
        "odp",
        "odg",
        "odf",
        "txt",
        "ps",
        "tex",
    ],
    app: ["exe", "dmg", "pkg", "deb"],
};


let inputArr = process.argv.slice(2)
let command = inputArr[0]// tree,organise,help


switch (command) {
    case 'tree':
        treeModule.treekey(inputArr[1])        // Calling treefn() function
        break;

    case 'organise':
        organiseModule.organiseKey(inputArr[1])    //  here calling organise and path of the test folder to Organisefn()  function
        break;

    case 'help':
        helpModule.helpKey()
        break;
    default:
        console.log('Enter Valid Input')
}





