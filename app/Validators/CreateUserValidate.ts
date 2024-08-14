import { schema, rules } from '@ioc:Adonis/Core/Validator';

export default class UserValidator {
    public schema = schema.create({
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
    public messages = {
        'name.required':'Name is required',
        'name.regex':'Only letters in the name',
        'name.maxLength':'Maximum number of characters',
        //
        'lastname.required':'Lastname ir required',
        'lastname.regex':'Only letters in the lastname',
        'lastname.maxLength':'Maximum number of characters',
        //
        'username.required':'Username is required',
        'username.regex':'Only letters and number in the username',
        'username.maxLength':'Maximum number of characters',
        'username.unique':'Username already exist',
        //
        'email.required':'Email is required',
        'email.email':'Format email no valid',
        'email.unique':'Email already exist',
        //
        'password.required':'Password is required',
        'password.minLength':'Minimum 8 of characters',
        //
        'confirmPasswd.required':'Please write password again',
        'confirmPasswd.confirmed':'Passwords dont match'
    }
}