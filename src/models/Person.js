class Person{
    _age;
    _name;
    _lastName;
    constructor(name,lastName,age) {
        this.name = name;
        this.lastName = lastName;
        this.age = age;
    }
    checkNumber(number){
        return isNaN(number) || number <=5;
    }
    checkString(str){
        return !/^[а-яА-Я]+$/.test(str) || str.length > 15;
    }
    get name(){
        return this._name;
    }
    set name(newName) {
        if (this.checkString(newName)) {
            throw new Error("Имя должно содержать только кириллицу и быть не больше 25 букв");
        }
        this._name = newName;
    }
    get lastName(){
        return this._lastName;
    }
    set lastName(newLastN){
        if(this.checkString(newLastN)){
            throw new Error("Отчество должно содержать только кириллицу и быть не больше 25 букв")
        }
        this._lastName = newLastN;
    }
    get age(){
        return this._age
    }
    set age(newAge){
        if(this.checkNumber(newAge) || newAge > 120){
            throw new Error("Возраст должен быть положительным числом и не больше 120" + newAge);
        }
        this._age = newAge;
    }

}
module.exports = Person