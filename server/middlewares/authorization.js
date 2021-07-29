const { Todo } = require ( '../models' )

async function authorization ( req, res, next ) {
  try {
    const foundTodo = await Todo.findByPk ( +req.params.id )
    if ( foundTodo ) {
      if ( foundTodo.UserId === req.loggedUser.id ) {
        next ()
      } else {
        throw { status: 401, message: "You are not allowed to access" }
      }
    } else {
      throw { status: 404, message: "Todo is not found" }
    }
  } catch ( err ) {
    const status = err.status || 500
    const message = err.message || "Internal Server Error"
    res.status ( status ).json ( { message } )
  }
}

module.exports = authorization