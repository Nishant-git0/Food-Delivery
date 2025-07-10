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
import fs from 'fs'

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

// Debug route to check admin files
app.get('/debug-admin', (req, res) => {
    const adminPath = path.join(__dirname, '../admin/dist')
    
    try {
        const files = fs.readdirSync(adminPath)
        res.json({
            adminPath: adminPath,
            files: files,
            indexExists: fs.existsSync(path.join(adminPath, 'index.html'))
        })
    } catch (error) {
        res.json({ error: error.message })
    }
})

// Test route
app.get('/admin-test', (req, res) => {
    res.send('Admin route is working!')
})

// Serve admin panel at /admin-panel
app.use('/admin-panel', express.static(path.join(__dirname, '../admin/dist')))

// Direct admin routes
app.get('/admin', (req, res) => {
    res.sendFile(path.join(__dirname, '../admin/dist/index.html'))
})

app.get('/admin-panel', (req, res) => {
    res.sendFile(path.join(__dirname, '../admin/dist/index.html'))
})

// Handle admin sub-routes
app.get('/admin-panel/*', (req, res) => {
    res.sendFile(path.join(__dirname, '../admin/dist/index.html'))
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
