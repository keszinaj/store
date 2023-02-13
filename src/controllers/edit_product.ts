const { validationResult } = require('express-validator');
import { editProduct as editProductInDb, getProductbyID } from "../models/repo_demo";

function _editProduct(data) {
  const fs = require('fs');
  const Name = data.name;
  const Price = parseFloat(data.price);
  const Details = data.details;
  const CPU = data.cpu;
  const Memory = data.memory;
  const Graphics = data.graphics;
  const Number_available = 0;
  let Photo_Path = data.file ? data.file.split('\\')[2] : null;
  const productID = data.productID;
  const product = getProductbyID(productID);
  if (product && Photo_Path) {
    Photo_Path = data.file.split('\\')[2];
    fs.unlink("./src/public/laptop_img/" + product.Photo_Path, (err) => {
      if (err) {
        console.error(err)
        return
      }
    }
    )
  } else if (product){
    Photo_Path = product.Photo_Path;
  }
  const newProduct = {
    ID: productID,
    Name: Name,
    Price: Price,
    Details: Details,
    CPU: CPU,
    Memory: Memory,
    Graphics: Graphics,
    Number_available: Number_available,
    Photo_Path: Photo_Path
  };
  editProductInDb(newProduct);
}

export async function editProduct(req, res) {
  const errors = validationResult(req);
  if (errors.isEmpty()) {
    await _editProduct(req.body);
  }
  res.status(201).json({ errors: errors.array() });

}