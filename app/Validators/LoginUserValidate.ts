import { schema } from '@ioc:Adonis/Core/Validator';

export default class LoginValidator {
    public schema = schema.create({
        email: schema.string({},[
        ]),
        password: schema.string({},[
        ])
    })
    public messages = {
        'email.required': 'Please enter your email',
        'password.required': 'Please enter your password'
    }
}