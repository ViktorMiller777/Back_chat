import Route from '@ioc:Adonis/Core/Route'

Route.group(()=>{
    Route.post('/register','AuthController.register')
    Route.post('/login','AuthController.login')
}).prefix('/api/auth')