import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import { schema, rules } from '@ioc:Adonis/Core/Validator';
import User from 'App/Models/User'

export default class AuthController {

    public async register({response, request}:HttpContextContract){
        const validation = schema.create({
            name: schema.string({},[
                rules.required(),
                rules.regex(/^[a-zA-Z]+$/),
                rules.maxLength(50)
            ]),
            lastname: schema.string({},[
                rules.regex(/^[a-zA-Z]+$/),
                rules.required(),
                rules.maxLength(50)
            ]),
            username: schema.string({},[
                rules.required(),
                rules.regex(/^[a-zA-Z0-9_]+$/),
                rules.maxLength(30),
                rules.unique({table: 'users', column:'username'})
            ]),
            email: schema.string({},[
                rules.required(),
                rules.email(),
                rules.unique({table:'users', column:'email'})
            ]),
            password: schema.string({},[
                rules.required(),
                rules.minLength(8)
            ]),
            confirmPasswd: schema.string({},[
                rules.required(),
                rules.confirmed('password')
            ])
        })
        const messages = {
            'name.required':'No puedes dejar el nombre vacio',
            'name.regex':'Solo letras en el nombre',
            'name.maxLength':'Excediste el limite de caracteres',
            'lastname.required':'No puedes dejar el apellido vacio',
            'lastname.regex':'Solo letras en el apellido',
            'lastname.maxLength':'Excediste el limite de caracteres',
            'username.required':'No puedes dejar el apellido vacio',
            'username.regex':'Solo letras, numero y guion bajo en el username',
            'username.maxLength':'Excediste el limite de caracteres',
            'username.unique':'Nombre de usuario ya existente',
            'email.required':'No puede dejar el email vacio',
            'email.email':'No cumple con el formato email',
            'email.unique':'Email ya existente',
            'password.required':'No puedes dejar la contraseña vacia',
            'password.minLength':'La contraseña debe tener al menos 8 caracteres',
            'confirmPasswd.required':'Vuelve a escribir la contraseña',
            'confirmPasswd.confirmed':'Las contraseñas no coinciden'
        }
        const rule = await request.validate({schema: validation, messages:messages})

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
        const validation = schema.create({
            email: schema.string({},[
                rules.required(),
            ]),
            password: schema.string({},[
                rules.required()
            ])
        })
        const messages = {
            'email.required': 'Por favor, ingresa tu email o nombre de usuario',
            'email.email': 'El formato del email no es válido',
            'password.required': 'Por favor, ingresa tu contraseña'
        }

        await request.validate({schema:validation, messages:messages})
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
