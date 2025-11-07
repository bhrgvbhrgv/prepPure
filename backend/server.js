//start server
require('dotenv').config();
const cors = require("cors");
const app = require('./src/app');
const connectDB = require('./src/db/db');
const serverless = require('serverless-http'); 
const PORT = process.env.PORT || 5000;

connectDB();


const allowedOrigins = ["https://prep-pure.vercel.app"];

const corsOptionss = {
  origin: function (origin, callback) {
    if (!origin || allowedOrigins.indexOf(origin) !== -1) {
      callback(null, true);
    } else {
      callback(new Error("Not allowed by CORS"));
    }
  },
  methods: "GET, POST, PUT, DELETE, HEAD",
  credentials: true,
  optionSuccessStatus: 200,
};

app.use((req, res, next) => {
  const origin = req.headers.origin;
  if (allowedOrigins.includes(origin)) {
    res.setHeader("Access-Control-Allow-Origin", origin);
  }
  next();
});

app.use(cors(corsOptionss));
app.get('/', (req, res) => {
    res.send('API is running...');
})
if (process.env.NODE_ENV !== 'production') {
  app.listen(PORT, () => {
    console.log(`Server running locally on http://localhost:${PORT}`);
  });
}

module.exports = app;
module.exports.handler = serverless(app);