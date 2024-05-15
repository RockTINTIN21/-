const Person = require('./Person');
class Teacher extends Person{
    _cabinet
    _object
    constructor(name,lastName,age,object,cabinet) {
        super(name,lastName,age);
        this.object = object;
        this.cabinet = cabinet;
    }
    get cabinet(){
        return this._cabinet;
    }
    set cabinet(newCabinet){
        if(super.checkNumber(newCabinet)){
            throw new Error("Кабинет не должен иметь больше 5 цифр");
        }
        this._cabinet = newCabinet;
    }

    get object(){
        return this._object;
    }
    set object(newObject){
        if(super.checkString(newObject)){
            throw new Error("Предмет должен состоять только из букв и быть не больше 15 символов");
        }
        this._object = newObject;
    }


}

module.exports = Teacher