const fs = require('fs')

const path = require('path')

let types = {
       media: ["mp4", "mkv", "mp3"],
       archives: ["zip", "7z", "rar", "tar", "gz", "ar", "iso", "xz"],
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

function Organizefn(dirpathh)  // dirpathh is just name of the parameter
{
    let destpath;
    if (dirpathh == undefined) {
        console.log("Please enter valid directory path");   // checks if dirpath is passed or not
        return;
    }
    else {
        let doesExist = fs.existsSync(dirpathh)
        // console.log(doesExist)
        // checks if dirpath exists or not
        if (doesExist == true) {
            destpath = path.join(dirpathh, "organised_files");   // Create folder with organised_files name

            //C:\Users\USER\OneDrive\Desktop\NIKHIL\dev fjp3\file organiser project\test folder\organised_files:i want to create folder in this path

            if (fs.existsSync(destpath) == false) {
                fs.mkdirSync(destpath);   // creates if nd only if such folder not exists in the test folder
            }
            else
                console.log("This folder already exists");
        }
        else
            console.log("Enter valid path");

    }


    OrganiseHelper(dirpathh, destpath);
}



function OrganiseHelper(src, dest) {
    let childnames = fs.readdirSync(src)   //childnames are stored in form of array
    //  console.log(childnames)
    //Now in our test folder we may also have some child folders, which we will have to discard and read only files

    //for checking files and folders
    for (let i = 0; i < childnames.length; i++) {
        let childAddress = path.join(src, childnames[i])   //path is identified for files here
        let isFile = fs.lstatSync(childAddress).isFile();  // we check here to identify only the files
        // console.log(childAddress+" "+isFile);

        if (isFile == true) {
            let fileCategory = getCategory(childnames[i])  // calling getCatwgory function for each childs
            console.log(childnames[i] + "  belongs to  " + fileCategory)
            sendFiles(childAddress, dest, fileCategory)
        }
    }
}


function getCategory(name) {
    let ext = path.extname(name)
    ext = ext.slice(1)  // we will take out the extension names of the files 
    //console.log(ext)


    for (let type in types) {
        let cTypeArr = types[type]
        //console.log(cTypeArr)

        for (let i = 0; i < cTypeArr.length; i++) {
            if (ext == cTypeArr[i])
                // we matched the extensions with the values presnet in ctypeArr

                return type
        }
    }




    return 'others'


}

//Now we get that which files belong to which categorry , we will make foldr and copy those files, for that purpose we willl make another function


function sendFiles(srcFilePath, dest, fileCategory) {
    let catPath = path.join(dest, fileCategory)


    if (fs.existsSync(catPath) == false) { // checking for category folder path 
        fs.mkdirSync(catPath)
    }


    let fileName = path.basename(srcFilePath) /// we took out the names of the files
    let destFilePath = path.join(catPath, fileName) // here we created a path for the files in category folders


    fs.copyFileSync(srcFilePath, destFilePath) // copied files from src to dest

    fs.unlinkSync(srcFilePath) // deleted the files from src


    console.log(fileName + "is copied to" + fileCategory)
}



module.exports={        // exporting organise module
    organiseKey:Organizefn
}
