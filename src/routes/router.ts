import fs from 'fs';
import { join } from 'path';
import { Router } from 'express';

// Import all the routes, all the routes are in the same folder, or in folders, if is a folder, check the folder if have more folders inside, if have, check another folder, if have, check another folder, etc...
//All the routes have the extension .routes.js
//The route path is the name of the folders with the file name without the extension

const readRoutes = (path: string): Array<{ [x: string]: any; }> => {
    const files = fs.readdirSync(path);
    const routes = files.map(file => {
        //Check if have the extension .routes.ts
        if (file.indexOf('.routes.ts') > -1) {
            //Remove the extension .routes.ts
            const routeName = file.replace('.routes.ts', '');
            //Import the route
            const route = require(join(path, file));
            //Return the route with the name of the file
            return {
                router: route.default
            }
        }

        //Check if is a folder
        if (fs.lstatSync(join(path, file)).isDirectory()) {
            //Read the folder
            return readRoutes(join(path, file));
        }

        //Return nothing
        return {};
    });

    //Check if any route is a {} with nothing
    const routesWithoutEmpty = routes.filter(route => Object.keys(route).length > 0);
    //Return the routes without empty
    return routesWithoutEmpty;
}

const routes = readRoutes(__dirname);


export default routes;