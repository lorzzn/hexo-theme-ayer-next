const fs = require('fs');

hexo.extend.helper.register('list_files', 
/**
 * 
 * @param {String} realpath 
 * @param {String} webpath 
 * @returns 
 */
function( realpath, webpath ) {
    return fs.readdirSync(realpath).map(i => { return webpath + i });
})