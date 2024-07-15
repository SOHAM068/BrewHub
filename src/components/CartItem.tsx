import { Image, ImageProps, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import { COLORS, FONTSIZE, FONTFAMILY, SPACING, BORDERRADIUS } from '../theme/theme'
import LinearGradient from 'react-native-linear-gradient'
import CustomIcons from './CustomIcons'

interface CartItemProp {
    id: string,
    name: string,
    prices: any,
    roasted: string,
    imagelink_square: ImageProps,
    type: string,
    special_ingredient: string,
    IncrementCartItemQuantityHandler: any,
    DecrementCartItemQuantityHandler: any,
}

const CartItem: React.FC<CartItemProp> = ({
    id,
    name,
    prices,
    roasted,
    imagelink_square,
    type,
    special_ingredient,
    IncrementCartItemQuantityHandler,
    DecrementCartItemQuantityHandler
}) => {
    return (
        <View>
            {prices.length != 1 ?
                <LinearGradient
                    colors={[COLORS.primaryGreyHex, COLORS.primaryBlackHex]}
                    style={styles.CartItemLinearGradient}
                    start={{ x: 0, y: 0 }}
                    end={{ x: 1, y: 1 }}
                >
                    <View style={styles.CartItemRow}>
                        <Image source={imagelink_square} style={styles.CartItemImage} />
                        <View style={styles.CartItemInfo}>
                            <View>
                                <Text style={styles.CartItemTitle}>{name}</Text>
                                <Text style={styles.CartItemSubtitle}>{special_ingredient}</Text>
                            </View>
                            <View style={styles.CartItemRoastedContainer}>
                                <Text style={styles.CartItemRoastedText}>{roasted}</Text>
                            </View>
                        </View>
                    </View>
                    {prices.map((data: any, index: any) => (
                        <View key={index.toString()} style={styles.CartItemSizeRowContainer}>
                            <View style={styles.CartItemSizeValueContainer}>
                                <View style={styles.SizeBox}>
                                    <Text style={[styles.SizeText, {
                                        fontSize: type == 'Bean' ? FONTSIZE.size_12 : FONTSIZE.size_16
                                    }]}>{data.size}</Text>
                                </View>
                                <Text style={styles.SizeCurrency}>{data.currency}
                                    <Text style={styles.SizePrice}>{data.price}</Text>
                                </Text>
                            </View>
                            <View style={styles.CartItemSizeValueContainer}>
                                <TouchableOpacity
                                    onPress={() => { DecrementCartItemQuantityHandler(id, data.size) }}
                                    style={styles.CartItemIcon}
                                >
                                    <CustomIcons name='minus' color={COLORS.primaryWhiteHex} size={10} />
                                </TouchableOpacity>
                                <View style={styles.CartItemQuantityContainer}>
                                    <Text style={styles.CartItemQuantityText}>{data.quantity}</Text>
                                </View>
                                <TouchableOpacity
                                    onPress={() => { IncrementCartItemQuantityHandler(id, data.size) }}
                                    style={styles.CartItemIcon}
                                >
                                    <CustomIcons name='add' color={COLORS.primaryWhiteHex} size={10} />
                                </TouchableOpacity>
                            </View>
                        </View>
                    ))}
                </LinearGradient> : <LinearGradient
                    colors={[COLORS.primaryGreyHex, COLORS.primaryBlackHex]}
                    style={styles.CartItemSingleLinearGradient}
                    start={{ x: 0, y: 0 }}
                    end={{ x: 1, y: 1 }}
                >
                    <View>
                        <Image source={imagelink_square} style={styles.CartItemSingleImage} />
                    </View>
                    <View style={styles.CartItemSingleInfoContainer}>
                        <View>
                            <Text style={styles.CartItemTitle}>{name}</Text>
                            <Text style={styles.CartItemSubtitle}>{special_ingredient}</Text>
                        </View>
                        <View style={styles.CartItemSingleSizeValueContainer}>
                            <View style={styles.SizeBox}>
                                <Text style={[styles.SizeText, {
                                    fontSize: type == 'Bean' ? FONTSIZE.size_12 : FONTSIZE.size_16
                                }]}>{prices[0].size}</Text>
                            </View>
                            <Text style={styles.SizeCurrency}>{prices[0].currency}<Text style={styles.SizePrice}>
                                {prices[0].price}</Text>
                            </Text>
                        </View>
                        <View style={styles.CartItemSizeValueContainer}>
                            <TouchableOpacity
                                onPress={() => { DecrementCartItemQuantityHandler(id, prices[0].size) }}
                                style={styles.CartItemIcon}
                            >
                                <CustomIcons name='minus' color={COLORS.primaryWhiteHex} size={10} />
                            </TouchableOpacity>
                            <View style={styles.CartItemQuantityContainer}>
                                <Text style={styles.CartItemQuantityText}>{prices[0].quantity}</Text>
                            </View>
                            <TouchableOpacity
                                onPress={() => { IncrementCartItemQuantityHandler(id, prices[0].size) }}
                                style={styles.CartItemIcon}
                            >
                                <CustomIcons name='add' color={COLORS.primaryWhiteHex} size={10} />
                            </TouchableOpacity>
                        </View>
                    </View>

                </LinearGradient>}
        </View>
    )
}

export default CartItem

const styles = StyleSheet.create({
    CartItemLinearGradient: {
        flex: 1,
        gap: SPACING.space_12,
        padding: SPACING.space_12,
        borderRadius: BORDERRADIUS.radius_25,
    },
    CartItemRow: {
        flexDirection: 'row',
        gap: SPACING.space_12,
        flex: 1,
    },
    CartItemImage: {
        height: 130,
        width: 130,
        borderRadius: BORDERRADIUS.radius_20,
    },
    CartItemInfo: {
        flex: 1,
        paddingVertical: SPACING.space_4,
        justifyContent: 'space-between',
    },
    CartItemTitle: {
        fontFamily: FONTFAMILY.poppins_medium,
        fontSize: FONTSIZE.size_18,
        color: COLORS.primaryWhiteHex,
    },
    CartItemSubtitle: {
        fontFamily: FONTFAMILY.poppins_regular,
        fontSize: FONTSIZE.size_12,
        color: COLORS.secondaryLightGreyHex,
    },
    CartItemRoastedContainer: {
        height: 50,
        width: 50 * 2 + SPACING.space_20,
        borderRadius: BORDERRADIUS.radius_15,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: COLORS.primaryDarkGreyHex,
    },
    CartItemRoastedText: {
        fontFamily: FONTFAMILY.poppins_regular,
        fontSize: FONTSIZE.size_10,
        color: COLORS.primaryWhiteHex,
    },
    CartItemSizeRowContainer: {
        flex: 1,
        alignItems: 'center',
        gap: SPACING.space_20,
        flexDirection: 'row',
        justifyContent: 'center',
    },
    CartItemSizeValueContainer: {
        flex: 1,
        alignItems: 'center',
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    SizeBox: {
        backgroundColor: COLORS.primaryBlackHex,
        height: 40,
        width: 100,
        borderRadius: BORDERRADIUS.radius_10,
        justifyContent: 'center',
        alignItems: 'center',
    },
    SizeText: {
        fontFamily: FONTFAMILY.poppins_medium,
        color: COLORS.primaryWhiteHex,
    },
    SizeCurrency: {
        fontFamily: FONTFAMILY.poppins_semibold,
        fontSize: FONTSIZE.size_18,
        color: COLORS.primaryOrangeHex,
    },
    SizePrice: {
        color: COLORS.primaryWhiteHex,
    },
    CartItemIcon: {
        backgroundColor: COLORS.primaryOrangeHex,
        padding: SPACING.space_12,
        borderRadius: BORDERRADIUS.radius_10,
    },
    CartItemQuantityContainer: {
        backgroundColor: COLORS.primaryBlackHex,
        width: 80,
        borderRadius: BORDERRADIUS.radius_10,
        borderWidth: 2,
        borderColor: COLORS.primaryOrangeHex,
        alignItems: 'center',
        paddingVertical: SPACING.space_4,
    },
    CartItemQuantityText: {
        fontFamily: FONTFAMILY.poppins_semibold,
        fontSize: FONTSIZE.size_16,
        color: COLORS.primaryWhiteHex,
    },
    CartItemSingleLinearGradient: {
        flexDirection: 'row',
        alignItems: 'center',
        padding: SPACING.space_12,
        gap: SPACING.space_12,
        borderRadius: BORDERRADIUS.radius_25,
    },
    CartItemSingleImage: {
        height: 150,
        width: 150,
        borderRadius: BORDERRADIUS.radius_20,
    },
    CartItemSingleInfoContainer: {
        flex: 1,
        alignSelf: 'stretch',
        justifyContent: 'space-around',
    },
    CartItemSingleSizeValueContainer: {
        flexDirection: 'row',
        justifyContent: 'space-evenly',
        alignItems: 'center',
    },
    CartItemSingleQuantityContainer: {
        flexDirection: 'row',
        justifyContent: 'space-evenly',
        alignItems: 'center',
    },
})