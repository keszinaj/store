import {Product} from "../models/product.model";
import {saveProduct} from "../dbUtils/dbQueries";

const { validationResult } = require('express-validator');

async function addProduct(data) {
  const product = Product.build({
    id: data.productID,
    name: data.name,
    price: parseFloat(data.price),
    details: data.details,
    cpu: data.cpu,
    memory: data.memory,
    graphics: data.graphics,
    amountAvailable: 0,
    photoPath: data.file.split('\\')[2];,
  });

  await saveProduct(product);
}

export async function addNewProduct(req, res) {
  const errors = validationResult(req);
  if (errors.isEmpty()) {
    await addProduct(req.body);
  }
  res.status(201).json({ errors: errors.array() });

}
