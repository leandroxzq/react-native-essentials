import { useEffect, useState } from "react"
import {
	StyleSheet,
	Text,
	View,
	TextInput,
	TouchableOpacity,
} from "react-native"

import axios from "axios"

export function Modify({ navigation, route }) {
	const { id } = route.params
	const [name, setName] = useState("")
	const [email, setEmail] = useState("")
	const [number, setNumber] = useState("")
	const [image, setImage] = useState("")

	const fetchUsuario = async () => {
		try {
			const response = await axios.get(`http://localhost:3000/contatos/${id}`)

			setName(response.data.name)
			setEmail(response.data.email)
			setNumber(response.data.number)
			setImage(response.data.avatar_url)
		} catch (err) {
			console.error("Erro ao buscar usuário:", err)
		}
	}

	const handleUpdate = async () => {
		try {
			await axios.put(`http://localhost:3000/contatos/${id}`, {
				name,
				email,
				number,
				avatar_url: image,
			})
			navigation.navigate("Lista de Contatos")
		} catch (error) {
			console.error("Erro ao atualizar:", error)
		}
	}

	const handleDelete = async () => {
		try {
			await axios.delete(`http://localhost:3000/contatos/${id}`)
			navigation.navigate("Lista de Contatos")
		} catch (error) {
			console.error("Erro ao excluir:", error)
		}
	}

	useEffect(() => {
		fetchUsuario()
	}, [])

	return (
		<View style={styles.container}>
			<View style={styles.column}>
				<Text style={styles.text}>Nome</Text>
				<TextInput style={styles.input} value={name} onChangeText={setName} />

				<Text style={styles.text}>Email</Text>
				<TextInput style={styles.input} value={email} onChangeText={setEmail} />

				<Text style={styles.text}>Telefone</Text>
				<TextInput
					style={styles.input}
					value={number}
					onChangeText={setNumber}
				/>

				<TouchableOpacity style={styles.button} onPress={handleUpdate}>
					<Text style={styles.buttonText}>Alterar</Text>
				</TouchableOpacity>
				<TouchableOpacity
					style={[styles.button, { backgroundColor: "#E53935" }]}
					onPress={handleDelete}
				>
					<Text style={styles.buttonText}>Excluir</Text>
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
