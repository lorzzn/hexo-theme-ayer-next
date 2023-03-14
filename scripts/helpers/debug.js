
hexo.extend.helper.register('debug',
function (action, args = {}) {
    if (!this.config.debug) return;
    const actions = {
        "console": e => {
            console.log(e)
        }
    }
    actions[action](args);
})
