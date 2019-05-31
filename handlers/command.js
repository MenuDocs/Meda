/* 
 * Copyright (C) DefyCentral, MenuDocs - All Rights Reserved
 * Written by MeLike2D <https://twitter.com/the2dperson> 
 */

module.exports = async client =>                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                 {
    require('glob')("./commands/**/*.js", (err, files) => {
        files.forEach(f => {
            let cmd = require(`../${f}`);
            if (!["music", "util", "moderation", "owner", "settings", "image"].includes(cmd.config.group.toLowerCase())) return;
            client.commands.set(cmd.config.name, cmd);
            cmd.config.aliases.forEach(alias => client.aliases.set(alias, cmd));
        });
    });
};