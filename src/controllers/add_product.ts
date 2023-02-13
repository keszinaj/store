const { validationResult } = require('express-validator');
import { generateProductID, pushNewProduct } from "../models/repo_demo";

function addProduct(data) {
  const Name = data.name;
  const Price = parseFloat(data.price);
  const Details = data.details;
  const CPU = data.cpu;
  const Memory = data.memory;
  const Graphics = data.graphics;
  const Number_available = 0;
  const Photo_Path = "/";
  const id = generateProductID();
  const product = {
    ID: id,
    Name: Name,
    Price: Price,
    Details: Details,
    CPU: CPU,
    Memory: Memory,
    Graphics: Graphics,
    Number_available: Number_available,
    Photo_Path: Photo_Path
  };
  pushNewProduct(product);
}

export async function addNewProduct(req, res) {
  const errors = validationResult(req);
  if (errors.isEmpty()) {
    await addProduct(req.body);
  }
  res.status(201).json({ errors: errors.array() });

}
