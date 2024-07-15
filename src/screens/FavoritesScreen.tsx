import { ScrollView, StatusBar, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import { useBottomTabBarHeight } from '@react-navigation/bottom-tabs'
import { useStore } from '../store/Store'
import HeaderBar from '../components/HeaderBar'
import EmptyListContainer from '../components/EmptyListContainer'
import CartItem from '../components/CartItem'
import { COLORS, SPACING } from '../theme/theme'
import FavoriteEmptyListLottie from '../components/FovouriteEmptyListLottie'
import FavoriteItemCard from '../components/FavoriteItemCard'

const FavoritesScreen = ({navigation}:any) => {

  const tabBarHeight = useBottomTabBarHeight();
  const FavoritesList = useStore((state: any) => state.FavoritesList);
  const addToFavoriteList = useStore((state: any) => state.addToFavoriteList);
  const deleteFromFavoriteList = useStore(
    (state: any) => state.deleteFromFavoriteList,
  );
  const ToggleFavourite = (favourite: boolean, type: string, id: string) => {
    favourite ? deleteFromFavoriteList(type, id) : addToFavoriteList(type, id);
  };

  return (
    <View style={styles.ScreenContainer}>
      <StatusBar backgroundColor={COLORS.primaryBlackHex}/>
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={[styles.ScrollViewFlex, {paddingBottom: tabBarHeight}]}
      >
        <View style={styles.ItemContainer}>
          <HeaderBar title='Favorites'/>
          {FavoritesList.length == 0 ? (
            <FavoriteEmptyListLottie title='No Favorites Yet'/>
          ) : (
            <View style={styles.ListItemContainer}>
              {FavoritesList.map((data:any) => (
                <TouchableOpacity
                  key={data.id}
                  onPress={() => {
                    navigation.push('Details', {
                      id: data.id,
                      index: data.index,
                      type: data.type,
                    })
                  }}
                >
                  <FavoriteItemCard 
                    id = {data.id}
                    imagelink_portrait = {data.imagelink_portrait}
                    name = {data.name}
                    special_ingredient = {data.special_ingredient}
                    type = {data.type}
                    ingredients = {data.ingredients}
                    average_rating = {data.average_rating}
                    ratings_count = {data.ratings_count}
                    roasted = {data.roasted}
                    description = {data.description}
                    favourite = {data.favourite}
                    ToggleFavouriteItem = {ToggleFavourite}
                  />
                </TouchableOpacity>
              ))}
            </View>
          )}
        </View>
      </ScrollView>
    </View>
  )
}

export default FavoritesScreen

const styles = StyleSheet.create({
  ScreenContainer: {
    flex: 1,
    backgroundColor: COLORS.primaryBlackHex,
  },
  ScrollViewFlex: {
    flexGrow: 1,
  },
  ScrollViewInnerView: {
    flex: 1,
    justifyContent: 'space-between',
  },
  ItemContainer: {
    flex: 1,
  },
  ListItemContainer: {
    paddingHorizontal: SPACING.space_20,
    gap: SPACING.space_20,
  },
})