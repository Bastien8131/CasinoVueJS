class Admin {
    constructor(){
        this._id = 0;
        this._pseudo = "";
        this._email = "";
    }

    get id() {
        return this._id;
    }

    set id(value) {
        this._id = value;
    }

    get pseudo() {
        return this._pseudo;
    }

    set pseudo(value) {
        this._pseudo = value;
    }

    get email() {
        return this._email;
    }

    set email(value) {
        this._email = value;
    }

    toString(){
        return `Admin: ${this._id} ${this._pseudo} ${this._email}`;
    }
}