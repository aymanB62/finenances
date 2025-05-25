import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Image,
  StyleSheet,
  SafeAreaView,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { RootNavigationProp } from '../types/navigation';
import { validateEmail, validatePassword } from '../utils/validators'; // Import validators

export default function SignUpScreen() {
  const navigation = useNavigation<RootNavigationProp>();
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errors, setErrors] = useState({
    fullName: '',
    email: '',
    password: ''
  });

  const handleSignUp = () => {
    // Reset errors
    setErrors({ fullName: '', email: '', password: '' });

    // Validate inputs
    let isValid = true;
    const newErrors = { fullName: '', email: '', password: '' };

    if (!fullName.trim()) {
      newErrors.fullName = 'Full name is required';
      isValid = false;
    }

    if (!validateEmail(email)) {
      newErrors.email = 'Invalid email address';
      isValid = false;
    }

    if (!validatePassword(password)) {
      newErrors.password = 'Password must be at least 6 characters';
      isValid = false;
    }

    if (!isValid) {
      setErrors(newErrors);
      return;
    }

    // Proceed with signup
    navigation.navigate('Home');
  };

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}>Create Account</Text>

      <View style={styles.formContainer}>
        <Text style={styles.label}>Full Name</Text>
        <TextInput
          style={[styles.input, errors.fullName && styles.inputError]}
          placeholder="John Doe"
          placeholderTextColor="#A8A8A8"
          value={fullName}
          onChangeText={setFullName}
        />
        {errors.fullName ? <Text style={styles.errorText}>{errors.fullName}</Text> : null}

        <Text style={styles.label}>Email</Text>
        <TextInput
          style={[styles.input, errors.email && styles.inputError]}
          placeholder="example@example.com"
          placeholderTextColor="#A8A8A8"
          keyboardType="email-address"
          autoCapitalize="none"
          value={email}
          onChangeText={setEmail}
        />
        {errors.email ? <Text style={styles.errorText}>{errors.email}</Text> : null}

        <Text style={styles.label}>Password</Text>
        <TextInput
          style={[styles.input, errors.password && styles.inputError]}
          placeholder="********"
          secureTextEntry
          placeholderTextColor="#A8A8A8"
          value={password}
          onChangeText={setPassword}
        />
        {errors.password ? <Text style={styles.errorText}>{errors.password}</Text> : null}

        <TouchableOpacity 
          style={styles.signupButton} 
          onPress={handleSignUp}
        >
          <Text style={styles.signupButtonText}>Sign Up</Text>
        </TouchableOpacity>

        <Text style={styles.orText}>or sign up with</Text>

        <View style={styles.socialIcons}>
          <Image source={require('../assets/facebook.png')} style={styles.icon} />
          <Image source={require('../assets/google.png')} style={styles.icon} />
        </View>

        <TouchableOpacity onPress={() => navigation.navigate('Login')}>
          <Text style={styles.loginText}>
            Already have an account? <Text style={styles.loginLink}>Log In</Text>
          </Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#E9F9E9',
    alignItems: 'center',
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    marginTop: 40,
    color: '#000',
  },
  formContainer: {
    width: '90%',
    backgroundColor: '#fff',
    borderRadius: 30,
    padding: 20,
    marginTop: 20,
  },
  label: {
    fontSize: 14,
    color: '#222',
    marginTop: 15,
    marginBottom: 5,
  },
  inputError: {
      borderWidth: 1,
      borderColor: '#E53E3E',
    },
    errorText: {
      color: '#E53E3E',
      fontSize: 12,
      marginTop: 4,
      marginLeft: 8,
    },
  input: {
    backgroundColor: '#D8F2DB',
    borderRadius: 12,
    padding: 12,
    fontSize: 16,
  },
  signupButton: {
    backgroundColor: '#00C89C',
    paddingVertical: 14,
    borderRadius: 30,
    marginTop: 30,
    alignItems: 'center',
  },
  signupButtonText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16,
  },
  orText: {
    textAlign: 'center',
    marginTop: 20,
    color: '#333',
  },
  socialIcons: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 10,
    gap: 20,
  },
  icon: {
    width: 32,
    height: 32,
  },
  loginText: {
    textAlign: 'center',
    marginTop: 20,
    fontSize: 13,
    color: '#333',
  },
  loginLink: {
    color: '#0055FF',
    fontWeight: 'bold',
  },
});