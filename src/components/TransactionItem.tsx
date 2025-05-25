import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Hucha, Movimiento } from '../types/types';

interface Props {
  movimiento: Movimiento;
  huchas: Hucha[]; // Add this line

}

export default function TransactionItem({ movimiento, huchas }: Props) {
  const relatedHucha = huchas.find(h => h.hucha_id === movimiento.hucha_id);

  return (
    <View style={styles.container}>
      <View style={styles.leftColumn}>
        <Text style={styles.amount}>{movimiento.cantidad}€</Text>
        <Text style={styles.huchaName}>
          {relatedHucha?.name || 'Unknown Pot'}
        </Text>
      </View>
      <Text style={styles.date}>
        {new Date(movimiento.fecha).toLocaleDateString()}
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    backgroundColor: 'white',
    padding: 12,
    borderRadius: 8,
    marginBottom: 8,
  },
  huchaName: {
    fontSize: 14,
    color: '#666',
    marginTop: 4,
  },
  leftColumn: {
    flex: 1,
  },
  amount: {
    fontSize: 16,
    fontWeight: '500',
  },
  date: {
    color: '#666',
    fontSize: 12,
  },
  description: {
    color: '#666',
    maxWidth: '50%',
  },
});