const express = require('express')
const cors = require('cors') // cross domain access

class Server {

    constructor() {
        this.app = express();
        this.port = process.env.PORT;

        this.middlewares();

        this.routes();
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
    }

    start() {
        this.app.listen(this.port = 3000, () => {
            console.log(`Running on ${this.port}`);
        })
    }
}

module.exports = Server;