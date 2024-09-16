// for later use
const { models } = require("../database"); 

async function withAuth(email, res, allowClients=false) {
    const user = await models.User.findOne({ where: { email } });
    if (allowClients) {
        if (user.role != "admin" || "client") {
            return res.status(403).send({})
        }
    } else if (user.role != "admin") {
        return res.status(403).send({})
    }
}
