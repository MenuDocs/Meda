/* 
 * Copyright (C) DefyCentral, MenuDocs - All Rights Reserved
 * Written by MeLike2D <https://twitter.com/the2dperson> 
 */

module.exports = async client => {
    require('glob')("./events/**/*.js", (err, files) => {
        if(err) return console.error(err)
        files.forEach(f => {
            let evt = require(`../${f}`);
            client.on(evt.name, evt.run.bind(null, client));
        });
    });
}