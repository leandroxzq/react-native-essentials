import { Plus } from "lucide-react-native"
import { NavigationContainer } from "@react-navigation/native"
import { createNativeStackNavigator } from "@react-navigation/native-stack"

import { Login } from "./components/Login"
import { Create } from "./components/Create"
import { Register } from "./components/Register"
import { Modify } from "./components/Modify"
import { Contacts } from "./components/Contacts"

const Stack = createNativeStackNavigator()

export default function App() {
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
					component={Contacts}
					options={({ navigation }) => ({
						headerTitleAlign: "center",
						headerRight: () => (
							<Plus onPress={() => navigation.navigate("Contato")} />
						),
					})}
				/>
				<Stack.Screen
					name="Registrar"
					component={Create}
					options={{ headerTitleAlign: "center" }}
				/>
				<Stack.Screen
					name="Contato"
					component={Register}
					options={{ headerTitleAlign: "center" }}
				/>
				<Stack.Screen name="Modificar" component={Modify} />
			</Stack.Navigator>
		</NavigationContainer>
	)
}
