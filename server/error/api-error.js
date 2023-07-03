class ApiError extends Error{
    constructor(status, message) {
        super(message);
        this.status = status;
    }

    static badRequest(message){
        return new ApiError(404, message)
    }

    static internal(message){
        return new ApiError(500, message)
    }

    static forbidden(message){
        return new ApiError(403, message)
    }
    static badBody(){
        return new ApiError(400, 'Ошибка тела запроса')
    }
}
module.exports = ApiError