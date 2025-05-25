// screens/LoginScreen.tsx
import React from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Image,
  StyleSheet,
  SafeAreaView
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { RootNavigationProp } from '../types/navigation';


export default function LoginScreen() {
  const navigation = useNavigation<RootNavigationProp>();


  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.welcome}>Welcome</Text>

      <View style={styles.formContainer}>
        <Text style={styles.label}>Username Or Email</Text>
        <TextInput
          style={styles.input}
          placeholder="example@example.com"
          placeholderTextColor="#A8A8A8"
        />

        <Text style={styles.label}>Password</Text>
        <View style={styles.passwordWrapper}>
          <TextInput
            style={[styles.input, { flex: 1 }]}
            placeholder="********"
            secureTextEntry
          />
          {/* You can add an eye icon here later */}
        </View>

        <TouchableOpacity 
        style={styles.loginButton} 
        onPress={() => navigation.navigate('Home')}
      >
          <Text style={styles.loginButtonText}>Log In</Text>
        </TouchableOpacity>

        <TouchableOpacity>
          <Text style={styles.forgotText}>Forgot Password?</Text>
        </TouchableOpacity>

        <TouchableOpacity 
        style={styles.signUpButton} 
        onPress={() => navigation.navigate('SignUp')}
      >
        <Text style={styles.signUpButtonText}>Sign Up</Text>
      </TouchableOpacity>

        <Text style={styles.orText}>or sign up with</Text>

        <View style={styles.socialIcons}>
          <Image source={require('../assets/facebook.png')} style={styles.icon} />
          <Image source={require('../assets/google.png')} style={styles.icon} />
        </View>

        <Text style={styles.signupBottomText}>
          Don’t have an account? <Text style={styles.signupLink}>Sign Up</Text>
        </Text>
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
    welcome: {
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
    input: {
      backgroundColor: '#D8F2DB',
      borderRadius: 12,
      padding: 12,
      fontSize: 16,
    },
    passwordWrapper: {
      flexDirection: 'row',
      alignItems: 'center',
    },
    loginButton: {
      backgroundColor: '#00C89C',
      paddingVertical: 14,
      borderRadius: 30,
      marginTop: 30,
      alignItems: 'center',
    },
    loginButtonText: {
      color: '#fff',
      fontWeight: 'bold',
      fontSize: 16,
    },
    forgotText: {
      color: '#000',
      fontSize: 13,
      textAlign: 'center',
      marginTop: 10,
    },
    signUpButton: {
      backgroundColor: '#D8F2DB',
      paddingVertical: 14,
      borderRadius: 30,
      marginTop: 10,
      alignItems: 'center',
    },
    signUpButtonText: {
      color: '#000',
      fontWeight: 'bold',
      fontSize: 16,
    },
    fingerprintText: {
      marginTop: 10,
      textAlign: 'center',
      fontSize: 13,
      color: '#000',
    },
    fingerprintHighlight: {
      color: '#0055FF',
      fontWeight: 'bold',
    },
    orText: {
      textAlign: 'center',
      marginTop: 15,
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
    signupBottomText: {
      textAlign: 'center',
      marginTop: 20,
      fontSize: 13,
      color: '#333',
    },
    signupLink: {
      color: '#0055FF',
      fontWeight: 'bold',
    },
  });
  