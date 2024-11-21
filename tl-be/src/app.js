const express = require("express");
const cors = require("cors");
const corsOptions = require("./config/cors");
const session = require("express-session");
const path = require("path");

const app = express();

app.use(cors(corsOptions));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(
  session({
    secret: process.env.SECRET_KEY,
    resave: false,
    saveUninitialized: true,
    cookie: {
      maxAge: Number(process.env.SESSION_TIME),
    }, // 5 phút
  })
);

app.use((err, req, res, next) => {
  if (err.message && err.message.includes("CORS")) {
    res.status(400).send({
      message: "CORS Error",
      details: err.message,
    });
  } else {
    next(err);
  }
});

/* response */
app.use((req, res, next) => {
  res.success = (message, data) => {
    return res.status(201).json({ message, data });
  };
  next();
});

app.use((req, res, next) => {
  res.successNoData = (message) => {
    return res.status(200).json({ message });
  };
  next();
});

app.use((req, res, next) => {
  res.error = (code, message) => {
    return res.status(code).json({ message });
  };
  next();
});

app.use((req, res, next) => {
  res.errorServer = () => {
    return res.error(500, "Lỗi server!");
  };
  next();
});

app.use((req, res, next) => {
  res.errorValid = (message = "Tất cả trường dữ đều liệu rỗng!") => {
    return res.error(400, message);
  };
  next();
});

// Server folder
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

/* router */
app.use("/nguoi-dung", require("./routes/nguoi_dung.route"));
app.use("/vai-tro", require("./routes/vai_tro.route"));

app.use("/ca", require("./routes/ca.route"));
app.use("/lich-lam-viec", require("./routes/lich_lam_viec.route"));
app.use("/don-gia-luong", require("./routes/don_gia_luong.route"));

app.use("/nguyen-lieu", require("./routes/nguyen_lieu.route"));
app.use("/nha-san-xuat", require("./routes/nha_san_xuat.route"));
app.use("/cong-thuc", require("./routes/cong_thuc.route"));
app.use("/kho", require("./routes/kho.route"));
app.use(
  "/chi-tiet-nguyen-lieu",
  require("./routes/chi_tiet_nguyen_lieu.route")
);
app.use("/chi-tiet-san-pham", require("./routes/chi_tiet_san_pham.route"));
app.use("/san-pham", require("./routes/san_pham.route"));

app.get("/", (req, res) => {
  res.send("Hello World!");
});

module.exports = app;
