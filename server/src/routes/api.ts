const express = require('express')
const router = express.Router()

// middleware that is specific to this router
router.use((_req: any, _res: any, next: () => void) => {
    console.log('Time: ', Date.now())
    next()
})

router.get('/products', (_req: any, res: { send: (arg0: string) => void }) => {
    res.send('List of products')
})

router.get('/product', (_req: any, res: { send: (arg0: string) => void }) => {
    res.send('Get individual product')
})

router.post('/product', (_req: any, res: { send: (arg0: string) => void }) => {
    res.send('Add product')
})

router.put('/product', (_req: any, res: { send: (arg0: string) => void }) => {
    res.send('Update product')
})

router.delete('/product', (_req: any, res: { send: (arg0: string) => void }) => {
    res.send('Delete product')
})

router.get('/', (_req: any, res: { send: (arg0: string) => void }) => {
    res.send('Main api for products');
})

export = router
