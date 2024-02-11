// const fs = require('fs');

// fs.writeFile('message2.txt', "My name is Kojo", (err) => {
//     if (err) throw err;
//     console.log('Message written successfully')
// });

const fs = require('fs');

fs.readFile('message2.txt', "utf8", (err, data) => {
    if (err) throw err;
    console.log(data)
});