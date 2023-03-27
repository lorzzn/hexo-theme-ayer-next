const URL = require("url");

// 自定义helper函数
hexo.extend.helper.register('web_src', 
/**
 * 
 * @param {String} path 
 * @param {String} type 
 * @returns 
 */
function(path, type) {
    let protocol, host, port;
    // 是否使用cdn
    if (this.theme.web_src.cdn.enable) {
        protocol = this.theme.web_src.cdn.protocol;
        host = this.theme.web_src.cdn.url;
    }
    // 判断是否为本地服务器模式
    if (this.config.local_server.enable) {
        protocol = this.config.server.protocol;
        host = this.config.server.ip;
        port = this.config.server.port;
    }
    if (!path.startsWith('/')) path = '/' + path;
    let url = URL.format({ protocol: protocol, hostname: host, port: port, pathname: path }) 
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
