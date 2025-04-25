import express from "express";
import authRoutes from "./routes/authRoutes";
// ... outras importações

const app = express();

app.use(express.json());
app.use("/api/auth", authRoutes);
// ... outras configurações

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Servidor rodando na porta ${PORT}`));
