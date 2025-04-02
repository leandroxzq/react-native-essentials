import React from "react"
import {
	StyleSheet,
	Text,
	View,
	Image,
	TextInput,
	TouchableOpacity,
} from "react-native"

function Login() {
	return (
		<View style={styles.container}>
			<View style={styles.column}>
				<Image
					style={styles.logo}
					source={{
						uri: "https://reactnative.dev/img/tiny_logo.png",
					}}
				/>
				<Text style={styles.text}>Email</Text>
				<TextInput style={styles.input} />
				<Text style={styles.text}>Senha</Text>
				<TextInput style={styles.input} />

				<TouchableOpacity style={styles.button}>
					<Text style={styles.buttonText}>Logar</Text>
				</TouchableOpacity>

				<TouchableOpacity style={styles.button}>
					<Text style={styles.buttonText}>Cadastre-se</Text>
				</TouchableOpacity>
			</View>
		</View>
	)
}

function Registrar() {
	return (
		<View style={styles.container}>
			<View style={styles.column}>
				<Text style={styles.title}>Cadastro</Text>
				<Text style={styles.text}>Nome</Text>
				<TextInput style={styles.input} />
				<Text style={styles.text}>Email</Text>
				<TextInput style={styles.input} />
				<Text style={styles.text}>Senha</Text>
				<TextInput style={styles.input} />

				<TouchableOpacity style={styles.button}>
					<Text style={styles.buttonText}>Cadastrar</Text>
				</TouchableOpacity>
			</View>
		</View>
	)
}

function Esqueceu() {
	return (
		<View style={styles.container}>
			<View style={styles.column}>
				<Text style={styles.title}>Esqueceu a senha</Text>

				<Text style={styles.text}>Email</Text>
				<TextInput style={styles.input} />

				<TouchableOpacity style={styles.button}>
					<Text style={styles.buttonText}>Enviar</Text>
				</TouchableOpacity>
			</View>
		</View>
	)
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: "#fff",
		alignItems: "center",
		justifyContent: "center",
		minWidth: "100%",
	},
	column: {
		flexDirection: "column",
		justifyContent: "center",
		alignItems: "center",
		minWidth: 350,
		gap: 10,
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

export default Esqueceu
