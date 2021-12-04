/**
 * @swagger
 * components:
 *  schemas:
 *    Product:
 *      type: object
 *      properties:
 *        id:
 *          type: integer
 *          description: The user ID.
 *          example: 0
 *        name:
 *          type: string
 *          description: The user's name.
 *          example: Leanne Graham
 */

const { Router } = require('express')
const productController = require('../controllers/productController')

const router = Router();

/**
 * @swagger
 * /product/create:
 *  get:
 *    tags: ['product']
 *    description: to create new product
 *    responses:
 *      '201':
 *        description: A successful response
 */
router.post('/product/create', productController.create_product)

/**
 * @swagger
 * /product/delete:
 *  post:
 *    tags: ['product']
 *    description: to delete a product
 *    parameters:
 *      - in: path
 *        name: id
 *        required: true
 *        description: id of product
 *        schema:
 *          type: string
 *    responses:
 *      '201':
 *        description: A successful response
 */
router.delete('/product/delete', productController.delete)

/**
 * @swagger
 * /products:
 *  get:
 *    tags: ['product']
 *    description: to get all product
 *    responses:
 *      201:
 *        description: A successful response
 *        content:
 *          application/json:
 *            schema:
 *              type: array
 *              items:
 *                $ref: '#/components/schemas/Product'          
 */
router.get('/products', productController.get_all_products)

/**
 * @swagger
 * /products/{:cate}/{:sub_cate}:
 *  get:
 *    tags: ['product']
 *    description: to get products by category & subcategory based
 *    responses:
 *      201:
 *        description: A successful response
 *        content:
 *          application/json:
 *            schema:
 *              type: array
 *              items:
 *                $ref: '#/components/schemas/Product'            
 */
router.get('/products/:cate/:sub_cate', productController.get_products_by_cate_subcate)

/**
 * @swagger
 * /product/{:id}:
 *  get:
 *    tags: ['product']
 *    description: to get product by id
 *    responses:
 *      201:
 *        description: A successful response
 *        content:
 *          application/json:
 *            schema:
 *              type: object
 *              $ref: '#/components/schemas/Product'           
 */
 router.get('/product/:id', productController.get_product_by_id)

module.exports = router;