/*

const Pokemon = require('./pokemon.js');
const pikachu = new Pokemon({ 
    birthdate: new Date(),
    nickname: 'Pikachu' 
});
const raichu = new Pokemon({ 
    birthdate: new Date(), 
    nickname: 'Raichu' 
});
const charlizard = new Pokemon({
    birthdate: new Date(),
    nickname: 'Charlizard',
    traits: [{traitType: 'nature', traitValue: 'fire'}]})


setTimeout(() => {
    const charmendar = new Pokemon();
    console.log('charmendar', charmendar);

},3000);


console.log('pikachu', pikachu);
console.log('raichu', raichu);
console.log('charlizard', charlizard); 

*/

/*


const Generation = require('./generation.js');

const generation = new Generation();

console.log('generation',generation);

const pikachu =generation.newDragon();

console.log('pikachu', pikachu);

setTimeout(() => {
    const raichu = generation.newDragon();
    console.log('raichu',raichu);

}, 4999);


*/

/*

const GenerationEngine = require('./engine.js');
const engine = new GenerationEngine();
engine.start();

setTimeout(() => {
    engine.stop();
}, 20000);


*/

const express = require('express');
const cors = require('cors'); //const cors is a fn
const pokeRouter = require('./api/pokemon.js');
const genRouter = require('./api/generation.js');
const accRouter = require('./api/account.js');
const GenerationEngine = require('./generation/engine.js');
const cookieParser = require('cookie-parser');
const engine = new GenerationEngine();
const app = express();
const bodyParser = require('body-parser');


app.locals.engine = engine;
app.use(cors({origin: 'http://localhost:1234', credentials: true}));
app.use(bodyParser.json());
app.use(cookieParser());

app.use('/account', accRouter);
app.use('/pokemon', pokeRouter);
app.use('/generation', genRouter);

app.use((err, req, res, next) => {
    const statusCode = err.statusCode || 500;
    res.status(statusCode).json({
        type: 'error', message: err.message
    });
})

engine.start();



module.exports = app;