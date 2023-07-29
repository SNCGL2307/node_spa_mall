const express = require('express');
const app = express();
const port = 3000;

const goodsRouter = require('./routes/goods');
const cartsRouter = require('./routes/carts.js');
const connect = require("./schemas"); // index.js는 폴더를 불러와도 바로 사용가능해서 생략
connect();


app.use(express.json()); // body에 데이터가 들어갔을때 사용하게 해주는 Middleware이다.
app.use("/api", [goodsRouter, cartsRouter]); // localhost:3000/api -> goodsRouter

app.get('/', (req, res) => {
  res.send('Hello World!');
});



app.listen(port, () => {
  console.log(port, '포트로 서버가 열렸어요!');
});


// app.use(express.json()); // body-parser Middleware를 사용하기 위한 문법이다

// app.post("/",(req, res) => {
//     console.log(req.body);

//     res.send("기본 URI에 POST 메소드가 정상적으로 실행되었습니다");
// })

// app.get("/", (req, res) => {
//     console.log(req.query);

//     res.status(400).json({
//         "Keykey" : "value 입니다",
//         "이름입니다." : "이름일까요?",
//     });

//     res.json(obj);
// })

// app.get("/:id",(req,res) => {
//     console.log(req.params);

//     res.send(":id URL에 정상적으로 반환되었습니다.");
// })