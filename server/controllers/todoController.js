const { Todo } = require("../models")

class todoController {
  static getAll ( req, res, next ) {
    Todo.findAll ({
      where: {
        UserId: req.loggedUser.id
      } 
    } )
      .then ( data => {
        res.status( 200 ).json( { data } )
      } )
      .catch ( err => {
        // res.status( 500 ).json ( { message: err.message } )
        next ( err )
      } )
  }

  static create ( req, res, next ) {
    const { title, description, status, due_date } = req.body
    Todo.create ( {
      title,
      description,
      status,
      due_date,
      UserId: req.loggedUser.id
    } )
    .then ( ( createTodo ) => {
      res.status ( 201 ).json ( { message: `Todo created`, todo: createTodo } )
    } )
    .catch ( ( err ) => {
      console.log ( err )
      // res.status ( 500 ).json ( { message: err.message } )
      next ( {
        status: 500,
        msg: "Internal Server Error"
      } )
    } )
  }

  static findOne ( req, res, next ) {
    Todo.findByPk ( +req.params.id )
      .then ( ( foundTodo ) => {
        if ( foundTodo ) {
          res.status ( 200 ).json ( { todo : foundTodo } )
        } else {
          throw { status: 404, message: "Todo is not Found" }
        }
      } )
      .catch ( ( err ) => {
        // res.status ( 500 ).json ( { message: err.message } )
        next ( err )
      } )
  }

  static update ( req, res, next ) {
    const { title, description, status, due_date } = req.body
    Todo.update ( {
      title,
      description,
      status,
      due_date
    }, {
      where: {
        id: +req.params.id
      },
      returning: true
    } )
      .then ( ( updatedTodo ) => {
        res.status ( 200 ).json ( { message: `Todo has been updated`, todo: updatedTodo[1][0] } )
      } )
      .catch ( ( err ) => {
        // res.status ( 500 ).json ( { message: err.message } )
        next ( err )
      } )
  }

  static modify ( req, res, next ) {
    const { status } = req.body
    Todo.update ( {
      status
    }, {
      where: {
        id: +req.params.id
      },
      returning: true
    } )
      .then ( ( modifiedTodo ) => {
        res.status ( 200 ).json ( { message: `Todo status has been modified`, todo: modifiedTodo[1][0] } )
      } )
      .catch ( ( err ) => {
        // res.status ( 500 ).json ( { message: err.message } )
        next ( err )
      } )
    
  }

  static destroy ( req, res, next ) {
    Todo.destroy ( {
      where: {
        id: +req.params.id
      }
    } )
      .then ( ( deletedTodo ) => {
        // console.log ( deletedTodo, "this is -------------------------------" )
        if ( deletedTodo ) {
          res.status ( 200 ).json ( { message: `Todo has been deleted` } )
        } else {
          throw { status: 400, message: `Failed to delete` }
        }
      } )
      .catch ( ( err ) => {
        // console.log ( err )
        // res.status ( 500 ).json ( { message: err.message } )
        next ( err )
      } )
  }

}

module.exports = todoController