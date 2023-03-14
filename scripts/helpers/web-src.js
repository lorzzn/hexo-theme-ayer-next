const fs = require("fs");

// 自定义helper函数
hexo.extend.helper.register('web_src', 
/**
 * 
 * @param {String} path 
 * @param {String} type 
 * @returns 
 */
function(path, type) {
    let url = 1 // this.config.iscn 
                ? this.config.url + "/" + path 
                : "https://gcore.jsdelivr.net/gh/ppengryuu/ppengryuu.github.io/" + path;
    if ( fs.existsSync("devmode") ) { url = "http://localhost:4000/" + path };
    switch (type) {
        case "js":
            url = url.endsWith(".js")?url:url+".js";
            return `<script src="${url}"></script>`;
        case "css":
            url = url.endsWith(".css")?url:url+".css";
            return `<link rel="stylesheet" href="${url}">`;
    }
    return url;
});