import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  ActivityIndicator,
  Alert
} from 'react-native';
import { useRouter } from 'expo-router';
import { api } from '../services/api';

const Login: React.FC = () => {
  const router = useRouter();
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const handleLogin = async () => {
    if (!email || !password) {
      Alert.alert('Error', 'Por favor ingresa correo y contraseña');
      return;
    }
    setIsLoading(true);
    try {
      const token = await api.login(email, password);
      if (token) {
        // Navegar a la pantalla de lista de notas
        router.push('/notes-list');
      } else {
        throw new Error('Credenciales incorrectas');
      }
    } catch (error: any) {
      Alert.alert('Error', error.toString());
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.card}>
        <Text style={styles.title}>INICIAR SESIÓN</Text>

        <TextInput
          style={styles.input}
          placeholder="Correo"
          placeholderTextColor="#ccc"
          keyboardType="email-address"
          value={email}
          onChangeText={setEmail}
        />

        <TextInput
          style={styles.input}
          placeholder="Contraseña"
          placeholderTextColor="#ccc"
          secureTextEntry
          value={password}
          onChangeText={setPassword}
        />

        <TouchableOpacity
          style={styles.button}
          onPress={handleLogin}
          disabled={isLoading}
        >
          {isLoading ? (
            <ActivityIndicator color="#fff" />
          ) : (
            <Text style={styles.buttonText}>INICIAR SESIÓN</Text>
          )}
        </TouchableOpacity>

        {/* Botón para ir a la pantalla de registro */}
        <TouchableOpacity onPress={() => router.push('./Register')}>
          <Text style={styles.registerText}>¿No tienes cuenta? Regístrate</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0F2027',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 32,
  },
  card: {
    width: '100%',
    maxWidth: 400,
    backgroundColor: '#203A43',
    padding: 32,
    borderRadius: 12,
    alignItems: 'center',
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: 'white',
    marginBottom: 32,
  },
  input: {
    width: '100%',
    padding: 16,
    marginTop: 16,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#ccc',
    backgroundColor: '#222',
    color: 'white',
    fontSize: 16,
  },
  button: {
    width: '100%',
    padding: 16,
    borderRadius: 12,
    backgroundColor: '#9733EE',
    marginTop: 32,
    alignItems: 'center',
  },
  buttonText: {
    fontSize: 18,
    color: 'white',
  },
  registerText: {
    marginTop: 16,
    color: 'white',
    textDecorationLine: 'underline',
  },
});

export default Login;
