const bcrypt = require ( 'bcryptjs' )

function encode ( password ) {
  const salt = bcrypt.genSaltSync ( 8 ) //number of lucky :D
  return bcrypt.hashSync ( password, salt )
}

function decode ( password, hashedPassword ) {
  return bcrypt.compareSync ( password, hashedPassword )
}

module.exports = {
  encode,
  decode
}