
hexo.extend.helper.register('object_tools',
function (action, o = {}) {
    const actions = {
        "stringify": e => {
            return JSON.stringify(e);
        },
        "stringifytob64": e => {
            return Buffer.from(JSON.stringify(e)).toString('base64');
        }
    }
    return actions[action](o);
})
