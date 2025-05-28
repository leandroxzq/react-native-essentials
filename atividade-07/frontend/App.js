import React, { useState, useEffect } from "react"
import {
	View,
	StyleSheet,
	Button,
	Image,
	FlatList,
	ActivityIndicator,
	Alert,
	TouchableOpacity,
	Text,
} from "react-native"
import * as ImagePicker from "expo-image-picker"

const CLOUD_NAME = process.env.EXPO_PUBLIC_CLOUD_NAME
const UPLOAD_PRESET = process.env.EXPO_PUBLIC_PRESET
const BACKEND_URL = process.env.EXPO_PUBLIC_BACKEND_URL

export default function App() {
	const [images, setImages] = useState([])
	const [uploading, setUploading] = useState(false)
	const [loadingImages, setLoadingImages] = useState(false)

	useEffect(() => {
		;(async () => {
			const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync()
			if (status !== "granted") {
				Alert.alert(
					"Permissão necessária",
					"Precisamos da sua permissão para acessar a galeria."
				)
			} else {
				loadImages()
			}
		})()
	}, [])

	const pickImage = async () => {
		const result = await ImagePicker.launchImageLibraryAsync({
			mediaTypes: ImagePicker.MediaTypeOptions.Images,
			quality: 1,
		})

		if (!result.canceled) {
			uploadToCloudinary(result.assets[0])
		}
	}

	const uploadToCloudinary = async (photo) => {
		setUploading(true)
		const data = new FormData()
		data.append("file", {
			uri: photo.uri,
			type: photo.mimeType || "image/jpeg",
			name: photo.fileName || "upload.jpg",
		})
		data.append("upload_preset", UPLOAD_PRESET)
		data.append("tags", "aula7ifpe")

		try {
			const res = await fetch(
				`https://api.cloudinary.com/v1_1/${CLOUD_NAME}/image/upload`,
				{
					method: "POST",
					body: data,
					headers: {
						"Content-Type": "multipart/form-data",
					},
				}
			)
			const result = await res.json()
			if (result.secure_url) {
				setImages((prev) => [result, ...prev])
			} else {
				Alert.alert("Erro no upload", "Falha ao enviar imagem para Cloudinary")
			}
		} catch (error) {
			Alert.alert(
				"Erro no upload",

				error.message
			)
		} finally {
			setUploading(false)
		}
	}

	const loadImages = async () => {
		setLoadingImages(true)
		try {
			const res = await fetch(`${BACKEND_URL}/images?tag=aula7ifpe`)
			const data = await res.json()
			setImages(data)
		} catch (error) {
			Alert.alert("Erro", "Falha ao carregar imagens")
		} finally {
			setLoadingImages(false)
		}
	}

	const deleteImage = (public_id) => {
		Alert.alert(
			"Confirmar exclusão",
			"Tem certeza que deseja deletar esta imagem?",
			[
				{ text: "Cancelar", style: "cancel" },
				{
					text: "Deletar",
					style: "destructive",
					onPress: async () => {
						try {
							const res = await fetch(`${BACKEND_URL}/delete-image`, {
								method: "DELETE",
								headers: { "Content-Type": "application/json" },
								body: JSON.stringify({ public_id }),
							})
							const json = await res.json()

							if (json.result === "ok") {
								setImages((prev) =>
									prev.filter((img) => img.public_id !== public_id)
								)
								Alert.alert("Sucesso", "Imagem deletada")
							} else {
								Alert.alert("Erro", "Falha ao deletar imagem")
							}
						} catch (error) {
							Alert.alert("Erro", error.message)
						}
					},
				},
			]
		)
	}

	const renderItem = ({ item }) => (
		<View style={styles.imageContainer}>
			<Image source={{ uri: item.secure_url }} style={styles.image} />
			<TouchableOpacity
				onPress={() => deleteImage(item.public_id)}
				style={styles.deleteButton}
			>
				<Text style={styles.deleteText}>Deletar</Text>
			</TouchableOpacity>
		</View>
	)

	return (
		<View style={styles.container}>
			<Button title="Selecionar imagem" onPress={pickImage} />
			{uploading && (
				<ActivityIndicator
					size="large"
					color="#0000ff"
					style={{ marginTop: 10 }}
				/>
			)}
			{loadingImages ? (
				<ActivityIndicator
					size="large"
					color="green"
					style={{ marginTop: 20 }}
				/>
			) : (
				<FlatList
					data={images}
					keyExtractor={(item) => item.public_id}
					renderItem={renderItem}
					contentContainerStyle={{ marginTop: 20 }}
				/>
			)}
		</View>
	)
}

const styles = StyleSheet.create({
	container: { flex: 1, paddingTop: 60, paddingHorizontal: 20 },
	imageContainer: {
		flexDirection: "row",
		alignItems: "center",
		marginBottom: 15,
		gap: 10,
	},
	image: { width: 120, height: 120, borderRadius: 8 },
	deleteButton: {
		backgroundColor: "#ff4d4d",
		paddingVertical: 8,
		paddingHorizontal: 12,
		borderRadius: 6,
	},
	deleteText: { color: "#fff", fontWeight: "bold" },
})
