var { Sequelize } = require("sequelize");
var express = require("express");
const app = express();

var personRoute = require("./routes/person");

const port = 3000;

app.use(express.json());
app.use(express.static('public'));
app.use(express.urlencoded());
app.use(express.raw({limit: '10mb'}))

app.use("/people", personRoute);


const sequelize = new Sequelize('booksdb', 'root', 'root', {
    host: 'localhost',
    dialect: 'mysql',
    operatorsAliases: Sequelize.Op.Aliases
});

var Person = sequelize.import("./models/person");

(async function () {
    try {
        await sequelize.authenticate();
        // await Person.sync();
        app.listen(port, () => {
            console.log('server listening on port ', port);
        })
    } catch (error) {
        console.error('Unable to connect to the database:', error);
    }
})();