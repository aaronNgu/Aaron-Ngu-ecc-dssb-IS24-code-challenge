const express = require('express')
const router = express.Router()
import { IProduct, startingProducts } from './products';
import { query, param, validationResult, matchedData, checkSchema } from 'express-validator';

let products = startingProducts;
let latestId = 39;

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

router.post('/product', async (req: any, res: any) => {
    await checkSchema({
        productName: { in: ['body'], notEmpty: { bail: true }, isString: { bail: true } },
        scrumMasterName: { in: ['body'], notEmpty: { bail: true }, isString: { bail: true } },
        productOwnerName: { in: ['body'], notEmpty: { bail: true }, isString: { bail: true } },
        Developers: { in: ['body'], isArray: { bail: true, options: { max: 5 } }, },
        startDate: { in: ['body'], isISO8601: { bail: true } },
        methodology: { in: ['body'], isIn: { options: [['Agile', 'Waterfall']], bail: true } },
        location: { in: ['body'], notEmpty: { bail: true }, isString: { bail: true } },
    }).run(req);
    const result = validationResult(req);
    if (!result.isEmpty()) {
        return res.status(400).send(JSON.stringify({ errors: result.array() }));
    }
    const data = matchedData(req) as IProduct;
    latestId += 1;
    const newProduct = { ...data, productId: latestId };
    products.push(newProduct)
    res.send(newProduct);
})

router.put('/product/:productId',
    async (req: any, res: any) => {
        await checkSchema({
            productId: { in: ['params'], isNumeric: { bail: true } },
            productName: { in: ['body'], optional: true, notEmpty: { bail: true }, isString: { bail: true } },
            scrumMasterName: { in: ['body'], optional: true, notEmpty: { bail: true }, isString: { bail: true } },
            productOwnerName: { in: ['body'], optional: true, notEmpty: { bail: true }, isString: { bail: true } },
            Developers: { in: ['body'], optional: true, isArray: { bail: true, options: { max: 5 } }, },
            startDate: { in: ['body'], optional: true, isISO8601: { bail: true } },
            methodology: { in: ['body'], optional: true, isIn: { options: [['Agile', 'Waterfall']], bail: true } },
            location: { in: ['body'], optional: true, notEmpty: { bail: true }, isString: { bail: true } },
        }).run(req);
        const result = validationResult(req);
        if (!result.isEmpty()) {
            return res.status(400).send(JSON.stringify({ errors: result.array() }));
        }
        const productId = req.params.productId;
        let prod = products.find((product) => product.productId == productId)
        if (!prod) {
            return res.status(404).send(`product with ${productId} not found`);
        }
        const data = matchedData(req) as IProduct;
        const updatedProd = { ...prod, ...data };
        products = products.map((prod) => { return prod.productId == productId ? updatedProd : prod });
        return res.send(updatedProd);
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
