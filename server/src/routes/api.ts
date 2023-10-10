const express = require('express')
const router = express.Router()
import { startingProducts } from './products';
import { query, param, validationResult, matchedData, checkSchema } from 'express-validator';

let products = startingProducts;

// middleware that is specific to this router
router.use((_req: any, _res: any, next: () => void) => {
    console.log('Time: ', Date.now())
    next()
})

router.get('/products',
    query('scrumMasterName').optional().notEmpty().isString().escape(),
    query('developer').optional().notEmpty().isString().escape(),
    (req: any, res: any) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.send(JSON.stringify({ errors: errors.array() }));
        }
        const queryParams = matchedData(req);
        let result = products;
        if (queryParams.scrumMasterName) {
            result = result.filter((prod) => prod.scrumMasterName == queryParams.scrumMasterName);
        }
        if (queryParams.developer) {
            result = result.filter((prod) => prod.Developers.includes(queryParams.developer));
        }
        res.send(JSON.stringify(result));
    })

router.get('/product/:productId',
    param('productId').isNumeric(),
    (req: any, res: any) => {
        const result = validationResult(req);
        if (!result.isEmpty()) {
            return res.status(400).send(JSON.stringify({ errors: result.array() }));
        }
        const productId = req.params.productId;
        const prod = products.find((product) => product.productId == productId)
        if (!prod) {
            return res.status(404).send(`product with ${productId} not found`);
        }
        return res.send(prod);
    })

router.post('/product', (_req: any, res: { send: (arg0: string) => void }) => {
    res.send('Add product')
})

router.put('/product', (_req: any, res: { send: (arg0: string) => void }) => {
    res.send('Update product')
})

router.delete('/product/:productId',
    param('productId').isNumeric(),
    (req: any, res: any) => {
        const result = validationResult(req);
        if (!result.isEmpty()) {
            return res.status(400).send(JSON.stringify({ errors: result.array() }));
        }
        const productId = req.params.productId;
        const prod = products.find((product) => product.productId == productId);
        if (!prod) {
            return res.status(404).send(`product with ${productId} not found`);
        }
        products = products.filter((product) => product.productId != productId);
        return res.send(prod);
    })

router.get('/', (_req: any, res: { send: (arg0: string) => void }) => {
    res.send('Main api for products');
})

export = router
