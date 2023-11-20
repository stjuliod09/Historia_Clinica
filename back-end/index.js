var app = require("./server");
const dotenv = require("dotenv");

dotenv.config();
const port = process.env.PORT_APP || 80;
app.listen(port, () => console.log("Servidor escuchando en el puerto " + port));
