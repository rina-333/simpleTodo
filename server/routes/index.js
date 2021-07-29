const router = require ( 'express' ).Router()
const todoController = require ( '../controllers/todoController' )
const userController = require ( '../controllers/userController' )
const authentication = require ( '../middlewares/authentication' )
const authorization = require ( '../middlewares/authorization' )

// router.get ( '/',  )
router.post ( '/register', userController.register )
router.post ( '/login', userController.login )

router.use ( authentication )
router.post ( '/todos', todoController.create )
router.get ( '/todos', todoController.getAll )

router.use ( '/todos/:id', authorization )
router.get ( '/todos/:id', todoController.findOne )
router.put ( '/todos/:id', todoController.update )
router.patch ( '/todos/:id', todoController.modify )
router.delete ( '/todos/:id', todoController.destroy )

module.exports = router