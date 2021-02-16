# api calls:

api/v1/guitarists  returns all guitarists

# parameters that you can apply individually or combine them together

name:string     localhost:3002/api/v1/guitarists?name=someName

strings:number  localhost:3002/api/v1/guitarists?strings=6

guitars:string  localhost:3002/api/v1/guitarists?guitars=guitarName

combining example localhost:3002/api/v1/guitarists?guitars=guitarName&strings=6