const { readFileSync, readdir } = require('fs')
const languages = module.exports.languages = new Map()
class Language {
    static load() {
        readdir('./assets/languages/', (err, files) => {
            if (err) console.log(err)
            files.forEach(file => {
                languages.set(file.split('.')[0], JSON.parse(readFileSync(`./assets/languages/${file}`, "utf8")))
            })
        })
    }   
    static get(path, language = 'en_US') {
        function getKey(object, Language) {
            if (object.length > 0) {
                language = Language[object[0]]
                if (!language) return `A invalid key was supplied, report this to the official server. Key supplied: ${path}`
                return getKey(object.slice(1), language);
            }
            return language;
        }
        return getKey(path.split('.'), languages.get(language));
    }
}
module.exports = Language;