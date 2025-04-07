import { useRouter } from 'expo-router';
import React, { useState } from 'react';
import { View, StyleSheet, TouchableOpacity, Image, Alert, Text } from 'react-native';
import * as ImagePicker from 'expo-image-picker';

export default function FotosScreen() {
  const router = useRouter();
  const [imageUri, setImageUri] = useState<string | null>(null);

  const pickImage = async () => {
    // Solicitar permiso para acceder a la galería
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (status !== 'granted') {
      Alert.alert('Permiso denegado', 'Necesitamos permisos para acceder a la galería.');
      return;
    }
    // Abrir la galería y permitir seleccionar una imagen
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images, // También podrías actualizar a: ImagePicker.MediaType.Images
      allowsEditing: true,
      quality: 1,
    });
    // Si no cancela la selección, guardar la URI de la imagen en el estado
    if (!result.canceled && result.assets && result.assets.length > 0) {
      setImageUri(result.assets[0].uri);
    }
  };

  return (
    <View style={styles.container}>
      {/* Botón para seleccionar imagen en la parte superior */}
      <TouchableOpacity style={styles.pickImageButton} onPress={pickImage}>
        <Text style={styles.pickImageButtonText}>Seleccionar Imagen</Text>
      </TouchableOpacity>

      {/* Mostrar la imagen seleccionada (si existe) */}
      {imageUri && (
        <Image source={{ uri: imageUri }} style={styles.image} />
      )}

      {/* Botón para volver */}
      <TouchableOpacity onPress={() => router.back()} style={styles.backButton}>
        <Text style={styles.backButtonText}>Volver</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    padding: 16,
    alignItems: 'center',
    justifyContent: 'flex-start',
  },
  pickImageButton: {
    paddingVertical: 10,
    paddingHorizontal: 16,
    backgroundColor: '#6200ee',
    borderRadius: 5,
    marginBottom: 10,
  },
  pickImageButtonText: {
    color: '#fff',
    fontSize: 16,
  },
  image: {
    width: 300,
    height: 300,
    resizeMode: 'contain',
    marginBottom: 10,
  },
  backButton: {
    paddingVertical: 10,
    paddingHorizontal: 16,
    backgroundColor: '#6200ee',
    borderRadius: 5,
  },
  backButtonText: {
    color: '#fff',
    fontSize: 16,
  },
});
