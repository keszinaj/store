const { validationResult } = require('express-validator');
import {getProductById, saveProduct} from "../dbUtils/dbQueries";

async function _editProduct(data) {
    const product = await getProductById(data.productID);

    if (product === null) {
        console.error(`In editProduct(). Can't find product with id=${data.process}`);
        return;
    }

    product.name = data.name;
    product.price = parseFloat(data.price);
    product.details = data.details;
    product.cpu = data.cpu;
    product.memory = data.memory;
    product.graphics = data.graphics;

    await saveProduct(product);
  }

export async function editProduct(req, res) {
    const errors = validationResult(req);
    if (errors.isEmpty()) {
      await _editProduct(req.body);
    }
    res.status(201).json({ errors: errors.array() });
  
  }