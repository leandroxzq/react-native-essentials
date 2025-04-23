import React from "react"
import { Tab, Text, TabView } from "@rneui/themed"
import { View, StyleSheet } from "react-native"

import { SafeAreaView, SafeAreaProvider } from "react-native-safe-area-context"

import { Home } from "./components/Home"
import { Destination } from "./components/Destination"
import { Messages } from "./components/Messages"

const styles = StyleSheet.create({
	container: {
		flex: 1,
		minWidth: "100%",
	},
})

export default () => {
	const [index, setIndex] = React.useState(0)

	return (
		<SafeAreaProvider>
			<SafeAreaView style={styles.container}>
				<View style={styles.container}>
					<TabView value={index} onChange={setIndex} animationType="spring">
						<TabView.Item
							style={{
								flex: 1,
								backgroundColor: "#F4F6FF",
								width: "100%",
							}}
						>
							<Home />
						</TabView.Item>
						<TabView.Item style={{ backgroundColor: "blue", width: "100%" }}>
							<Destination />
						</TabView.Item>
						<TabView.Item style={{ backgroundColor: "green", width: "100%" }}>
							<Messages />
						</TabView.Item>
						<TabView.Item style={{ backgroundColor: "yellow", width: "100%" }}>
							<Text h1>Cart</Text>
						</TabView.Item>
					</TabView>

					<Tab
						value={index}
						onChange={(e) => setIndex(e)}
						indicatorStyle={{
							backgroundColor: "white",
							height: 3,
						}}
						variant="primary"
					>
						<Tab.Item
							title="Home"
							titleStyle={{ fontSize: 12 }}
							icon={{
								name: "home",
								type: "ionicon",
								color: "white",
							}}
						/>
						<Tab.Item
							title="Doctors"
							titleStyle={{ fontSize: 12 }}
							icon={{
								name: "medical",
								type: "ionicon",
								color: "white",
							}}
						/>
						<Tab.Item
							title="Appointment"
							titleStyle={{ fontSize: 12 }}
							icon={{
								name: "calendar",
								type: "ionicon",
								color: "white",
							}}
						/>
						<Tab.Item
							title="Profile"
							titleStyle={{ fontSize: 12 }}
							icon={{
								name: "person-circle",
								type: "ionicon",
								color: "white",
							}}
						/>
					</Tab>
				</View>
			</SafeAreaView>
		</SafeAreaProvider>
	)
}
