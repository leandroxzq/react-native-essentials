import { useState } from "react"
import axios from "axios"

import {
	StyleSheet,
	Text,
	View,
	TextInput,
	TouchableOpacity,
} from "react-native"

export function Register({ navigation }) {
	const [nome, setNome] = useState("")
	const [email, setEmail] = useState("")
	const [telefone, setTelefone] = useState("")

	const saveContato = async () => {
		if (!nome || !email || !telefone) {
			alert("Preencha todos os campos!")
			return
		}

		try {
			const res = await axios.post("http://localhost:3000/contatos", {
				name: nome,
				avatar_url:
					"https://www.iconpacks.net/icons/2/free-user-icon-3296-thumb.png",
				number: telefone,
				email: email,
			})

			console.log("Contato salvo:", res.data)
			navigation.navigate("Lista de Contatos")
		} catch (error) {
			console.log("Erro ao salvar:", error.message)
		}
	}

	return (
		<View style={styles.container}>
			<View style={styles.column}>
				<Text style={styles.text}>Nome</Text>

				<TextInput style={styles.input} value={nome} onChangeText={setNome} />

				<Text style={styles.text}>Email</Text>

				<TextInput style={styles.input} value={email} onChangeText={setEmail} />

				<Text style={styles.text}>Telefone</Text>

				<TextInput
					style={styles.input}
					value={telefone}
					onChangeText={setTelefone}
				/>

				<TouchableOpacity style={styles.button} onPress={saveContato}>
					<Text style={styles.buttonText}>Salvar</Text>
				</TouchableOpacity>
			</View>
		</View>
	)
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: "#fff",
		paddingInline: "2rem",
		justifyContent: "center",
		minWidth: "100%",
	},
	column: {
		width: "100%",
		flexDirection: "column",
		justifyContent: "center",
		alignItems: "center",
		gap: 10,
	},
	row: {
		flexDirection: "row",
		alignItems: "center",
	},
	logo: {
		width: 70,
		height: 70,
	},
	text: {
		alignSelf: "flex-start",
		marginLeft: 10,
	},
	title: {
		fontSize: "2rem",
	},
	input: {
		backgroundColor: "#D7D7D7",
		borderRadius: 8,
		width: "100%",
		padding: 10,
		marginBottom: 10,
	},
	contant: {
		backgroundColor: "#fff",
		borderRadius: 8,
		width: "100%",
		paddingVertical: 12,
		alignItems: "center",
	},
	button: {
		backgroundColor: "#45C350",
		borderRadius: 8,
		width: "100%",
		paddingVertical: 12,
		alignItems: "center",
	},
	buttonText: {
		color: "#fff",
		fontSize: 16,
		fontWeight: "bold",
	},
})
