import axios from "axios"
import { useState, useEffect } from "react"
import {
	View,
	Text,
	StyleSheet,
	Image,
	TextInput,
	ScrollView,
	TouchableOpacity,
} from "react-native"

import { Icon } from "@rneui/themed"
import { SafeAreaView } from "react-native-safe-area-context"

export const Destination = () => {
	const [categories, setCategories] = useState([])
	const [popular, setPopular] = useState([])
	const [recommended, setRecommended] = useState([])

	useEffect(() => {
		const fetchData = async () => {
		  try {
			const [catRes, popRes, recRes] = await Promise.all([
			  axios.get('http://localhost:3000/categoriesDoc'),
			  axios.get('http://localhost:3000/popular'),
			  axios.get('http://localhost:3000/recommended'),
			])
	
			setCategories(catRes.data)
			setPopular(popRes.data)
			setRecommended(recRes.data)
		  } catch (error) {
			console.error('Erro ao buscar dados:', error)
		  }
		}
	
		fetchData()
	  }, [])

	return (
		<SafeAreaView style={styles.container}>
			<View style={styles.header}>
				<View style={styles.searchBar}>
					<Icon name="search" type="feather" size={18} color="#999" />
					<TextInput
						placeholder="Search here ..."
						style={styles.input}
						placeholderTextColor="#999"
					/>
				</View>
				<View style={styles.profileSection}>
					<Image
						source={{
							uri: "https://randomuser.me/api/portraits/women/1.jpg",
						}}
						style={styles.avatar}
					/>
					<View>
						<Text style={styles.welcome}>Welcome!</Text>
						<Text style={styles.name}>Donna Stroupe</Text>
					</View>
					<TouchableOpacity>
						<Icon
							name="bell"
							type="feather"
							color="#fff"
							size={22}
							containerStyle={styles.bellIcon}
						/>
					</TouchableOpacity>
				</View>
			</View>

			<ScrollView contentContainerStyle={styles.scrollContent}>
				<Text style={styles.sectionTitle}>Category</Text>
				<View style={styles.categoryContainer}>
					{categories.map((cat, index) => (
						<TouchableOpacity key={index} style={styles.categoryItem}>
							<Icon
								name={cat.icon}
								type="material-community"
								color="#fff"
								size={26}
							/>
							<Text style={styles.categoryText}>{cat.name}</Text>
						</TouchableOpacity>
					))}
				</View>

				<Text style={styles.sectionTitle}>Popular Destination</Text>
				<ScrollView horizontal showsHorizontalScrollIndicator={false}>
					{popular.map((item, index) => (
						<Image
							key={index}
							source={{ uri: item.img }}
							style={styles.popularImage}
						/>
					))}
				</ScrollView>

				<Text style={styles.sectionTitle}>Recommended</Text>
				<ScrollView horizontal showsHorizontalScrollIndicator={false}>
					{recommended.map((item, index) => (
						<Image
							key={index}
							source={{ uri: item.img }}
							style={styles.popularImage}
						/>
					))}
				</ScrollView>
			</ScrollView>
		</SafeAreaView>
	)
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: "#F4F6FF",
	},
	header: {
		backgroundColor: "#5D55FA",
		padding: 20,
	},
	searchBar: {
		flexDirection: "row",
		backgroundColor: "#fff",
		borderRadius: 10,
		paddingHorizontal: 10,
		alignItems: "center",
	},
	input: {
		marginLeft: 10,
		flex: 1,
		fontSize: 14,
		color: "#333",
		padding: "1rem",
	},
	profileSection: {
		marginTop: 20,
		flexDirection: "row",
		alignItems: "center",
		justifyContent: "space-between",
	},
	avatar: {
		width: 50,
		height: 50,
		borderRadius: 25,
		marginRight: 10,
	},
	welcome: {
		color: "#fff",
		fontSize: 16,
		fontWeight: "600",
	},
	name: {
		color: "#fff",
		fontSize: 14,
	},
	bellIcon: {
		marginLeft: 10,
	},
	scrollContent: {
		padding: 20,
	},
	sectionTitle: {
		fontSize: 18,
		fontWeight: "600",
		marginBottom: 10,
		color: "#333",
	},
	categoryContainer: {
		flexDirection: "row",
		flexWrap: "wrap",
		justifyContent: "space-between",
		marginBottom: 20,
	},
	categoryItem: {
		width: "22%",
		backgroundColor: "#5D55FA",
		borderRadius: 15,
		padding: 10,
		alignItems: "center",
		marginVertical: 5,
	},
	categoryText: {
		color: "#fff",
		marginTop: 5,
		fontSize: 12,
		textAlign: "center",
	},
	popularImage: {
		width: 140,
		height: 100,
		borderRadius: 15,
		marginRight: 10,
	},
})
