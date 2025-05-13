import React, { useState, useEffect } from "react"
import {
	StyleSheet,
	Text,
	View,
	Image,
	TextInput,
	TouchableOpacity,
} from "react-native"

import axios from "axios"
axios.defaults.baseURL = "http://localhost:3000"

import { Plus } from "lucide-react-native"
import { NavigationContainer } from "@react-navigation/native"
import { createNativeStackNavigator } from "@react-navigation/native-stack"

import { Login } from "./components/Login"
import { Registrar } from "./components/Registrar"

import { getAuth, onAuthStateChanged, signOut } from 'firebase/auth';

function Cadastrar({ navigation }) {
	const [nome, setNome] = useState("")
	const [email, setEmail] = useState("")
	const [telefone, setTelefone] = useState("")

	const saveContato = async () => {
		if (!nome || !email || !telefone) {
			alert("Preencha todos os campos!")
			return
		}

		try {
			const res = await axios.post("/contatos", {
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

function Contatos({ navigation }) {
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
      await signOut(auth);
      navigation.navigate('Login');
    } catch (e) {
      console.error(e);
    }
  };

  const auth = getAuth();
  const [isLoggedIn, setIsLoggedIn] = useState(false);

	useEffect(() => {
		consultarDados()

    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setIsLoggedIn(!!user);
    });
    return () => unsubscribe();
	}, [])

	return (
		<View>
			<View style={styles.column}>
      {isLoggedIn && (
        <TouchableOpacity onPress={handleLogout}>
          <Text >Sair</Text>
        </TouchableOpacity>
      )}
				{contatos &&
					contatos.map((user) => {
						return (
							<View style={styles.column} key={user.name}>
               
								<TouchableOpacity
									style={styles.contant}
									onPress={() => navigation.navigate("Modificar")}
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

function Modificar({ navigation }) {
	return (
		<View style={styles.container}>
			<View style={styles.column}>
				<Text style={styles.text}>Nome</Text>
				<TextInput style={styles.input} />
				<Text style={styles.text}>Email</Text>
				<TextInput style={styles.input} />
				<Text style={styles.text}>Telefone</Text>
				<TextInput style={styles.input} />

				<TouchableOpacity style={styles.button}>
					<Text style={styles.buttonText}>Alterar</Text>
				</TouchableOpacity>
				<TouchableOpacity style={styles.button}>
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

const Stack = createNativeStackNavigator()

function App() {
	return (
		<NavigationContainer>
			<Stack.Navigator initialRouteName="Login">
				<Stack.Screen
					name="Login"
					component={Login}
					options={{ headerShown: false }}
				/>
				<Stack.Screen
					name="Lista de Contatos"
					component={Contatos}
					options={({ navigation }) => ({
						headerTitleAlign: "center",
						headerRight: () => (
							<Plus onPress={() => navigation.navigate("Contato")} />
						),
					})}
				/>
				<Stack.Screen
					name="Registrar"
					component={Registrar}
					options={{ headerTitleAlign: "center" }}
				/>
				<Stack.Screen
					name="Contato"
					component={Cadastrar}
					options={{ headerTitleAlign: "center" }}
				/>
				<Stack.Screen name="Modificar" component={Modificar} />
			</Stack.Navigator>
		</NavigationContainer>
	)
}

export default App
