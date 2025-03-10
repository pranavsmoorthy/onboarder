const express = require("express");
const cors = require("cors");
const https = require('https')
const jwt = require('jsonwebtoken');
const cookieParser = require('cookie-parser');
const connectDb = require("./config/dbConnection");
const errorHandler = require("./middleware/errorHandler");
const swaggerUi = require('swagger-ui-express');
const swaggerSpecJson = require("./swagger-spec.json");
const dotenv = require("dotenv").config();
const helmet = require("helmet");
const fs = require("fs");
const path = require("path");

const verifyJWTProtected = (req, res, next) => {
    return verifyJWTToken(req, res, next, false);
};

const verifyJWTAdmin = (req, res, next) => {
    return verifyJWTToken(req, res, next, true);
};

const verifyJWTToken = (req, res, next, requiresAdminClearance) => {
    const token = req.headers.authorization || req.cookies.token;
    if (!token) {
        return res.status(401).json({
            code: 'Unauthorized',
            message: 'Unauthorized'
        });
    }

    try {
        const decoded = jwt.verify(token, 'shanthanav');

        if (requiresAdminClearance && decoded.role != "Admin") {
            return res.status(401).json({
                code: 'Unauthorized',
                message: 'Unauthorized'
            });
        }

        req.headers.id = decoded.userId;
        next();
    } catch (err) {
        console.log(err);
        return res.status(401).json({
            code: 'Unauthorized',
            message: 'Unauthorized'
        });
    }
};

connectDb();
const app = express();
app.use(cors());
app.use(cookieParser());
// Serve static files from the 'public' directory
app.use(express.static('public'));

app.use(
    helmet({
        crossOriginOpenerPolicy: false,
        crossOriginResourcePolicy: false
    })
);

// Define a route for the home page
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpecJson));
const port = process.env.port || 5000;

app.use(express.json());
app.use('/api/protected', verifyJWTProtected);
app.use('/api/admin', verifyJWTAdmin);
app.use("/api/protected/users", require("./routes/protected/userRoutesProtected"));
app.use("/api/admin/users", require("./routes/admin/userRoutesAdmin"));
app.use("/api/admin/courses", require("./routes/admin/courseRoutes"));
app.use("/api/admin/enroll", require("./routes/admin/enrollRoutesAdmin"));
app.use("/api/protected/enroll", require("./routes/protected/enrollRoutesProtected"));
app.use("/api/public/auth", require("./routes/public/authRoutes"));
app.use("/api/public/users", require("./routes/public/userRoutesPublic"));
app.use("/api/public/otp", require("./routes/public/otpRoutes"));
app.use(errorHandler);

https.createServer({
    key: fs.readFileSync(path.join(__dirname, "cert", 'server.key')),
    cert: fs.readFileSync(path.join(__dirname, "cert", 'server.crt'))
}, app).listen(port, () => {
    console.log(`server running: port ${port}`);
})