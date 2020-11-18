const connection = require('./connection');


function testingConnection() {
    connection
        .authenticate()
        .then(() => {
            console.log('-=-= CONNECTION TO THE DATABASE WAS SUCCESSFUL =-=-');
        }).catch((error) => {
            `Error (Database): ${error}`
        })
}

module.exports = testingConnection