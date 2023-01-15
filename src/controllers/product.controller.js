const db = require("../models");
const HttpError = require("../http-errors");
const Product = db.products;
const User = db.users;
const fs = require("fs");
const path = require("path");

const createProduct = async (req, res, next) => {
  const {
    title,
    category,
    subCategory,
    price,
    desc,
    featured,
    place,
    condition,
    madeYear,
  } = req.body;
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
      subCategory: subCategory,
      price: price,
      desc: desc,
      featured: featured,
      condition: condition,
      place: place,
      madeYear: madeYear || null,
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
    const {
      title,
      category,
      subCategory,
      price,
      desc,
      deletedImages,
      place,
      condition,
      madeYear,
    } = req.body;
    //elmentett kepek szelektalasa
    let delImages = deletedImages ? deletedImages.split(", ") : [];
    let images = product.images ? product.images.split(", ") : [];

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

    let filteredImages = images.join(", ");

    if (req.userId !== product.userId)
      return res.status(403).json({ msg: "Jogosulatlan hozzaferes" });

    await Product.update(
      {
        title,
        category,
        subCategory,
        price,
        desc,
        images: filteredImages,
        place,
        condition,
        madeYear,
      },
      {
        where: {
          [db.Op.and]: [{ id: product.id }, { userId: req.userId }],
        },
      }
    );

    for (const imgPath of delImages) {
      fs.unlink(imgPath, (err) => {
        console.log(err);
      });
    }

    res.status(200).json({ msg: "Product updated successfuly" });
  } catch (error) {
    res.status(500).json({ msg: error.message });
  }
};

const getProducts = async (req, res, next) => {
  try {
    const response = await Product.findAll({
      attributes: [
        "uuid",
        "title",
        "category",
        "subCategory",
        "price",
        "desc",
        "images",
        "featured",
        "place",
        "condition",
        "madeYear",
      ],
      include: [
        {
          model: User,
          as: 'user',
          attributes: ["name", "email", "telephone"],
        },
      ],
      order: [["updatedAt", "DESC"]],
    });
    res.status(201).json(response);
  } catch (error) {
    console.log(error.message);
    res.status(500).json({ msg: error.message });
  }
};

const getProductsByUserId = async (req, res, next) => {
  try {
    const response = await Product.findAll({
      attributes: [
        "uuid",
        "title",
        "category",
        "subCategory",
        "price",
        "desc",
        "images",
        "featured",
        "place",
        "condition",
        "madeYear",
      ],
      where: {
        userId: req.userId,
      },
      include: [
        {
          model: User,
          as: 'user',
          attributes: ["name", "email", "telephone"],
        },
      ],
    });
    console.log(response);
    res.status(200).json(response);
  } catch (error) {
    console.log(error.message);
    res.status(500).json({ msg: error.message });
  }
};

const deleteProductById = async (req, res, next) => {
  try {
    const product = await Product.findOne({
      where: {
        uuid: req.params.id,
      },
    });

    if (!product)
      return res.status(404).json({ msg: "A hiretes nem talalhato" });

    await Product.destroy({
      where: {
        [db.Op.and]: [{ id: product.id }, { userId: req.userId }],
      },
    });

    let images = product.images ? product.images.split(", ") : [];

    for (const image of images) {
      fs.unlink(image, (err) => {
        console.log(err);
      });
    }

    res.status(201).json({ msg: "A hirdetés sikeresen törölve!" });
  } catch (error) {
    console.log(error);
  }
};

const getProductById = async (req, res, next) => {
  try {
    let product = await Product.findOne({
      attributes: [
        "uuid",
        "title",
        "category",
        "subCategory",
        "price",
        "desc",
        "images",
        "featured",
        "place",
        "condition",
        "madeYear",
      ],
      where: { uuid: req.params.id },
      include: [
        {
          model: User,
          as: 'user',
          attributes: ["name", "email", "telephone"],
        },
      ],
    });

    if (!product)
      return res.status(404).json({ msg: "A hiretes nem talalhato" });

    res.status(201).json(product);
  } catch (err) {
    console.log(err);
  }
};

module.exports = {
  createProduct,
  updateProduct,
  getProducts,
  getProductsByUserId,
  deleteProductById,
  getProductById,
};
