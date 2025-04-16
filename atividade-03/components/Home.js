import React from "react"
import { View, StyleSheet, Image, Text } from "react-native"

import { SearchBar } from "@rneui/themed"
import { Card } from "@rneui/themed"

import img1 from "../img/1.png"
import img2 from "../img/2.png"
import img3 from "../img/3.png"
import img4 from "../img/4.png"
import img5 from "../img/5.png"
import img6 from "../img/6.png"

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
	const [search, setSearch] = React.useState("")

	const updateSearch = (search) => {
		setSearch(search)
	}

	const user = {
		name: "Dani Martinez",
		avatar: "https://brasil.emeritus.org/wp-content/uploads/2020/01/gesta%CC%83o-de-pessoas-.jpg.optimal.jpg",
	}

	const categories = [
		{
			img: img1,
			title: "Consultation",
		},
		{
			img: img2,
			title: "Dentist",
		},
		{
			img: img3,
			title: "Cardiologist",
		},
		{
			img: img4,
			title: "Hospital",
		},
		{
			img: img5,
			title: "Emergency",
		},
		{
			img: img6,
			title: "Laboratory",
		},
	]

	const doctors = [
		{
			image: "https://portalhospitaisbrasil.com.br/wp-content/uploads/2021/05/Foto-doutora-Ana-Elisa.jpg",
			name: "Olivia Wilson",
			acting: "Consultant - Physiotherapy",
			review: "⭐ 4.9 (37 Reviews)",
		},
		{
			image: "https://media.istockphoto.com/id/1470505351/es/foto/retrato-de-un-m%C3%A9dico-sonriente-sosteniendo-gafas-y-un-tel%C3%A9fono-m%C3%B3vil-en-la-oficina.jpg?s=612x612&w=0&k=20&c=OIYevrDE-A0xcWS3PpTEYGDh5yQt9ordPOGBYEqAegg=",
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
