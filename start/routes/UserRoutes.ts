import Route from '@ioc:Adonis/Core/Route'

Route.group(()=>{
    Route.get('/index','UsersController.index')
}).prefix('/api/user')