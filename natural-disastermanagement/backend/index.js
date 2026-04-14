require('dotenv').config();
const express=require('express');
const cors=require('cors');
const connectDB=require('./config/db');
const userRoutes=require('./routes/userRoutes');
const disasterRoutes=require('./routes/disasterRoute');
const contributionRoutes=require('./routes/contributionRoutes');
const rescueTeamRoutes=require('./routes/rescueTeamRoutes');
const chatRoutes=require('./routes/chatRoutes');
const path=require('path');
const app=express();

// Split by comma in case multiple origins are provided
const allowedOrigins = process.env.FRONTEND_URL 
  ? process.env.FRONTEND_URL.split(',') 
  : ['http://localhost:3000', 'http://127.0.0.1:3000', 'http://localhost:3001'];


app.use(cors({
  origin: function (origin, callback) {
    // allow requests with no origin (like mobile apps or curl requests)
    if (!origin) return callback(null, true);
    if (allowedOrigins.indexOf(origin) !== -1 || allowedOrigins.includes('*')) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
  credentials: true
}));

connectDB();
app.use(express.json());

// Serve uploaded files statically
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

app.use('/api/user',userRoutes);
app.use('/api/disaster',disasterRoutes);
app.use('/api/contribution',contributionRoutes);
app.use('/api/rescue-team',rescueTeamRoutes);
app.use('/api/chat', chatRoutes);

// Health check endpoint
app.get('/api/health', (req, res) => {
  res.status(200).json({ status: 'UP', timestamp: new Date() });
});

// Serve frontend in production
if (process.env.NODE_ENV === 'production') {
  app.use(express.static(path.join(__dirname, '../frontend/build')));
  
  app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, '../frontend', 'build', 'index.html'));
  });
}

app.listen(process.env.PORT || 5000,()=>{
    console.log(`server running on port ${process.env.PORT || 5000}`);
});