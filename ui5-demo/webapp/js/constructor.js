function Parent() {}

function CreatedConstructor() {}

CreatedConstructor.prototype = Object.create(Parent.prototype)
CreatedConstructor.prototype.constructor = CreatedConstructor // sets the correct constructor for future use

CreatedConstructor.prototype.create = function create() {
    console.log("test001");
    return new this.constructor()
}

new CreatedConstructor().create().create() // it's pretty fine