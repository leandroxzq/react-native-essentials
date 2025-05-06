import axios from "axios"
import { useState, useEffect} from "react"
import { View, StyleSheet, FlatList, Image, Text } from "react-native"
import { Icon, Badge } from "@rneui/themed"

export const Messages = () => {
	const [messages, setMessages] = useState([])

	const fetchData = async () => {
		try {
			const response = await axios.get("http://localhost:3000/messages")

			setMessages(response.data)
		} catch (error) {
			console.error('Erro ao buscar dados:', error)
		}
	}

	useEffect(() => {
		fetchData()
	}, [])

	return (
		<View style={styles.container}>
			<View style={styles.header}>
				<Icon
					name="mail-open"
					type="ionicon"
					color="#fff"
					size={28}
					containerStyle={styles.headerIcon}
				/>
				<Text style={styles.headerTitle}>Messages & Chat</Text>
			</View>

			<View style={styles.options}>
				<Text style={styles.optionText}>Mark all read</Text>
				<Text style={styles.optionText}>Sort by time ▼</Text>
			</View>

			<FlatList
				data={messages}
				keyExtractor={(item) => item.id}
				renderItem={({ item }) => (
					<View style={styles.messageItem}>
						<Image source={{ uri: item.avatar }} style={styles.avatar} />
						<View style={styles.messageTextContainer}>
							<Text style={styles.name}>{item.name}</Text>
							<Text style={styles.message}>{item.message}</Text>
						</View>
						<View style={styles.timeContainer}>
							{item.unread > 0 && (
								<Badge
									value={item.unread}
									status="primary"
									containerStyle={{ marginBottom: 5 }}
								/>
							)}
							<Text style={styles.time}>{item.time}</Text>
						</View>
					</View>
				)}
			/>
		</View>
	)
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: "#F7F7F7",
		paddingTop: 40,
	},
	header: {
		flexDirection: "row",
		alignItems: "center",
		paddingHorizontal: 20,
		marginBottom: 10,
	},
	headerIcon: {
		backgroundColor: "#3759C5",
		padding: 10,
		borderRadius: 20,
		marginRight: 10,
	},
	headerTitle: {
		fontSize: 20,
		fontWeight: "600",
		color: "#333",
	},
	options: {
		flexDirection: "row",
		justifyContent: "space-between",
		paddingHorizontal: 20,
		marginBottom: 10,
	},
	optionText: {
		fontSize: 14,
		color: "#555",
	},
	messageItem: {
		flexDirection: "row",
		backgroundColor: "#fff",
		padding: 15,
		marginVertical: 5,
		marginHorizontal: 20,
		borderRadius: 10,
		alignItems: "center",
	},
	avatar: {
		width: 45,
		height: 45,
		borderRadius: 30,
		marginRight: 15,
	},
	messageTextContainer: {
		flex: 1,
	},
	name: {
		fontWeight: "bold",
		fontSize: 16,
	},
	message: {
		color: "#777",
		fontSize: 14,
		marginTop: 2,
	},
	timeContainer: {
		alignItems: "flex-end",
	},
	time: {
		fontSize: 12,
		color: "#999",
	},
	bottomTab: {
		flexDirection: "row",
		justifyContent: "space-around",
		padding: 10,
		borderTopWidth: 1,
		borderTopColor: "#ccc",
		backgroundColor: "#fff",
	},
})
