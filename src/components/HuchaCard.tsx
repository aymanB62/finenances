// components/HuchaCard.tsx
import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, TextInput } from 'react-native';
import { Hucha } from '../types/types';

interface Props {
  hucha: Hucha;
  onAddFunds: (amount: number) => void;
}

export default function HuchaCard({ hucha, onAddFunds }: Props) {
  const [amount, setAmount] = useState('');
  const progress = (hucha.saldo_actual / hucha.meta) * 100;

  return (
    <View style={styles.card}>
      <View style={styles.header}>
        <Text style={styles.name}>{hucha.name}</Text>
        <Text style={styles.amount}>€{hucha.saldo_actual}</Text>
      </View>

      <View style={styles.progressBar}>
        <View style={[styles.progressFill, { width: `${progress}%` }]} />
      </View>

      <View style={styles.footer}>
        <TextInput
          style={styles.input}
          placeholder="Amount"
          keyboardType="numeric"
          value={amount}
          onChangeText={setAmount}
        />
        <TouchableOpacity 
          style={styles.button}
          onPress={() => {
            const numericAmount = parseFloat(amount);
            if (!isNaN(numericAmount)) {
              onAddFunds(numericAmount);
              setAmount('');
            }
          }}
        >
          <Text style={styles.buttonText}>Add Funds</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

// Add input and button styles to existing styles

const styles = StyleSheet.create({
  // Existing styles
  card: {
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    padding: 16,
    marginBottom: 16,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 6,
    elevation: 3,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 8,
  },
  name: {
    fontSize: 16,
    fontWeight: '600',
    color: '#2D3748',
  },
  amount: {
    fontSize: 16,
    color: '#00C89C',
  },
  progressBar: {
    height: 8,
    backgroundColor: '#E9F9E9',
    borderRadius: 4,
    overflow: 'hidden',
    marginVertical: 8,
  },
  progressFill: {
    height: '100%',
    backgroundColor: '#00C89C',
    borderRadius: 4,
  },
  
  // New footer styles
  footer: {
    flexDirection: 'row',
    gap: 8,
    marginTop: 12,
  },
  input: {
    flex: 1,
    backgroundColor: '#D8F2DB',
    borderRadius: 8,
    padding: 12,
    fontSize: 16,
    color: '#2D3748',
  },
  button: {
    backgroundColor: '#00C89C',
    borderRadius: 8,
    paddingVertical: 12,
    paddingHorizontal: 16,
    justifyContent: 'center',
  },
  buttonText: {
    color: '#FFFFFF',
    fontWeight: '600',
    fontSize: 14,
  },
});