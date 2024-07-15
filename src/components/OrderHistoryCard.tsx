import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import { COLORS, FONTSIZE, SPACING, FONTFAMILY } from '../theme/theme'
import OrderItemCard from './OrderItemCard'
import PaymentMethod from './PaymentMethod'

interface OrderHistoryCardProp {
    navigationHandler : any,
    CartList : any,
    CartListPrice : string,
    OrderDate : string
    paymentMode : string
    name : string
};

const OrderHistoryCard: React.FC<OrderHistoryCardProp> = ({
    navigationHandler,
    CartList,
    CartListPrice,
    OrderDate,
    paymentMode,
    name
}) => {
  return (
    <View style={styles.CardContainer}>
      <View style={styles.CardHeader}>
        <View>
            <Text style={styles.HeaderTitle}>Order Date & Time</Text>
            <Text style={styles.HeaderSubtitle}>{OrderDate}</Text>
        </View>
        <View>
            <Text style={styles.HeaderTitle}>Total Price</Text>
            <Text style={styles.HeaderPrice}>$ {CartListPrice}</Text>
        </View>
      </View>
        <View>
            <Text style={[styles.HeaderTitle, {fontSize:13, color:COLORS.secondaryLightGreyHex}]}>
                Payment Method : <Text style={styles.HeaderSubtitle}>{paymentMode}</Text>
            </Text>
        </View>
      <View style={styles.ListContainer}>
        {CartList.map((data: any, index: any) => (
            <TouchableOpacity 
                key={index.toString() + data.id}
                onPress={() => {navigationHandler(data)}}
            >
                <OrderItemCard 
                    type={data.type}
                    name={data.name}
                    special_ingredient={data.special_ingredient}
                    imagelink_square={data.imagelink_square}
                    prices={data.prices}
                    ItemPrice={data.ItemPrice}
                />
            </TouchableOpacity>
        ))}
      </View>
    </View>
  )
}

export default OrderHistoryCard

const styles = StyleSheet.create({
    CardContainer: {
        gap: SPACING.space_10,
      },
      CardHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        gap: SPACING.space_20,
        alignItems: 'center',
      },
      HeaderTitle: {
        fontFamily: FONTFAMILY.poppins_semibold,
        fontSize: FONTSIZE.size_16,
        color: COLORS.primaryWhiteHex,
      },
      HeaderSubtitle: {
        fontFamily: FONTFAMILY.poppins_light,
        fontSize: FONTSIZE.size_16,
        color: COLORS.primaryWhiteHex,
      },
      PriceContainer: {
        alignItems: 'flex-end',
      },
      HeaderPrice: {
        fontFamily: FONTFAMILY.poppins_medium,
        fontSize: FONTSIZE.size_18,
        color: COLORS.primaryOrangeHex,
      },
      ListContainer: {
        gap: SPACING.space_20,
      },
})