// /routes/goods.js
const express = require("express");

const router = express.Router();

const goods = [
    {
      goodsId: 4,
      name: "상품 4",
      thumbnailUrl:
        "https://cdn.pixabay.com/photo/2016/09/07/02/11/frogs-1650657_1280.jpg",
      category: "drink",
      price: 0.1,
    },
    {
      goodsId: 3,
      name: "상품 3",
      thumbnailUrl:
        "https://cdn.pixabay.com/photo/2016/09/07/02/12/frogs-1650658_1280.jpg",
      category: "drink",
      price: 2.2,
    },
    {
      goodsId: 2,
      name: "상품 2",
      thumbnailUrl:
        "https://cdn.pixabay.com/photo/2014/08/26/19/19/wine-428316_1280.jpg",
      category: "drink",
      price: 0.11,
    },
    {
      goodsId: 1,
      name: "상품 1",
      thumbnailUrl:
        "https://cdn.pixabay.com/photo/2016/09/07/19/54/wines-1652455_1280.jpg",
      category: "drink",
      price: 6.2,
    },
  ];

  //상품 목록 조회 API
  router.get("/goods", (req,res) => {
    res.json({goods: goods});
  });

  //상품 상세 조회 API
  router.get("/goods/:goodsId", (req,res) => {
    const {goodsId} = req.params;
    const [detail] = goods.filter((goods) => goods.goodsId === Number(goodsId));
    res.json({detail});
  });

  //
  const Cart = require("../schemas/cart.js");
  router.post("/goods/:goodsId/cart", async(req,res) => {
    const {goodsId} = req.params;
    const {quantity} = req.body;

    const existsCarts = await Cart.find({goodsId});
    if(existsCarts.length){
      return res.status(400).json({
        success: false,
        errormessage:"이미 장바구니에 해당하는 상품이 존재합니다.",
      })
    }

    await Cart.create({goodsId, quantity});

    res.json({result: "success"});

  })

  //상품 수정 API
  router.put("/goods/:goodsId/cart", async(req,res) => {
    const {goodsId} = req.params;
    const {quantity} = req.body;

    const existsCarts = await Cart.find({goodsId});
    if(existsCarts.length) {
      await Cart.updateOne(
        {goodsId: goodsId},
        {$set: {quantity:quantity}}// 수정하는 부분
      )
    }
    res.status(200).json({sucess:true});
  })
  // 상품 제거 API
  router.delete("/goods/:goodsId/cart", async(req,res) => {
    const {goodsId} = req.params;

    const existsCarts = await Cart.find({goodsId});
    if(existsCarts.length) {
      await Cart.deleteOne({goodsId});
    }

    

    res.status(200).json({result: "success"});
  })

  const Goods = require("../schemas/goods.js"); // ../는 현재 폴더보다 상위 폴더로 이동 
  router.post("/goods", async (req,res) =>{
    const {goodsId, name, thumbnailUrl, category, price} =req.body; // body를 써서 객체에 데이터를 받는다

    const goods = await Goods.find({goodsId}); // goodsId가 존재 하냐 안하냐 확인

    if(goods.length){
      return res.status(400).json({
        success: false,
        errorMessage:"이미 존재하는 GoodsId입니다."
      });
    }

    const createdGoods = await Goods.create({goodsId, name, thumbnailUrl, category, price});

    res.json({goods: createdGoods});
  }) 
 
  module.exports = router;

