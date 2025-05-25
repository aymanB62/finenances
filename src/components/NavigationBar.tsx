import React from 'react';
import {
  View,
  TouchableOpacity,
  StyleSheet,
  Dimensions,
  SafeAreaView,
  Platform
} from 'react-native';
import Svg, { Path } from 'react-native-svg';
import { NavigationProp, useNavigation, useRoute } from '@react-navigation/native';
import { RootNavigationProp, RootStackParamList } from '../types/navigation'; // Ensure this type is defined

const { width } = Dimensions.get('window');

// Home Icon Component
const HomeIcon: React.FC<{color: string; size: number}> = ({ color, size }) => (
  <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
    <Path
      d="M3 9l9-7 9 7v11a2 2 0 01-2 2H5a2 2 0 01-2-2V9z"
      stroke={color}
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <Path
      d="M9 22V12h6v10"
      stroke={color}
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </Svg>
);

// Analytics Icon Component
const AnalyticsIcon: React.FC<{ color: string; size: number }> = ({ color, size }) => (
    <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
      <Path
        d="M4 21V10"
        stroke={color}
        strokeWidth={2}
        strokeLinecap="round"
      />
      <Path
        d="M10 21V4"
        stroke={color}
        strokeWidth={2}
        strokeLinecap="round"
      />
      <Path
        d="M16 21v-7"
        stroke={color}
        strokeWidth={2}
        strokeLinecap="round"
      />
      <Path
        d="M2 21h20"
        stroke={color}
        strokeWidth={2}
        strokeLinecap="round"
      />
    </Svg>
  );
  

// Piggy Bank Icon Component
const PiggyBankIcon: React.FC<{color: string; size: number}> = ({ color, size }) => (
  <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
    <Path
      d="M19 5c-1.5 0-2.8 1.4-3 2-3.5-1.5-11-.3-11 5 0 1.8 0 3 2 4.5V20h4v-2h3v2h4v-4c1-.5 1.7-1 2-2h2v-4h-2c0-1-.5-1.5-1-2V5z"
      stroke={color}
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <Path
      d="M16 8a1 1 0 11-2 0 1 1 0 012 0z"
      fill={color}
    />
  </Svg>
);


type TabKey = keyof RootStackParamList;

const NavigationBar = () => {
  const navigation = useNavigation<NavigationProp<RootStackParamList>>();
  const route = useRoute();

  if (['Login', 'SignUp'].includes(route.name)) return null;

  const handlePress = (screen: TabKey): void => {
    navigation.navigate(screen);
  };


  const currentRoute = route.name;

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>
        <TouchableOpacity
          style={styles.tabItem}
          activeOpacity={0.7}
          onPress={() => handlePress('Home')}
        >
          <View style={currentRoute === 'Home' ? styles.activeTabBg : null}>
            <HomeIcon 
              color={currentRoute === 'Home' ? '#000' : '#333'} 
              size={24} 
            />
          </View>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.tabItem}
          activeOpacity={0.7}
          onPress={() => handlePress('Analytics')}
        >
          <View style={currentRoute === 'Analytics' ? styles.activeTabBg : null}>
            <AnalyticsIcon 
              color={currentRoute === 'Analytics' ? '#000' : '#333'} 
              size={24} 
            />
          </View>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.tabItem}
          activeOpacity={0.7}
          onPress={() => handlePress('CreateHucha')}
        >
          <View style={currentRoute === 'CreateHucha' ? styles.activeTabBg : null}>
            <PiggyBankIcon 
              color={currentRoute === 'CreateHucha' ? '#000' : '#333'} 
              size={24} 
            />
          </View>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};


const styles = StyleSheet.create({
  safeArea: {
    backgroundColor: '#e9f9e9'
  },
  container: {
    flexDirection: 'row',
    height: 60,
    width: width,
    backgroundColor: '#e9f9e9',
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    justifyContent: 'space-around',
    alignItems: 'center',
    paddingHorizontal: 20,
    ...Platform.select({
      ios: {
        shadowColor: '#000',
        shadowOffset: { width: 0, height: -3 },
        shadowOpacity: 0.1,
        shadowRadius: 3,
      },
      android: {
        elevation: 8,
      },
    }),
  },
  tabItem: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    height: '100%',
  },
  activeTabBg: {
    backgroundColor: '#00C89C',
    width: 48,
    height: 48,
    borderRadius: 24,
    alignItems: 'center',
    justifyContent: 'center',
  }
});

export default NavigationBar;