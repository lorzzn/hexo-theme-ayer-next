
hexo.extend.helper.register('object_tools',
function (action, o = {}) {
    const actions = {
        "stringify": e => {
            return JSON.stringify(e);
        }
    }
    return actions[action](o);
})
