const db = require("../models");
const HttpError = require("../http-errors");
const Product = db.products;
const User = db.users;
const fs = require("fs");
const path = require('path');

const createProduct = async (req, res, next) => {
  const { title, category, price, desc, featured } = req.body;
  let images = [];

  if (req.files) {
    let files = [...req.files];
    console.log(files);
    files.map((file) => {
      images.push(file.path);
    });
  }

  try {
    await Product.create({
      title: title,
      category: category,
      price: price,
      desc: desc,
      featured: featured,
      images: images.length !== 0 ? images.join(", ") : null,
      userId: req.userId,
    });
    res.status(201).json({ msg: "Hirdetés sikeresen hozzáadva!" });
  } catch (error) {
    console.log("valami baj van");
    res.status(500).json({ msg: error.message });
  }
};

const updateProduct = async (req, res) => {
  try {
    const product = await Product.findOne({
      where: {
        uuid: req.params.id,
      },
    });
    if (!product)
      return res.status(404).json({ msg: "A hiretes nem talalhato" });
    const { title, category, price, desc, deletedImages } = req.body;
    //elmentett kepek szelektalasa
    let delImages = deletedImages ? deletedImages.split(", ") : [];
    let images = product.images.split(', ');

    for (const el of delImages) {
        let fImages = images.filter((img) => el !== img);
        images = [...fImages];
    }
    
    
    if (req.files) {
        let files = [...req.files];
        files.map((file) => {
        images.push(file.path);
        });
    }

    let filteredImages = images.join(', ');
    
    if (req.userId !== product.userId)
      return res.status(403).json({ msg: "Jogosulatlan hozzaferes" });

    
    await Product.update(
      { title, category, price, desc, images: filteredImages },
      {
        where: {
          [db.Op.and]: [{ id: product.id }, { userId: req.userId }],
        },
      }
    );

    for (const imgPath of delImages) {
        fs.unlink(imgPath, err => {
            console.log(err);
        });
    }

    res.status(200).json({ msg: "Product updated successfuly" });
  } catch (error) {
    res.status(500).json({ msg: error.message });
  }
};

const getProducts = async (req, res, next) => {
  console.log("called get products");
  try {
    const response = await Product.findAll({
      attributes: ["uuid", "title", "category", "price", "desc", "images", 'featured'],
      include: [
        {
          model: User,
          attributes: ["username", "email"],
        },
      ],
      order: [['updatedAt', 'DESC']],
    });
    res.status(201).json(response);
  } catch (error) {
    res.status(500).json({ msg: error.message });
  }
};

const getProductsByUserId = async (req, res, next) => {
  console.log("called get products");
  try {
    const response = await Product.findAll({
      attributes: [
        "uuid",
        "title",
        "category", 
        "userId",
        "price",
        "desc",
        "images",
        "featured",
      ],
      where: {
        userId: req.userId,
      },
      include: [
        {
          model: User,
          attributes: ["username", "email"],
        },
      ],
    });
    res.status(200).json(response);
  } catch (error) {
    res.status(500).json({ msg: error.message });
  }
};

module.exports = {
  createProduct,
  updateProduct,
  getProducts,
  getProductsByUserId,
};
