import React from 'react';
import { Text, View, StyleSheet, TextStyle, ViewStyle } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import MaskedView from '@react-native-masked-view/masked-view';

interface GradientTextProps {
  text: string;
  style?: TextStyle | ViewStyle;
}

const GradientText: React.FC<GradientTextProps> = ({ text, style }) => {
  return (
    <MaskedView
      style={{ flex: 1 }}
      maskElement={
        <View style={styles.maskContainer}>
          <Text style={[style, styles.text]}>{text}</Text>
        </View>
      }
    >
      <LinearGradient
        colors={['#FF6CC9', '#8559F3']} // Adjust colors as needed
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
        style={{ flex: 1 }}
      />
    </MaskedView>
  );
};

const styles = StyleSheet.create({
  maskContainer: {
    backgroundColor: 'transparent',
  },
  text: {
    fontSize: 28,
    fontFamily: 'Poppins-SemiBold',
  },
});

export default GradientText;
