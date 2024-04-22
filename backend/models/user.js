class User{
    constructor(id, socketId, pseudo, email, credit, score) {
        this._id = id;
        this._socketId = socketId;
        this._pseudo = pseudo;
        this._email = email;
        this._credit = credit;
        this._score = score;
    }

    get id() {
        return this._id;
    }

    set id(value) {
        this._id = value;
    }

    get socketId() {
        return this._socketId;
    }

    set socketId(value) {
        this._socketId = value;
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

    get credit() {
        return this._credit;
    }

    set credit(value) {
        this._credit = value;
    }

    get score() {
        return this._score;
    }

    set score(value) {
        this._score = value;
    }

    toString(){
        return `User: ${this._id} ${this._socketId} ${this._pseudo} ${this._email} ${this._credit} ${this._score}`;
    }
}

module.exports = User;