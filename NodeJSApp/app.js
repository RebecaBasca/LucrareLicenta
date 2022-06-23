let createError = require("http-errors");
let express = require("express");
let path = require("path");
let cookieParser = require("cookie-parser");
let logger = require("morgan");

let indexRouter = require("./routes/index");
let accountsRouter = require("./routes/accounts");
let bookingsRouter = require("./routes/bookings");
let therapistsRouter = require("./routes/therapist");
let serviceRouter = require("./routes/services");

let app = express();

const multer = require("multer");
const multerStorage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "public");
  },
  filename: (req, file, cb) => {
    const ext = file.mimetype.split("/")[1];
    cb(null, `files/admin-${file.fieldname}-${Date.now()}.${ext}`);
  },
});

const upload = multer({
  storage: multerStorage,
});

app.use('/images', express.static('./public/files'))

app.post("/api/uploadFile", upload.single("myFile"),async (req, res) => {
  try {

    // res.status(200).json({
    //   fileName: req.file.filename,
    //   status: "success",
    //   message: "File created successfully!!",
    // });
    res.status(200).send(req.file);

  } catch (error) {
    res.json({
      error,
    });
  }
});

// view engine setup
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "jade");

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));

app.use("/", indexRouter);
app.use("/accounts", accountsRouter);
app.use("/bookings", bookingsRouter);
app.use("/therapists", therapistsRouter);
app.use("/services", serviceRouter);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render("error");
});



module.exports = app;
