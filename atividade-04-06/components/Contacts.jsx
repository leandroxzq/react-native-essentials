import { useState, useEffect } from "react"
import { StyleSheet, Text, View, Image, TouchableOpacity } from "react-native"
import axios from "axios"

import { getAuth, onAuthStateChanged, signOut } from "firebase/auth"

export function Contacts({ navigation }) {
	const [contatos, setContatos] = useState([])

	async function consultarDados() {
		try {
			const response = await axios.get("http://localhost:3000/contatos")

			setContatos(response.data)
		} catch (error) {
			console.error(error)
		}
	}

	const handleLogout = async () => {
		try {
			await signOut(auth)
			navigation.navigate("Login")
		} catch (e) {
			console.error(e)
		}
	}

	const auth = getAuth()
	const [isLoggedIn, setIsLoggedIn] = useState(false)

	useEffect(() => {
		consultarDados()

		const unsubscribe = onAuthStateChanged(auth, (user) => {
			setIsLoggedIn(!!user)
		})
		return () => unsubscribe()
	}, [])

	return (
		<View>
			<View style={styles.column}>
				{isLoggedIn && (
					<TouchableOpacity onPress={handleLogout}>
						<Text>Sair</Text>
					</TouchableOpacity>
				)}
				{contatos &&
					contatos.map((user) => {
						return (
							<View style={styles.column} key={user.name}>
								<TouchableOpacity
									style={styles.contant}
									onPress={() =>
										navigation.navigate("Modificar", { id: user.id })
									}
								>
									<View style={styles.row}>
										<Image
											style={styles.logo}
											source={{ uri: user.avatar_url }}
										/>

										<View>
											<Text style={styles.text}>{user.number}</Text>
											<Text style={styles.text}>{user.name}</Text>
										</View>
									</View>
								</TouchableOpacity>
							</View>
						)
					})}
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
