// screens/AnalyticsScreen.tsx
import React from 'react';
import { View, Text, StyleSheet, SafeAreaView, ScrollView, ActivityIndicator } from 'react-native';
import { BarChart } from 'react-native-gifted-charts';
import { useHuchas } from '../hooks/useHuchas';
import { Hucha } from '../types/types';
import NavigationBar from '../components/NavigationBar';

const AnalyticsScreen = () => {
  const userId = 1; // Replace with real user ID
  const { huchas, movimientos, loading, error } = useHuchas(userId);

  const getMonthlyData = (huchaId: number) => {
    const monthlyData: { [key: string]: number } = {};
    
    movimientos
      .filter(m => m.hucha_id === huchaId && m.cantidad > 0)
      .forEach(m => {
        const date = new Date(m.fecha);
        const monthKey = `${date.getFullYear()}-${date.getMonth()}`;
        monthlyData[monthKey] = (monthlyData[monthKey] || 0) + m.cantidad;
      });

    return Object.entries(monthlyData).map(([month, total]) => ({
      value: total,
      label: new Date(month).toLocaleDateString('en', { month: 'short' }),
      frontColor: '#00C89C',
    }));
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
        <Text style={styles.errorText}>Error loading data: {error}</Text>
      </View>
    );
  }

  const chartData = huchas.length > 0 ? getMonthlyData(huchas[0].hucha_id) : [];
  const maxChartValue = Math.max(...chartData.map(d => d.value), 0);

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.content}>
        <Text style={styles.title}>{huchas[1]?.name || 'Savings'} Evolution</Text>
        
        {chartData.length > 0 ? (
          <BarChart
            data={chartData}
            barWidth={22}
            spacing={24}
            roundedTop
            showGradient
            gradientColor="#00C89C"
            yAxisThickness={0}
            xAxisThickness={0}
            noOfSections={4}
            maxValue={maxChartValue}
            yAxisTextStyle={{ color: '#718096' }}
            xAxisLabelTextStyle={{ color: '#718096' }}
            dashWidth={0}
            initialSpacing={24}
            rulesColor="transparent"
            renderTooltip={(item: any) => (
              <View style={styles.tooltip}>
                <Text style={styles.tooltipText}>€{item.value.toFixed(2)}</Text>
              </View>
            )}
          />
        ) : (
          <Text style={styles.noData}>No savings data available</Text>
        )}

        <View style={styles.statsRow}>
          <View style={styles.statCard}>
            <Text style={styles.statLabel}>Current Balance</Text>
            <Text style={styles.statValue}>
              €{huchas[1]?.saldo_actual?.toFixed(2) || '0.00'}
            </Text>
          </View>
          <View style={styles.statCard}>
            <Text style={styles.statLabel}>Target</Text>
            <Text style={styles.statValue}>
              €{huchas[1]?.meta?.toFixed(2) || '0.00'}
            </Text>
          </View>
        </View>
      </ScrollView>
      
      <NavigationBar />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5FFF9',
  },
  content: {
    padding: 20,
    paddingBottom: 100,
  },
  title: {
    fontSize: 24,
    fontWeight: '700',
    color: '#2D3748',
    marginBottom: 24,
  },
  statsRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap: 15,
    marginTop: 30,
  },
  statCard: {
    flex: 1,
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    padding: 20,
    shadowColor: '#000',
    shadowOpacity: 0.05,
    shadowRadius: 10,
    elevation: 2,
  },
  statLabel: {
    fontSize: 14,
    color: '#718096',
    marginBottom: 8,
  },
  statValue: {
    fontSize: 20,
    fontWeight: '700',
    color: '#00C89C',
  },
  tooltip: {
    backgroundColor: '#FFFFFF',
    padding: 8,
    borderRadius: 6,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  tooltipText: {
    fontSize: 14,
    color: '#2D3748',
  },
  noData: {
    textAlign: 'center',
    color: '#718096',
    marginTop: 40,
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
});

export default AnalyticsScreen;