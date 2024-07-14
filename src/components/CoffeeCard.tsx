import { Dimensions, ImageBackground, ImageProps, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import LinearGradient from 'react-native-linear-gradient';
import { COLORS, FONTFAMILY } from '../theme/theme';
import CustomIcons from './CustomIcons';
import BGIcon from './BGIcon';

const CARD_WIDTH = Dimensions.get('window').width * 0.32;

interface CoffeeCardProp {
    id: string;
    index: number;
    name: string;
    imagelink_square: ImageProps;
    price: any;
    type: string;
    roasted: string;
    special_ingredient: string;
    average_rating: number;
    buttonPressHandler: any;
};

const CoffeeCard: React.FC<CoffeeCardProp> = ({
    id,
    index,
    name,
    imagelink_square,
    price,
    type,
    roasted,
    special_ingredient,
    average_rating,
    buttonPressHandler,
}) => {
    return (
        <View>
            <LinearGradient
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 1 }}
                colors={[COLORS.primaryGreyHex, COLORS.primaryBlackHex]}
                style={styles.cardLinearGradientContainer}
            >
                <ImageBackground
                    source={imagelink_square}
                    style={styles.cardImageBackground}
                    resizeMode='cover'
                >
                    <View style={styles.AverageRatingContainer}>
                        <CustomIcons name='star' size={16} color={COLORS.primaryOrangeHex} />
                        <Text style={styles.AverageRatingText}>{average_rating}</Text>
                    </View>
                </ImageBackground>
                <Text style={styles.CoffeeNameText}>{name}</Text>
                <Text style={styles.CoffeeSubText}>{special_ingredient}</Text>
                <View style={styles.CardFooterRow}>
                    <Text style={styles.CoffeeCurrency}>$<Text style={styles.CoffeePriceText}>{price.price}</Text></Text>
                    <TouchableOpacity onPress={() => {
                        buttonPressHandler({
                            id,
                            index,
                            type,
                            roasted,
                            imagelink_square,
                            name,
                            special_ingredient,
                            prices: [{ ...price, quantity: 1 }],
                        })
                    }}>
                        <BGIcon
                            name='add'
                            color={COLORS.primaryWhiteHex}
                            size={10}
                            BGColor={COLORS.primaryOrangeHex}
                        />
                    </TouchableOpacity>
                </View>
            </LinearGradient>
        </View>
    )
}

export default CoffeeCard

const styles = StyleSheet.create({
    cardLinearGradientContainer: {
        padding: 15,
        borderRadius: 25,
    },
    cardImageBackground: {
        width: CARD_WIDTH,
        height: CARD_WIDTH,
        borderRadius: 20,
        overflow: 'hidden',
        marginBottom: 15,
    },
    AverageRatingContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: COLORS.primaryBlackRGBA,
        borderTopRightRadius: 20,
        borderBottomLeftRadius: 20,
        position: 'absolute',
        top: 0,
        right: 0,
        gap: 10,
        paddingHorizontal: 15,
    },
    AverageRatingText: {
        fontSize: 14,
        color: COLORS.primaryWhiteHex,
        fontFamily: 'Poppins-medium',
        lineHeight: 22,
    },
    CardFooterRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginTop: 15,
    },
    CoffeeNameText: {
        fontSize: 16,
        color: COLORS.primaryWhiteHex,
        fontFamily: 'Poppins-mediumn',
    },
    CoffeeSubText: {
        fontSize: 10,
        color: COLORS.primaryWhiteHex,
        fontFamily: FONTFAMILY.poppins_light,
    },
    CoffeeCurrency: {
        fontSize: 17,
        color: COLORS.primaryOrangeHex,
        fontFamily: FONTFAMILY.poppins_medium,

    },
    CoffeePriceText: {
        color: COLORS.primaryWhiteHex,
    },
})