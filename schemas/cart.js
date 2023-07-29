const mongoose = require("mongoose");

const cartSchema = new mongoose.Schema({  
  goodsId: { 
    type: Number, //type은 null, object, string 등 여러가지 type이 있다.
    required: true, //required true는 무조건 값이 있어야 사용가능이다.
    unique: true // 해당하는 값이 무조건 고유한 값이 어야하는가(중복된 값 X) 이다.
  },
  quantity: {
    type: Number,
    required: true,
  }
});

module.exports = mongoose.model("Cart", cartSchema);