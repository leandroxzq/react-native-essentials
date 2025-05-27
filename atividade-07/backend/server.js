import express from "express"
import cors from "cors"
import bodyParser from "body-parser"
import { v2 as cloudinary } from "cloudinary"
import "dotenv/config"

cloudinary.config({
	cloud_name: process.env.CLOUD_NAME,
	api_key: process.env.API_KEY,
	api_secret: process.env.API_SECRET,
})

const app = express()
const PORT = 3001

app.use(cors())
app.use(bodyParser.json())

// ✅ Listar imagens com uma tag (usa o upload_preset como tag)
app.get("/images", async (req, res) => {
	const { tag = "storage" } = req.query
	try {
		const result = await cloudinary.api.resources_by_tag(tag, {
			type: "upload",
			prefix: "",
			max_results: 100,
		})
		res.json(result.resources)
	} catch (err) {
		console.error(err)
		res.status(500).json({ error: "Erro ao buscar imagens" })
	}
})

// ✅ Deletar imagem por public_id
app.post("/delete-image", async (req, res) => {
	const { public_id } = req.body
	if (!public_id) {
		return res.status(400).json({ error: "public_id é obrigatório" })
	}
	try {
		const result = await cloudinary.uploader.destroy(public_id)
		res.json(result)
	} catch (err) {
		console.error(err)
		res.status(500).json({ error: "Erro ao deletar imagem" })
	}
})

app.listen(PORT, () => {
	console.log(`Servidor rodando em http://localhost:${PORT}`)
})
