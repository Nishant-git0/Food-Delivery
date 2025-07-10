import express from 'express'
import cors from 'cors'
import { connectDB } from './config/db.js'
import foodRouter from './routes/foodRoute.js'
import userRouter from './routes/userRoute.js'
import 'dotenv/config'
import cartRouter from './routes/cartRoute.js'
import orderRouter from './routes/orderRoute.js'
import path from 'path'
import { fileURLToPath } from 'url'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

//app config
const app = express()
const port = process.env.PORT || 4000

// middleware
app.use(express.json())
app.use(cors())

//db connection
connectDB()

// api endpoints
app.use("/api/food", foodRouter)
app.use("/images", express.static('uploads'))
app.use('/api/user', userRouter)
app.use('/api/cart', cartRouter)
app.use('/api/order', orderRouter)

// Test route
app.get('/test-admin', (req, res) => {
    res.sendFile(path.join(__dirname, '../admin/dist/index.html'))
})

// Add this route to test
app.get('/admin', (req, res) => {
    res.send(`
        <!DOCTYPE html>
        <html>
        <head>
            <title>Admin Test</title>
        </head>
        <body>
            <h1>Admin Route Works!</h1>
            <p>If you see this, the admin route is working.</p>
            <p>Admin files path: ${path.join(__dirname, '../admin/dist')}</p>
        </body>
        </html>
    `)
})

// Serve frontend static files
app.use(express.static(path.join(__dirname, '../frontend/dist')))

// Handle frontend routes (must be last)
app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, '../frontend/dist/index.html'))
})

app.listen(port, () => {
    console.log(`Server started on port ${port}`)
})
