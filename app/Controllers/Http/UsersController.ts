import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import User from 'App/Models/User'

export default class UsersController {
    
    //funcion para mostrar a todos los usuarios registrados
    public async index ({response}: HttpContextContract){
        const users = await User.all()

        return response.status(200).json({
            status:'success',
            message:'Users retrieved successfully',
            title:'List of users',
            users:users
        })
    }
}
