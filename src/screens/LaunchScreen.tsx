import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image, SafeAreaView, Dimensions } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { RootNavigationProp } from '../types/navigation';

const { width } = Dimensions.get('window');


const LaunchScreen = () => {
  const navigation = useNavigation<RootNavigationProp>();

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.topContainer}>
        <Image
          source={require('../assets/logo.png')}
          style={styles.logo}
          resizeMode="contain"
        />
        <Text style={styles.title}>FineNances</Text>
      </View>

      <View style={styles.formContainer}>
        <TouchableOpacity 
          style={styles.loginButton}
          onPress={() => navigation.navigate('Login')}>
          <Text style={styles.loginButtonText}>Log In</Text>
        </TouchableOpacity>

        <TouchableOpacity 
          style={styles.signUpButton}
          onPress={() => navigation.navigate('SignUp')}>
          <Text style={styles.signUpButtonText}>Sign Up</Text>
        </TouchableOpacity>

        <TouchableOpacity>
          <Text style={styles.forgotText}>Forgot Password?</Text>
        </TouchableOpacity>

        <View style={styles.socialIcons}>
          <Image source={require('../assets/facebook.png')} style={styles.icon} />
          <Image source={require('../assets/google.png')} style={styles.icon} />
        </View>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#E9F9E9',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  topContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
  },
  logo: {
    width: width * 0.5,  // 50% of screen width
    height: width * 0.5,  // Makes it square
    marginBottom: 20,
  },
  title: {
    fontSize: width * 0.1,  // Responsive font size (10% of screen width)
    fontWeight: 'bold',
    color: '#00C89C',
    textAlign: 'center',
  },
  formContainer: {
    width: '90%',
    backgroundColor: '#fff',
    borderRadius: 30,
    padding: 20,
    marginBottom: 20,
  },
  loginButton: {
    backgroundColor: '#00C89C',
    paddingVertical: 14,
    borderRadius: 30,
    marginTop: 10,
    alignItems: 'center',
  },
  loginButtonText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16,
  },
  signUpButton: {
    backgroundColor: '#D8F2DB',
    paddingVertical: 14,
    borderRadius: 30,
    marginTop: 15,
    alignItems: 'center',
  },
  signUpButtonText: {
    color: '#000',
    fontWeight: 'bold',
    fontSize: 16,
  },
  forgotText: {
    color: '#000',
    fontSize: 13,
    textAlign: 'center',
    marginTop: 15,
  },
  socialIcons: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 20,
    gap: 20,
  },
  icon: {
    width: 32,
    height: 32,
  },
});

export default LaunchScreen;