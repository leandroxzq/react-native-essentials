import React from "react"
import { View, StyleSheet, FlatList, Image, Text } from "react-native"
import { Icon, Badge } from "@rneui/themed"

const messages = [
	{
		id: "1",
		name: "Claudia Alves",
		message: "Do more of what you love.",
		time: "3m ago",
		unread: 3,
		avatar: "https://randomuser.me/api/portraits/women/1.jpg",
	},
	{
		id: "2",
		name: "Dani Martinez",
		message: "Do your own thing.",
		time: "5m ago",
		unread: 1,
		avatar: "https://randomuser.me/api/portraits/men/2.jpg",
	},
	{
		id: "3",
		name: "Kimberly Nguyen",
		message: "Kindness is beautiful.",
		time: "1h ago",
		unread: 2,
		avatar: "https://randomuser.me/api/portraits/women/3.jpg",
	},
	{
		id: "4",
		name: "Mariana Napolitani",
		message: "Live your purpose.",
		time: "2h ago",
		unread: 1,
		avatar: "https://randomuser.me/api/portraits/women/4.jpg",
	},
	{
		id: "5",
		name: "Olivia Wilson",
		message: "You got this.",
		time: "5h ago",
		unread: 0,
		avatar: "https://randomuser.me/api/portraits/women/5.jpg",
	},
	{
		id: "6",
		name: "Rachelle Beaudry",
		message: "You're wonderful.",
		time: "Yesterday",
		unread: 0,
		avatar: "https://randomuser.me/api/portraits/women/6.jpg",
	},
	{
		id: "7",
		name: "Soo Jin Ae",
		message: "Keep it simple.",
		time: "Yesterday",
		unread: 0,
		avatar: "https://randomuser.me/api/portraits/women/7.jpg",
	},
]

export const Messages = () => {
	return (
		<View style={styles.container}>
			{/* Header */}
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
