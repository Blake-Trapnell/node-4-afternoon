module.exports = {
    check4Session: (req,res,next) => {
        const {session} = req
        !session.user ? (
            session.user = {username: '', cart: [], total: 0}
        )
        : (null)
        next()
    }
}