import {
  StyleSheet,
  Text,
  View,
  Image,
  TextInput,
  TouchableOpacity,
} from "react-native"

import { toggleSignIn } from "../firebase"

import { useState } from "react"

export function Login({ navigation }) {

  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")

  const handleSubmit = async (email, password) => {
      try {
        await toggleSignIn(email, password)
  
        navigation.navigate('Lista de Contatos');
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
        <Image
          style={styles.logo}
          source={{
            uri: "https://www.iconpacks.net/icons/2/free-user-icon-3296-thumb.png",
          }}
        />
        <Text style={styles.text}>Email</Text>
        <TextInput style={styles.input} onChange={handleEmail} value={email} />
        <Text style={styles.text}>Senha</Text>
        <TextInput style={styles.input} onChange={handlePassword}  value={password} />

        <TouchableOpacity
          style={styles.button}
          onPress={() => handleSubmit(email, password)}
        >
          <Text style={styles.buttonText}>Login</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.button}
          onPress={() => navigation.navigate("Registrar")}
        >
          <Text style={styles.buttonText}>Cadastre-se</Text>
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