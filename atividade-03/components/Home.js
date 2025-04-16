import React from "react"
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

	image: {
		width: 80,
		height: 80,
		borderRadius: 50,
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
	const [search, setSearch] = React.useState("")

	const updateSearch = (search) => {
		setSearch(search)
	}

	const user = {
		name: "Dani Martinez",
		avatar: "https://familydoctor.org/wp-content/uploads/2018/02/41808433_l.jpg",
	}

	const categories = [
		{
			img: "https://familydoctor.org/wp-content/uploads/2018/02/41808433_l.jpg",
			title: "Consultation",
		},
		{
			img: "https://familydoctor.org/wp-content/uploads/2018/02/41808433_l.jpg",
			title: "Dentist",
		},
		{
			img: "https://familydoctor.org/wp-content/uploads/2018/02/41808433_l.jpg",
			title: "Cardiologist",
		},
		{
			img: "https://familydoctor.org/wp-content/uploads/2018/02/41808433_l.jpg",
			title: "Hospital",
		},
		{
			img: "https://familydoctor.org/wp-content/uploads/2018/02/41808433_l.jpg",
			title: "Emergency",
		},
		{
			img: "https://familydoctor.org/wp-content/uploads/2018/02/41808433_l.jpg",
			title: "Laboratory",
		},
	]

	const doctors = [
		{
			image: "https://familydoctor.org/wp-content/uploads/2018/02/41808433_l.jpg",
			name: "Olivia Wilson",
			acting: "Consultant - Physiotherapy",
			review: "⭐ 4.9 (37 Reviews)",
		},
		{
			image: "https://familydoctor.org/wp-content/uploads/2018/02/41808433_l.jpg",
			name: "Jhonatan Patterson",
			acting: "Consultant - Physiotherapy",
			review: "⭐ 4.9 (37 Reviews)",
		},
	]

	return (
		<>
			<Card containerStyle={styles.header}>
				<View style={styles.headerUser}>
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
									style={styles.image}
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
										<Text style={styles.cardCat}>
											{doc.name}
										</Text>
										<Text style={styles.cardCat}>
											{doc.acting}
										</Text>
										<Text style={styles.cardCat}>
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
