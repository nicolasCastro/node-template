const express = require('express')
const cors = require('cors'); // cross domain access
const { dbConnection } = require('../database/config');

class Server {

    constructor() {
        this.app = express();
        this.port = process.env.PORT;

        //DB connection
        this.connectDB();
        // middlewares definitions
        this.middlewares();
        // routes definitions
        this.routes();
    }

    async connectDB() {
        await dbConnection();
    }

    middlewares() {
        // Enable cross domain access
        this.app.use(cors());
        // Parse json incoming bodies
        this.app.use(express.json());
        // Provide static content - like webpages
        this.app.use(express.static('public'));
    }

    routes() {
        this.app.use('/api/users', require('../routes/users.routes'));
        this.app.use('/api/auth', require('../routes/auth.routes'));
    }

    start() {
        this.app.listen(this.port || 5000, () => {
            console.log(`Running on ${this.port}`);
        })
    }
}

module.exports = Server;