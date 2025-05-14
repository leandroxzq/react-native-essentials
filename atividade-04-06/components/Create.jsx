import {
	StyleSheet,
	Text,
	View,
	TextInput,
	TouchableOpacity,
} from "react-native"

import { useState } from "react"
import { useNavigation } from "@react-navigation/native"

import { handleSignUp } from "../firebase"

export function Create() {
	const navigation = useNavigation()

	const [email, setEmail] = useState("")
	const [password, setPassword] = useState("")

	const handleSubmit = (email, password) => {
		try {
			handleSignUp(email, password)

			navigation.navigate("Login")
		} catch (e) {
			console.log(e)
		}
	}

	const handleEmail = (e) => {
		setEmail(e.target.value)
	}

	const handlePassword = (e) => {
		setPassword(e.target.value)
	}

	return (
		<View style={styles.container}>
			<View style={styles.column}>
				<Text style={styles.text}>Email</Text>
				<TextInput onChange={handleEmail} value={email} style={styles.input} />

				<Text style={styles.text}>Senha</Text>
				<TextInput
					onChange={handlePassword}
					value={password}
					style={styles.input}
				/>

				<TouchableOpacity
					style={styles.button}
					onPress={() => handleSubmit(email, password)}
				>
					<Text style={styles.buttonText}>Cadastrar</Text>
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
