import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import LinearGradient from 'react-native-linear-gradient'
import { COLORS, SPACING } from '../theme/theme'
import CustomIcons from './CustomIcons'

interface GradiantBGColorProps {
    name: string;
    color: string;
    size: number;
};

const GradiantBGIcon: React.FC<GradiantBGColorProps> = ({ name, color, size }) => {
    return (
        <View style={styles.container}>
            <LinearGradient
                colors={[COLORS.primaryBlackHex, COLORS.primaryGreyHex]}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 1 }}
                style={styles.LinearGradiantBG}
            >
                <CustomIcons name={name} color={color} size={size} />
            </LinearGradient>
        </View>
    )
}

export default GradiantBGIcon

const styles = StyleSheet.create({
    container: {
        borderWidth: 2,
        borderColor: COLORS.secondaryDarkGreyHex,
        borderRadius: SPACING.space_12,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: COLORS.secondaryDarkGreyHex,
        overflow: 'hidden',
    },
    LinearGradiantBG: {
        height: SPACING.space_36,
        width: SPACING.space_36,
        alignItems: 'center',
        justifyContent: 'center',
    }
})