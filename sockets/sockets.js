

const {io}=require("../index");
const Band = require("../models/band");
const Bands = require("../models/bands");

const bands=new Bands();
bands.addBand(new Band("Queen"));
bands.addBand(new Band("Bon jovin"));
bands.addBand(new Band("Heores del silencio"));
bands.addBand(new Band("Metalica"));
//mensajes de socket
io.on('connection', client => {
    console.log("cliente conectado");
    //cuando un cliente se conecta se le emiten todas las bandas que estan inicializadas
client.emit("active-bands",bands.getBands());
     client.on('disconnect', () => { console.log("cliente desconectado");
 });
     client.on("mensaje",(payload)=>{
         console.log("Mensaje",payload);
         io.emit("mensaje",{admin:"Nuevo mensaje"});
     });

 // client.on("emitir-mensaje",(payload) =>{
    //console.log(payload);
  // client.broadcast.emit("nuevo-mensaje",payload);
 //  })
   //client.on("vote-bands",(payload)=>{
    //console.log(payload);
   //})
client.on("vote-band",(payload)=>{
    bands.voteBand(payload.id);
    io.emit("active-bands",bands.getBands());
});
client.on('add-band', (payload) => {
    const newBand = new Band( payload.nombre );
    bands.addBand( newBand );
    io.emit('active-bands', bands.getBands() );
});
client.on("delete-band",(payload)=>{
    bands.deleteBand(payload.id);
    io.emit("active-bands",bands.getBands());
});
   });