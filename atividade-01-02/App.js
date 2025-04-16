import React from "react"
import {
	StyleSheet,
	Text,
	View,
	Image,
	TextInput,
	TouchableOpacity,
} from "react-native"

import { Plus, ArrowLeft } from 'lucide-react-native';

import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

function Login({ navigation }) {
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

				<TouchableOpacity style={styles.button} onPress={() => navigation.navigate("Lista de Contatos")}>
				<Text style={styles.buttonText}>Login</Text>
				</TouchableOpacity>

				<TouchableOpacity style={styles.button} onPress={() => navigation.navigate('Registrar')}>
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
	row: {
		flexDirection: "row"
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

function Cadastrar ({ navigation }) {
	return (
		<View style={styles.container}>
			<View style={styles.column}>
				<Text style={styles.title}>Contatos</Text>
				<ArrowLeft onPress={() => navigation.navigate('Lista de Contatos')}/>

				<Text style={styles.text}>Nome</Text>
				<TextInput style={styles.input} />
				<Text style={styles.text}>Email</Text>
				<TextInput style={styles.input} />
				<Text style={styles.text}>Telefone</Text>
				<TextInput style={styles.input} />
				
				<TouchableOpacity style={styles.button}>
					<Text style={styles.buttonText}>Salvar</Text>
				</TouchableOpacity>
			</View>
		</View>
	)
}

function Contatos ({navigation}) {

	const contatos = [
		{
		  name: 'Amy Farha',
		  avatar_url: 'https://s3.amazonaws.com/uifaces/faces/twitter/ladylexy/128.jpg',
		  number: '81 988553424'
		},
		{
		  name: 'Chris Jackson',
		  avatar_url: 'https://s3.amazonaws.com/uifaces/faces/twitter/adhamdannaway/128.jpg',
		  number: '81 988553424'
		},
	
	  ]
	  
	return (
		<View style={styles.container}>
			<View style={styles.column}>
				<Text style={styles.title}>Lista de contatos</Text>
				<Plus onPress={() => navigation.navigate('Usuario')}/>

		

				{contatos && (
					contatos.map((user) => {
						return (
					
						
						<View style={styles.column} key={user.nome} >
							<TouchableOpacity style={styles.button} onPress={() => navigation.navigate('Modificar')}>
								<View style={styles.row}>
									<Image
										style={styles.logo}
										source={{
											uri: "https://reactnative.dev/img/tiny_logo.png",
										}}
									/>
									<Text style={styles.text}>{user.name}</Text>
									<Text style={styles.text}>{user.number}</Text>
								</View>
							</TouchableOpacity>
						</View>
						)
					})
				)}
			</View>
		</View>
	)
} 

function Modificar ({ navigation}) {
	return (
		<View style={styles.container}>
			<View style={styles.column}>
				<Text style={styles.title}>Contatos</Text>
				<ArrowLeft onPress={() => navigation.navigate('Lista de Contatos')}/>

				<Text style={styles.text}>Nome</Text>
				<TextInput style={styles.input} />
				<Text style={styles.text}>Email</Text>
				<TextInput style={styles.input} />
				<Text style={styles.text}>Telefone</Text>
		

				<TouchableOpacity style={styles.button}>
					<Text style={styles.buttonText}>Salvar</Text>
				</TouchableOpacity>
			</View>
		</View>
	)
}

const Stack = createNativeStackNavigator();

function App() {
	return (
		<NavigationContainer>
			<Stack.Navigator initialRouteName="Login">
				<Stack.Screen name="Login" component={Login} options={{ headerShown: false }}  />
				<Stack.Screen name="Lista de Contatos" component={Contatos} options={{ headerShown: false }} />
				<Stack.Screen name="Registrar" component={Registrar} options={{headerTitleAlign: 'center'}} />
				<Stack.Screen name="Usuario" component={Cadastrar} />
				<Stack.Screen name="Modificar" component={Modificar} />
			</Stack.Navigator>
		</NavigationContainer>
	);
}

export default App
