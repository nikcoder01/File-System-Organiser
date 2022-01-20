function helpfn() {

    /* USE OF BACKTICK `` USING THIS, WE CAN USE COMMANS LINES IN MULTIPLE LINES */
    console.log(`list of all commands :-
                 1)Tree Command: node fo.js tree<dir_name>
                 1)Organise Command: node fo.js organise<dir_name>
                 1)Help Command: node fo.js help`)
}



module.exports={    // exporting help module
    helpKey:helpfn
}