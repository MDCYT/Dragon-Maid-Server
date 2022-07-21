import fs from 'fs';
import { join } from 'path';
import { Router } from 'express';

let routes: Array<{ route: Router }> = [];

const readRoutes = (path: string): Array<{}> => {
    const files = fs.readdirSync(path);
    const filesRoutes = files.map(file => {
        if (file.endsWith('.routes.ts') || file.endsWith('.routes.js')) {
            const route = require(join(path, file));
            routes.push({
                route: route.default
            })
        }
        if (fs.lstatSync(join(path, file)).isDirectory()) {
            return readRoutes(join(path, file));
        }
        return {};
    });
    return filesRoutes.filter(route => Object.keys(route).length > 0);
}

readRoutes(join(__dirname, './'));

export default routes;