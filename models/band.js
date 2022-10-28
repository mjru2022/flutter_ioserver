const {v4:uuidV4}=require("uuid")



class Band{
    constructor(nombre){
        this.nombre=nombre;
        this.id=uuidV4();
        this.votes=0;

    }

}
module.exports=Band;