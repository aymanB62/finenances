import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, ScrollView } from 'react-native';
import NavigationBar from '../components/NavigationBar';
import { validateHucha } from '../utils/validators'; // Import the validator

export default function CreateHuchaScreen() {
  const [name, setName] = useState('');
  const [target, setTarget] = useState('');
  const [description, setDescription] = useState('');
  const [errors, setErrors] = useState({
    name: '',
    target: ''
  });

  const handleCreate = () => {
    // Reset errors
    setErrors({ name: '', target: '' });

    // Convert target to number
    const targetNumber = parseFloat(target.replace(',', '.'));

    // Validate using your validator
    const isValid = validateHucha({
      name: name.trim(),
      meta: targetNumber
    });

    if (!isValid) {
      const newErrors = {
        name: name.trim() ? '' : 'Pot name is required',
        target: targetNumber > 0 ? '' : 'Target must be greater than 0'
      };
      setErrors(newErrors);
      return;
    }

    // Proceed with creation
    console.log('Creating valid hucha:', { 
      name: name.trim(), 
      target: targetNumber,
      description 
    });
    
    // Reset form
    setName('');
    setTarget('');
    setDescription('');
  };

  return (
    <View style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContent}>
        <Text style={styles.title}>Create New Savings Pot</Text>
        
        <View style={styles.form}>
          <Text style={styles.label}>Pot Name</Text>
          <TextInput
            style={[styles.input, errors.name && styles.inputError]}
            placeholder="e.g., Vacation Fund"
            placeholderTextColor="#A8A8A8"
            value={name}
            onChangeText={(text) => {
              setName(text);
              setErrors(prev => ({ ...prev, name: '' }));
            }}
          />
          {errors.name ? <Text style={styles.errorText}>{errors.name}</Text> : null}

          <Text style={styles.label}>Target Amount</Text>
          <TextInput
            style={[styles.input, errors.target && styles.inputError]}
            placeholder="€0.00"
            placeholderTextColor="#A8A8A8"
            value={target}
            onChangeText={(text) => {
              setTarget(text);
              setErrors(prev => ({ ...prev, target: '' }));
            }}
            keyboardType="decimal-pad"
          />
          {errors.target ? <Text style={styles.errorText}>{errors.target}</Text> : null}

          <Text style={styles.label}>Description (optional)</Text>
          <TextInput
            style={[styles.input, styles.multilineInput]}
            placeholder="Add some notes about your savings goal..."
            placeholderTextColor="#A8A8A8"
            value={description}
            onChangeText={setDescription}
            multiline
            numberOfLines={4}
          />
          
          <TouchableOpacity 
            style={styles.button} 
            onPress={handleCreate}
            activeOpacity={0.8}
          >
            <Text style={styles.buttonText}>Create Pot</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>

      <NavigationBar />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5FFF9',
  },
  scrollContent: {
    padding: 24,
    paddingBottom: 100, // Space for navigation bar
  },
  title: {
    fontSize: 28,
    fontWeight: '700',
    color: '#00C89C',
    marginBottom: 32,
    textAlign: 'center',
  },
  inputError: {
      borderColor: '#E53E3E',
      backgroundColor: '#FEE2E2',
    },
    errorText: {
      color: '#E53E3E',
      fontSize: 12,
      marginTop: 4,
      marginLeft: 8,
    },
  form: {
    gap: 20,
  },
  label: {
    fontSize: 16,
    color: '#2D3748',
    marginBottom: 8,
    fontWeight: '500',
  },
  input: {
    backgroundColor: '#FFFFFF',
    padding: 16,
    borderRadius: 12,
    fontSize: 16,
    color: '#2D3748',
    borderWidth: 1,
    borderColor: '#E2E8F0',
  },
  multilineInput: {
    height: 120,
    textAlignVertical: 'top',
  },
  button: {
    backgroundColor: '#00C89C',
    padding: 18,
    borderRadius: 30,
    alignItems: 'center',
    marginTop: 24,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 6,
    elevation: 3,
  },
  buttonText: {
    color: '#FFFFFF',
    fontWeight: '700',
    fontSize: 16,
    letterSpacing: 0.5,
  },
});