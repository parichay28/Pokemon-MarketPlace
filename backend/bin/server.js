const app = require('../app/index.js');
const portno = 3000;

app.listen(portno, () => {
    console.log(`listening on port no ${portno}`)
});