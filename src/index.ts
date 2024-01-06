import { PrismaClient } from "@prisma/client";
import express, { Request, Response } from "express";
import createError from "http-errors"

const prisma = new PrismaClient()
const app = express()

app.use(express.json())


app.post('/user', async (req: Request, res: Response) => {
    const result = await prisma.user.create({
        data: { ...req.body }
    })
    res.json(result)
})

app.get('/user', async (req: Request, res: Response) => {
    const result = await prisma.user.findMany()
    res.json(result)
})

app.put('/user/:id', async (req: Request, res: Response) => {
    const { id } = req.params
    const result = await prisma.user.update({
        where: { id: Number(id) },
        data: {
            ...req.body
        }
    })
    res.json(result)
})
app.delete('/user/:id', async (req: Request, res: Response) => {
    const { id } = req.params
    const result = await prisma.user.delete({
        where: { id: Number(id) }
    })
    res.json(result)
})

app.get('/user/:username', async (req: Request, res: Response) => {
    const { username } = req.params
    const user = await prisma.user.findUnique({
        where: { username: String(username) }
    })
    res.json(user)
})





// handle 404 error
app.use((req: Request, res: Response, next: Function) => {
    next(createError(404))
})

app.listen(3000, () =>
    console.log(`⚡️[server]: Server is running at https://localhost:3000`)
)