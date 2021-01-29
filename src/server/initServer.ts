import path from 'path';
import express, { Router } from 'express';


export default function initServer(router: Router) {
    const app = express();

    app.use((request, response, next) => {
        response.header('Content-Security-Policy', "img-src 'self' *.githubusercontent.com")
           return next()
    })

    app.use(express.static(path.join(__dirname, '../../dist/')))
    app.use('/api', router)
    // app.get('*', (request, response) => {
    //     response.sendFile(path.join(__dirname, '../../dist/index.html'))
    // })

    return app;
}