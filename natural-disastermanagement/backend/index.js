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

// Base allowed origins
const defaultOrigins = [
  'http://localhost:3000', 
  'http://127.0.0.1:3000', 
  'https://resqnetdcms.netlify.app'
];

// Add FRONTEND_URL if it exists in the environment variables
const allowedOrigins = process.env.FRONTEND_URL 
  ? [...defaultOrigins, ...process.env.FRONTEND_URL.split(',').map(url => url.trim())]
  : defaultOrigins;


app.use(cors({
  origin: function (origin, callback) {
    // allow requests with no origin (like mobile apps or curl requests)
    if (!origin) return callback(null, true);
    
    // Check if the exact origin is in the list, or if the list contains '*' (wildcard)
    if (allowedOrigins.indexOf(origin) !== -1 || allowedOrigins.includes('*')) {
      callback(null, true);
    } else {
      console.log(`Blocked by CORS: ${origin}`); // Better debugging in Render logs
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