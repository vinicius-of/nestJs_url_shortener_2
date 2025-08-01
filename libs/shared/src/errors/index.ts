export enum AuthErrorMessages {
    WrongCredentials = 'The credentials was wrong',
    ServiceError = 'Something wrong occurred with service call',
    LoginAlreadyExists = 'This login already exists',
    LoginNotCreated = 'This login could not be created',
    LoginNotFound = 'This login could not be found',
    ServiceNotResponding = 'This service is not responding.',
}

export enum UrlErrorMessages {
    UrlNotFound = 'This short URL could not be found',
    UrlNotCreated = 'This URL could not be created',
    ClickNotCounted = 'This link could not register the click to save into user',
    ServiceNotResponding = 'This service is not responding.',
}

export enum UserErrorMessages {
    UserNotFound = 'The user could not be found',
    InternalServerError = 'Occurred some error in the service',
    UserAlreadyExists = 'This user already exists',
}
