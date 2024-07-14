import {
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View,
} from 'react-native';
import React, { startTransition, useState } from 'react';
import { useStore } from '../store/Store';
import { Screen } from 'react-native-screens';
import { COLORS } from '../theme/theme';
import ImageBackgroundInfo from '../components/ImageBackgroundInfo';
import { useEffect } from 'react';
import { SPACING, FONTFAMILY, FONTSIZE, BORDERRADIUS } from '../theme/theme';
import PaymentFooter from '../components/PaymentFooter';

const DetailsScreen = ({ navigation, route }: any) => {
  // console.log(route.params)
  const ItemOfIndex = useStore((state: any) =>
    route.params.type === 'Coffee' ? state.CoffeeList : state.BeanList,
  )[route.params.index];

  const BackHandler = () => {
    navigation.goBack();
  };
  const [fullDesc, setFullDesc] = useState(false);
  const [price, setPrice] = useState(ItemOfIndex.prices[0])

  const addToFavoriteList = useStore((state: any) => state.addToFavoriteList);
  const deleteFromFavoriteList = useStore(
    (state: any) => state.deleteFromFavoriteList,
  );
  const addToCart = useStore((state:any) => state.addToCart);
  const calculateCartPrice = useStore((state:any) => state.calculateCartPrice);
  
  const ToggleFavourite = (favourite: boolean, type: string, id: string) => {
    favourite ? deleteFromFavoriteList(type, id) : addToFavoriteList(type, id);
  };

  const addToCartHandler = ({
    id,
    type,
    name,
    special_ingredient,
    price,
    index,
    roasted,
    imagelink_square,
  }:any) => {
    addToCart({
      id,
      type,
      name,
      special_ingredient,
      prices: [{...price, quantity: 1}],
      index,
      roasted,
      imagelink_square,
    });
    calculateCartPrice();
    navigation.navigate('Cart');
  };

  return (
    <View style={styles.ScreenContainer}>
      <ScrollView
        showsVerticalScrollIndicator={false}
        style={styles.ScrollViewFlex}>
        <ImageBackgroundInfo
          EnableBackHandler={true}
          imagelink_portrait={ItemOfIndex.imagelink_portrait}
          type={ItemOfIndex.type}
          id={ItemOfIndex.id}
          favourite={ItemOfIndex.favourite}
          name={ItemOfIndex.name}
          special_ingredient={ItemOfIndex.special_ingredient}
          ingredients={ItemOfIndex.ingredients}
          average_rating={ItemOfIndex.average_rating}
          ratings_count={ItemOfIndex.ratings_count}
          roasted={ItemOfIndex.roasted}
          BackHandler={BackHandler}
          ToggleFavourite={ToggleFavourite}
        />
        <View style={styles.FooterInfoArea}>
          <Text style={styles.InfoTitle}>Description</Text>
          {fullDesc ? (
            <TouchableWithoutFeedback onPress={() => setFullDesc(prev => !prev)}>
              <Text style={styles.DescriptionText}>
                {ItemOfIndex.description}
              </Text>
            </TouchableWithoutFeedback>
          ) : (
            <TouchableWithoutFeedback onPress={() => setFullDesc(prev => !prev)}>
              <Text numberOfLines={3} style={styles.DescriptionText}>
                {ItemOfIndex.description}
              </Text>
            </TouchableWithoutFeedback>
          )}
          <Text style={styles.InfoTitle}>Size</Text>
          <View style={styles.SizeOuterContainer}>
            {ItemOfIndex.prices.map((data: any) => (
              <TouchableOpacity
                key = {data.size}
                onPress={() => setPrice(data)}
                style={[styles.SizeBox, {
                  borderColor: data.size === price.size ? COLORS.primaryOrangeHex : COLORS.primaryDarkGreyHex
                }]}
              >
                <Text style={[styles.SizeText, {
                  color: data.size === price.size ? COLORS.primaryOrangeHex : COLORS.primaryWhiteHex,
                  fontSize: ItemOfIndex.type == 'Coffee' ? FONTSIZE.size_16 : FONTSIZE.size_14,
                }]}>
                  {data.size}
                </Text>

              </TouchableOpacity>
            ))}
          </View>
        </View>
        <PaymentFooter 
          price={price} 
          buttonTitle='Add to Cart'
          buttonPresshandler={() => {
            addToCartHandler({
              id: ItemOfIndex.id,
              type: ItemOfIndex.type,
              name: ItemOfIndex.name,
              special_ingredient: ItemOfIndex.special_ingredient,
              price: price,
              index: route.params.index,
              roasted: ItemOfIndex.roasted,
              imagelink_square: ItemOfIndex.imagelink_square,
            })
          }}
        />
      </ScrollView>
    </View>
  );
};

export default DetailsScreen;

const styles = StyleSheet.create({
  ScreenContainer: {
    flex: 1,
    backgroundColor: COLORS.primaryBlackHex,
  },
  ScrollViewFlex: {
    flexGrow: 1,
    width: '100%',
  },
  FooterInfoArea: {
    padding: SPACING.space_20,
  },
  InfoTitle: {
    fontFamily: FONTFAMILY.poppins_semibold,
    fontSize: FONTSIZE.size_16,
    color: COLORS.secondaryLightGreyHex,
    marginBottom: SPACING.space_10,
  },
  DescriptionText: {
    letterSpacing: 0.5,
    fontFamily: FONTFAMILY.poppins_regular,
    fontSize: 12.5,
    color: COLORS.primaryWhiteHex,
    marginBottom: SPACING.space_20,
  },
  SizeOuterContainer: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap: SPACING.space_20,
  },
  SizeBox: {
    flex: 1,
    backgroundColor: COLORS.primaryDarkGreyHex,
    alignItems: 'center',
    justifyContent: 'center',
    height: SPACING.space_24 * 2,
    borderRadius: BORDERRADIUS.radius_10,
    borderWidth: 2,
  },
  SizeText: {
    fontFamily: FONTFAMILY.poppins_medium,
  },
});
