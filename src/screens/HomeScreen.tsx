import React from 'react';
import { View, Text, ScrollView, StyleSheet, ActivityIndicator, TouchableOpacity, Image } from 'react-native';
import { useHuchas } from '../hooks/useHuchas';
import HuchaCard from '../components/HuchaCard';
import TransactionItem from '../components/TransactionItem';
import NavigationBar from '../components/NavigationBar';
import { Movimiento } from '../types/types';
import { useNavigation } from '@react-navigation/native';
import { RootNavigationProp } from '../types/navigation';

export default function HomeScreen() {
  const userId = 1; // Hardcoded for demo
  const { huchas, movimientos, loading, error, updateHucha, addMovimiento } = useHuchas(userId);
    const navigation = useNavigation<RootNavigationProp>();
  

  const handleAddFunds = (huchaId: number, amount: number) => {
    const updatedHuchas = huchas.map(h => {
      if (h.hucha_id === huchaId) {
        const newSaldo = h.saldo_actual + amount;
        return {
          ...h,
          saldo_actual: newSaldo,
          completa: newSaldo >= h.meta
        };
      }
      return h;
    });

    const newMovimiento: Movimiento = {
      transaction_id: Date.now(), // Temporary ID
      hucha_id: huchaId,
      cantidad: amount,
      fecha: new Date().toISOString()
    };

    updateHucha(updatedHuchas.find(h => h.hucha_id === huchaId)!);
    addMovimiento(newMovimiento);
  };

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#00C89C" />
      </View>
    );
  }

  if (error) {
    return (
      <View style={styles.errorContainer}>
        <Text style={styles.errorText}>{error}</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>My Savings Pots</Text>
        <TouchableOpacity
          onPress={() => navigation.navigate('Configuration')}
          style={styles.settingsButton}
        >
          <Image 
            source={require('../assets/config.png')} 
            style={styles.gearIcon} 
          />
        </TouchableOpacity>
      </View>
      <ScrollView contentContainerStyle={styles.content}>
        
        {huchas.map(hucha => (
          <HuchaCard
            key={hucha.hucha_id}
            hucha={hucha}
            onAddFunds={(amount) => handleAddFunds(hucha.hucha_id, amount)}
          />
        ))}

        <Text style={styles.sectionTitle}>Recent Transactions</Text>
        {movimientos.map(movimiento => (
          <TransactionItem 
            key={movimiento.transaction_id} 
            movimiento={movimiento} 
            huchas={huchas}
          />
        ))}
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
  content: {
    padding: 16,
    paddingBottom: 100,
  },
  title: {
    fontSize: 24,
    fontWeight: '600',
    marginBottom: 24,
    color: '#2D3748',
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: '600',
    marginVertical: 16,
    color: '#2D3748',
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  errorContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  errorText: {
    color: '#E53E3E',
    fontSize: 16,
    textAlign: 'center',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 16,
    backgroundColor: '#F5FFF9',
  },
  settingsButton: {
    padding: 8,
  },
  gearIcon: {
    width: 24,
    height: 24,
    tintColor: '#2D3748',
  },
});