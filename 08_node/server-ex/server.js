// express : 웹 서버를 동작시키는 프레임워크
const express = require("express");
const dotenv = require("dotenv");
const morgan = require("morgan");

const logger = require("./middleware/logger");
const errorHandler = require("./middleware/error");

// 우리가 만든 라우터 파일 가져온다.
const bootcamps = require("./routes/bootcamps");

// 환경 설정 파일의 내용을 로딩한다.
dotenv.config({ path: "./config/config.env" });

// 웹서버 프레임워크인 익스프레스를 가져온다.
const app = express();

// Body 파싱할 수 있도록 설정
app.use(express.json());

// app.use 는 순서가 중요!! 순서대로 실행을 시킵니다. next()로
// 미들웨어 연결
app.use(logger);

app.use(morgan("combined"));

// 라우터 연결 : url의 path 와 라우터 파일과 연결
app.use("/api/v1/bootcamps", bootcamps);

// 위의 에러를 처리하기 위해서, 에러 핸들러 미들웨어 연결
app.use(errorHandler);

// 환경설정 파일인, config.env 파일에 있는 내용을 불러오는 방법.
const PORT = process.env.PORT || 5000;

app.listen(
  PORT,
  console.log(`Server running in ${process.env.NODE_ENV} mode on port ${PORT}`)
);

// 익스프레스 서버 실행은 : 터미널에서 npm run dev
