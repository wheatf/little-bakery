module.exports = {
    welcome: async function(req, res) {
        res.render('welcome');
    },

    test: async function(req, res) {
        res.render('test')
    }
}