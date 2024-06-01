import express from "express"

const app = express();
const PORT = process.env.PORT || 3000;

app.get("/", (req, res)=> {
    res.send("Blog server is running...")    
})

app.listen(PORT, () => {
    console.log(`Blog server running on port ${PORT}`)
})