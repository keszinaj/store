const { validationResult } = require('express-validator');
import {getProductById, saveProduct} from "../dbUtils/dbQueries";

async function _editProduct(data) {
    const fs = require('fs');

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

    let photoPath = data.file ? data.file.split('\\')[2] : null;
    if (photoPath) {
        fs.unlink("./src/public/laptop_img/" + product.photoPath, (err) => {
            if (err) {
                console.error(err);
                return;
            }
        }
    } else {
        photoPath = product.photoPath;
    }
    product.photoPath = photoPath;

    await saveProduct(product);
  }

export async function editProduct(req, res) {
    const errors = validationResult(req);
    if (errors.isEmpty()) {
      await _editProduct(req.body);
    }
    res.status(201).json({ errors: errors.array() });
  
  }