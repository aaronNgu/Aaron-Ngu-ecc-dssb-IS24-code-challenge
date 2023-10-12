# Product Catalog

To begin setting up this app, you'll need to have docker compose installed locally
- [Docker Compose](https://docs.docker.com/compose/install/)

After you've cloned this project repo, run
``` docker-compose up --build ```

It'll take a few minutes to build, especially the frontend.

Endpoints are
Backend: http://localhost:3000/api
Frontend: http://localhost:3001

It's ready once you see the following lines on the console:

Web app ready
`client_1  | Compiled successfully!`
Server ready
`server_1  | Server is listening on port 3000`

Alternately, you can run 
`npm install` and `npm run start` inside the `client` or `server` directory.

## Endpoints
`GET - /api/products` - with param `{scrumMasterName: Name, developer: Name}`
example: `/products?scrumMasterName=Mariah+Carey&developer=Harry+Potter`

`GET - /api/product/:productId` - `productId` is an integer

`POST - /api/product` - body has the same schema as the Product schema provided
example: 
```
{
  "productId": 1,
  "productName": "t",
  "productOwnerName": "nasdas",
  "Developers": ["a"],
  "scrumMasterName": "string",
  "startDate": "2015-03-25T12:00:00-06:30",
  "methodology": "Agile",
  "location": "string"
}
```

`PUT - /api/product/:productId` - body can be any fields from the  Product schema provided
example: 
```
{
  
  "productOwnerName": "Nazri",
}
```

`DELETE - /api/product/:productId`
