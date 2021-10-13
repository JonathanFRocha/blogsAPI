require('dotenv').config();

const app = require('./src/config/customExpress');

const PORT = process.env.PORT || '3000';

app.listen(PORT, () => console.log(`listening to port ${PORT}!`));