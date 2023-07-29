const express = require("express");
const router = express.Router();

const Cart = require("../schemas/cart.js");
const Goods = require("../schemas/goods.js");
const cart = require("../schemas/cart.js");

//localhost:3000/api/carts GET Method
router.get("/carts", async(req,res) =>{
    const carts = await Cart.find({}); // 장바구니 안의 모든 데이터 찾기
    
    const goodsIds = carts.map((cart) => { // 장바구니 안에 있는 모든 상품에 대한 아이디 찾기
        return cart.goodsId;
        //[
        // {goodsId, quantity},
        // {goodsId, quantity},
        //]
        //이런 식으로 배열의 값을 가진다
    })
    //배열 안에 [2, 11, 1]; 이렇게 가지고 있으면 이런 값을 가지게 된다.

    const goods = await Goods.find({goodsId: goodsIds})
    // Goods에 해당하는 모든 정보를 가져오는데 만약 goodsids의 변수 안에
    // 존재하는 값일 때만 가져와라

    const results =  carts.map((cart) => {
        return {
            "quantity": cart.quantity,
            "goods": goods.find((item) => item.goodsId === cart.goodsId),
        }
    })

    res.json({
        "carts": results, 
    })
});



module.exports = router;