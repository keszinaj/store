const { validationResult } = require('express-validator');
import { editProduct as editProductInDb, getProductbyID } from "../models/repo_demo";

function _editProduct(data) {
    const Name = data.name;
    const Price = parseFloat(data.price);
    const Details = data.details;
    const CPU = data.cpu;
    const Memory = data.memory;
    const Graphics = data.graphics;
    const Number_available = 0;
    const Photo_Path = "/";
    const productID = data.productID;
    const product = {
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
    editProductInDb(product);
  }

export async function editProduct(req, res) {
    const errors = validationResult(req);
    if (errors.isEmpty()) {
      await _editProduct(req.body);
    }
    res.status(201).json({ errors: errors.array() });
  
  }