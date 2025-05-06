import { useState, useEffect } from "react"
import axios from "axios"
import { View, StyleSheet, Image, Text } from "react-native"

import { SearchBar } from "@rneui/themed"
import { Card } from "@rneui/themed"

const styles = StyleSheet.create({
	header: {
		backgroundColor: "#5B6BF5",
		margin: 0,
		borderBottomEndRadius: 12,
		borderBottomLeftRadius: 12,
		borderWidth: 0,
	},

	headerWelcome: {
		color: "#fff",
		fontWeight: "bold",
	},

	headerUser: {
		alignItems: "center",
		flexDirection: "row",
		gap: 12,
	},

	categories: {
		padding: "2rem",
		paddingBottom: "0rem",
		minWidth: "100%",
		gap: 20,
	},

	categoriesCards: {
		backgroundColor: "#FFF",
		margin: 0,
		display: 1,
		justifyContent: "center",
		alignItems: "center",
		borderRadius: 12,
		maxWidth: 200,
	},

	categoriesTitles: {
		color: "#000",
		fontWeight: "bold",
		textAlign: "center",
	},

	cardCat: {
		textAlign: "center",
		color: "#888888",
	},

	cardFlex: {
		flexDirection: "row",
		flexWrap: "wrap",
		justifyContent: "center",
		gap: 10,
		minWidth: 100,
	},

	doctorsCards: {
		flexDirection: "row",
		alignItems: "center",
		backgroundColor: "#FFF",
		margin: 0,
		borderRadius: 12,
		minWidth: "100%",
	},

	docText: {
		color: "#888888",
	},

	image: {
		width: 80,
		height: 80,
		borderRadius: 50,
	},

	imageCat: {
		width: 80,
		height: 80,
	},

	name: {
		fontSize: 16,
		marginTop: 5,
		color: "#fff",
	},

	doctorsView: {
		gap: 20,
		padding: "2rem",
	},

	doctorFlex: {
		flexDirection: "column",
		gap: "1rem",
		minWidth: "100%",
		overflow: "auto",
	},
})

export function Home() {
	const [search, setSearch] = useState("")
	const [categories, setCategories] = useState([])
	const [user, setUser] = useState([])
	const [doctors, setDoctors] = useState([])

	const fetchData = async () => {
		try {
			const [getUser, getCat, getDoc] = await Promise.all([
				axios.get("http://localhost:3000/user"),
				axios.get("http://localhost:3000/categories"),
				axios.get("http://localhost:3000/doctors")
			])
	
			setUser(getUser.data)
			setCategories(getCat.data)
			setDoctors(getDoc.data)
		} catch (e) {
			console.log(e)
		}
	}

	useEffect(() => {
		fetchData()
	}, [])

	const updateSearch = (search) => {
		setSearch(search)
	}

	return (
		<>
			<Card containerStyle={styles.header}>
				<View style={styles.headerUser}>
				{user.map((user) => {
					return (
					<View
					key={user.name}>
						<Image
							
							style={styles.image}
							resizeMode="cover"
							source={user.avatar}
						/>
						<View>
							<Text style={styles.headerWelcome}>Welcome</Text>
							<Text style={styles.name}>{user.name}</Text>
						</View>
					</View>
					)
					})}
				</View>	
				<SearchBar
					placeholder="Search doctor"
					onChangeText={updateSearch}
					value={search}
					containerStyle={{
						backgroundColor: "transparent",
						borderBottomColor: "transparent",
						borderTopColor: "transparent",
					}}
					inputContainerStyle={{
						backgroundColor: "#fff",
						borderRadius: 6,
						height: 60,
					}}
				/>
			</Card>

			<View style={styles.categories}>
				<View
					style={{
						flexDirection: "row",
						justifyContent: "space-between",
					}}
				>
					<Text style={styles.categoriesTitles}>Categories</Text>
					<Text style={styles.categoriesTitles}>Show All</Text>
				</View>

				<View style={styles.cardFlex}>
					{categories.map((cat) => {
						return (
							<Card
								key={cat.title}
								containerStyle={styles.categoriesCards}
							>
								<Image
									style={styles.imageCat}
									resizeMode="cover"
									source={cat.img}
								/>
								<Text style={styles.cardCat}>{cat.title}</Text>
							</Card>
						)
					})}
				</View>
			</View>

			<View style={styles.doctorsView}>
				<Text style={{ fontWeight: "bold" }}>Top doctors</Text>
				<View style={styles.doctorFlex}>
					{doctors.map((doc) => {
						return (
							<Card
								key={doc.name}
								containerStyle={styles.doctorsCards}
							>
								<View
									style={{
										flexDirection: "row",
										alignItems: "center",
										gap: 12,
									}}
								>
									<Image
										style={styles.image}
										resizeMode="cover"
										source={doc.image}
									/>
									<View>
										<Text style={styles.docText}>
											{doc.name}
										</Text>
										<Text style={styles.docText}>
											{doc.acting}
										</Text>
										<Text style={styles.docText}>
											{doc.review}
										</Text>
									</View>
								</View>
							</Card>
						)
					})}
				</View>
			</View>
		</>
	)
}
