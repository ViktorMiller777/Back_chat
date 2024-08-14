import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import UserValidator from 'App/Validators/CreateUserValidate';
import LoginValidator from 'App/Validators/LoginUserValidate';
import User from 'App/Models/User'

export default class AuthController {

    public async register({response, request}:HttpContextContract){
        const validation = new UserValidator
        const rule = await request.validate({schema: validation.schema, messages: validation.messages})

        const newUser = new User();
        newUser.name = rule.name;
        newUser.lastname = rule.lastname;
        newUser.username = rule.username;
        newUser.email = rule.email;
        newUser.password = rule.password;

        await newUser.save()

        return response.status(201).json({
            status:'success',
            message:'User created successfuly',
            title:'User created',
            newUser: newUser
        })
    }
    
    public async login({request, response, auth}){
        const validation = new LoginValidator()
        await request.validate({schema:validation.schema, messages:validation.messages})
        const {email, password} = request.only(['email','password'])

        const user = await User.query()
        .where('email', email)
        .orWhere('username', email)
        .first()

        if(!user){
            return response.status(404).json({
                status:'error',
                message:'Email or Password incorrect',
                title:'Authentication error'
            })
        }

        const token = await auth.attempt(user.email, password)

        return response.status(200).json({
            status:'success',
            message:'User logged',
            title:'User loged successfuly',
            user:user,
            token:token
        })
    }
}
