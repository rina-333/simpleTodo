const { User } = require ( '../models' )
const { decode } = require ( '../helpers/bcryptjs' )
const { sign } = require ( '../helpers/jwt' )

class userController {
  static register ( req, res, next ) {
    const { username, email, password } = req.body
    User.create ( {
      username,
      email,
      password
    } )
    .then ( ( User ) => {
      res.status ( 201 ).json ( { id: User.id, username: User.username, email: User.email, password: User.password } )
    } )
    .catch ( ( err ) => {
      next ( err ) 
    } )
  }

  static login ( req, res, next ) {
    const { email, password } = req.body
    User.findOne ( {
      where: {
        email
      }
    } )
    .then ( ( foundUser ) => {
      if ( foundUser ) {
        const comparePassword = decode ( password, foundUser.password )
        if ( comparePassword ) {
          const access_token = sign ( {
            id: foundUser.id,
            email: foundUser.email
          } )
          res.status ( 200 ).json ( { id: foundUser.id, email: foundUser.email, access_token } )
        } else {
          throw { status: 400, message: 'Wrong Email or Password' }
        }
      }
    } )
    .catch ( ( err ) => {
      next ( err )
    } )
  }

}

module.exports = userController