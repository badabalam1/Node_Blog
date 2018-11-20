exports.CORS = (req, res, next) => {
    res.header("Access-Control-Allow-Origin", "http://localhost:3000")
    res.header('Access-Control-Allow-Headers', 'X-Requested-With')
    return next()
}