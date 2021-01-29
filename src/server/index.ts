import initServer from './initServer';
import route from './route';

const app = initServer(route);

app.listen(5000,() => {
    console.log(`Listening on port ${5000}`)
});