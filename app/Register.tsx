import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  ActivityIndicator,
  Alert,
  ScrollView
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { useRouter } from 'expo-router';
import { api } from '../services/api'; // Importa el API real

const RegisterScreen: React.FC = () => {
  const router = useRouter();
  const [username, setUsername] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const isValidEmail = (email: string) => {
    const regex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    return regex.test(email);
  };

  const register = async () => {
    const trimmedUsername = username.trim();
    const trimmedPassword = password.trim();

    if (!trimmedUsername || !trimmedPassword) {
      Alert.alert('Error', 'Por favor completa todos los campos');
      return;
    }

    if (!isValidEmail(trimmedUsername)) {
      Alert.alert('Error', 'Ingresa un correo válido');
      return;
    }

    if (trimmedPassword.length < 8) {
      Alert.alert('Error', 'La contraseña debe tener al menos 8 caracteres');
      return;
    }

    setIsLoading(true);

    try {
      // Se realiza el registro sin esperar un token
      await api.register(trimmedUsername, trimmedPassword);
      // Se redirige a la pantalla de Login tras un registro exitoso
      router.push('./Login');
    } catch (error: any) {
      Alert.alert('Error en registro', error.toString());
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <LinearGradient
      colors={['#0F2027', '#203A43', '#2C5364']}
      style={styles.container}
    >
      <ScrollView
        contentContainerStyle={styles.scrollContainer}
        keyboardShouldPersistTaps="handled"
      >
        <Text style={styles.title}>REGISTRO</Text>

        <RoundedTextField
          value={username}
          onChangeText={setUsername}
          placeholder="Coloca tu correo"
          keyboardType="email-address"
        />

        <RoundedTextField
          value={password}
          onChangeText={setPassword}
          placeholder="Coloca tu contraseña"
          secureTextEntry
        />

        {isLoading ? (
          <ActivityIndicator color="#fff" style={styles.loading} />
        ) : (
          <TouchableOpacity style={styles.button} onPress={register}>
            <Text style={styles.buttonText}>ENTRAR</Text>
          </TouchableOpacity>
        )}

        <TouchableOpacity onPress={() => router.push('./Login')}>
          <Text style={styles.loginText}>¿Ya tienes cuenta? Iniciar sesión</Text>
        </TouchableOpacity>
      </ScrollView>
    </LinearGradient>
  );
};

interface RoundedTextFieldProps {
  value: string;
  onChangeText: (text: string) => void;
  placeholder: string;
  secureTextEntry?: boolean;
  keyboardType?: any;
}

const RoundedTextField: React.FC<RoundedTextFieldProps> = ({
  value,
  onChangeText,
  placeholder,
  secureTextEntry = false,
  keyboardType = 'default',
}) => (
  <View style={styles.textFieldContainer}>
    <TextInput
      value={value}
      onChangeText={onChangeText}
      placeholder={placeholder}
      placeholderTextColor="#ccc"
      secureTextEntry={secureTextEntry}
      keyboardType={keyboardType}
      style={styles.textField}
    />
  </View>
);

const styles = StyleSheet.create({
  container: { flex: 1 },
  scrollContainer: {
    paddingHorizontal: 32,
    paddingVertical: 48,
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 24,
    textAlign: 'center',
  },
  textFieldContainer: {
    width: '100%',
    marginVertical: 8,
    shadowColor: '#000',
    shadowOpacity: 0.2,
    shadowOffset: { width: 2, height: 4 },
    shadowRadius: 4,
    elevation: 2,
  },
  textField: {
    width: '100%',
    paddingVertical: 16,
    paddingHorizontal: 24,
    borderRadius: 12,
    backgroundColor: '#00000090',
    color: '#fff',
    fontSize: 16,
  },
  button: {
    width: '100%',
    paddingVertical: 16,
    borderRadius: 12,
    backgroundColor: '#9733EE',
    marginTop: 32,
    alignItems: 'center',
  },
  buttonText: { fontSize: 18, color: '#fff' },
  loginText: {
    marginTop: 16,
    fontSize: 16,
    color: '#fff',
    textDecorationLine: 'underline',
  },
  loading: { marginTop: 32 },
});

export default RegisterScreen;
