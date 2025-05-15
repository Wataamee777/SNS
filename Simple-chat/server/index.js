import express from "express";
import fs from "fs";
import bcrypt from "bcrypt";
import session from "express-session";
import cors from "cors";

const app = express();
app.use(express.json());
app.use(cors({ origin: "http://localhost:5173", credentials: true }));

app.use(session({
  secret: "secretkey",
  resave: false,
  saveUninitialized: true,
}));

const usersFile = "./server/users.json";

app.post("/api/register", async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) return res.status(400).send("Missing info");

  const users = JSON.parse(fs.readFileSync(usersFile, "utf-8") || "[]");
  if (users.find(u => u.email === email)) {
    return res.status(400).send("Already registered");
  }

  const hashed = await bcrypt.hash(password, 10);
  users.push({ email, password: hashed });
  fs.writeFileSync(usersFile, JSON.stringify(users, null, 2));

  res.send("Registered");
});

app.post("/api/login", async (req, res) => {
  const { email, password } = req.body;
  const users = JSON.parse(fs.readFileSync(usersFile, "utf-8") || "[]");
  const user = users.find(u => u.email === email);
  if (!user || !(await bcrypt.compare(password, user.password))) {
    return res.status(401).send("Invalid credentials");
  }

  req.session.user = email;
  res.send("Logged in");
});

app.get("/api/me", (req, res) => {
  if (req.session.user) {
    res.json({ email: req.session.user });
  } else {
    res.status(401).send("Not logged in");
  }
});

app.listen(3000, () => console.log("Server on http://localhost:3000"));

