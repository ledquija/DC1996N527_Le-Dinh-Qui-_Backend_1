import express, { json } from "express";
// eslint-disable-next-line @typescript-eslint/no-require-imports, no-undef
import cors from "cors";
// eslint-disable-next-line @typescript-eslint/no-require-imports, no-undef
import contactsRouter from "./app/routes/contact.route";
const app = express();
// eslint-disable-next-line @typescript-eslint/no-require-imports, no-undef
import ApiError from "./app/api-error";

app.use(cors());
app.use(json());
app.use("/api/contacts", contactsRouter);
app.get("/", (req, res) => {
  res.json({ message: "Welcome to contact book application." });
});
app.use((req, res, next) => {
  return next(new ApiError(404, "Resource not found"));
});


app.use((error, req, res) => {
  return res.status(error.statusCode || 500).json({
    message: error.message || "Internal Server Error",
  });
});

// eslint-disable-next-line no-undef
export default app;
