import { FlatList, ScrollView, StatusBar, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native'
import React, { useState } from 'react'
import { useStore } from '../store/Store'
import { useBottomTabBarHeight } from '@react-navigation/bottom-tabs'
import { COLORS, FONTSIZE, SPACING, FONTFAMILY, BORDERRADIUS } from '../theme/theme'
import HeaderBar from '../components/HeaderBar'
import CustomIcons from '../components/CustomIcons'

const getCategoriesFromData = (data: any) => {
  let temp: any = {};
  for (let i = 0; i < data.length; i++) {
    if (temp[data[i].name] === undefined)
      temp[data[i].name] = 1;
    else
      temp[data[i].name]++;
  }
  let categories = Object.keys(temp);
  categories.unshift("All")
  return categories;
}

const getCoffeeList = (category: string, data: any) => {

  if (category === "All")
    return data;
  else {
    let coffeeList = data.filter((item: any) => item.name === category);
    return coffeeList;
  }
}

const HomeScreen = () => {
  const CoffeeList = useStore((state: any) => state.CoffeeList)
  const BeanList = useStore((state: any) => state.BeanList)
  const [categories, setCategories] = useState(getCategoriesFromData(CoffeeList));
  const [searchText, setSearchText] = useState('')
  const [categoryIndex, setCategoryIndex] = useState({
    index: 0,
    category: categories[0]
  });
  const [sortedCoffee, setSortedCoffee] = useState(getCoffeeList(categoryIndex.category, CoffeeList));
  const tabBarHeight = useBottomTabBarHeight();

  // console.log('Categories:', categories)
  return (
    <View style={styles.screenContainer}>
      <StatusBar backgroundColor={COLORS.primaryBlackHex} />
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollViewFlex}
      >
        {/* App Header */}
        <HeaderBar title='Home Screen' />

        <Text style={styles.ScreenText}>Find the best {'\n'}coffee for you</Text>
        <View style={[styles.InputConatainerComponent]}>
          <TouchableOpacity onPress={() => { }}>
            <CustomIcons
              style={styles.InputIcon}
              name='search'
              size={FONTSIZE.size_18}
              color={
                searchText.length > 0 ? COLORS.primaryOrangeHex : COLORS.primaryLightGreyHex
              }
            />
          </TouchableOpacity>
          <TextInput
            placeholder='Find Your Coffee...'
            placeholderTextColor={COLORS.primaryLightGreyHex}
            style={styles.TextInputContainer}
            value={searchText}
            onChangeText={(text) => setSearchText(text)}
          />
        </View>

        {/* Category Scroller */}
        <ScrollView
          horizontal={true}
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.CategoryScrollViewStyle}
        >
          {categories.map((data, index) => (
            <View key={index.toString()} style={styles.CategoryScrollViewContainer}>
              <TouchableOpacity onPress={() => {
                setCategoryIndex({ index: index, category: categories[index] });
                setSortedCoffee([...getCoffeeList(categories[index], CoffeeList)]);
              }} 
              style={styles.CategoryScrollViewItem}>
                <Text
                style={[styles.CategoryText, categoryIndex.index === index ? { color: COLORS.primaryOrangeHex } : { color: COLORS.primaryLightGreyHex }]}
                >{data}</Text>
                {categoryIndex.index === index ? (
                  <View style={styles.ActiveCategory}></View>
                ) : (<></>)}
              </TouchableOpacity>
            </View>
          ))}
        </ScrollView>

        {/* Coffee FlatList */}
        <FlatList
          horizontal
          showsHorizontalScrollIndicator={false}
          data={sortedCoffee}
          keyExtractor={(item) => item.id.toString()}
          contentContainerStyle={styles.FlatListContainer}
          renderItem={({ item }) => {
            return(
              <TouchableOpacity>
                
              </TouchableOpacity>
            )
          }}
        />

      </ScrollView>
    </View>
  )
}

export default HomeScreen

const styles = StyleSheet.create({
  screenContainer: {
    flex: 1,
    backgroundColor: COLORS.primaryBlackHex,
  },
  headerContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 16,
  },
  scrollViewFlex: {
    flexGrow: 1,
  },
  ScreenText: {
    fontSize: 28,
    color: COLORS.primaryWhiteHex,
    fontFamily: 'Poppins-SemiBold',
    paddingLeft: 30,
  },
  InputConatainerComponent: {
    flexDirection: 'row',
    alignItems: 'center',
    margin: 30,
    backgroundColor: COLORS.primaryDarkGreyHex,
    borderRadius: 20,
  },
  InputIcon: {
    marginHorizontal: 20,
  },
  TextInputContainer: {
    flex: 1,
    color: COLORS.primaryWhiteHex,
    height: SPACING.space_20 * 2.8,
    fontFamily: FONTFAMILY.poppins_semibold,
    fontSize: FONTSIZE.size_14,
  },
  CategoryScrollViewStyle: {
    paddingHorizontal: SPACING.space_20,
    marginBottom: SPACING.space_20,
  },
  CategoryScrollViewContainer: {
    paddingHorizontal: SPACING.space_15,
  },
  CategoryScrollViewItem: {
    alignItems: 'center',
  },
  CategoryText: {
    fontFamily: FONTFAMILY.poppins_semibold,
    fontSize: FONTSIZE.size_16,
    color: COLORS.primaryLightGreyHex,
    marginBottom: SPACING.space_4,
  },
  ActiveCategory: {
    height: SPACING.space_10,
    width: SPACING.space_10,
    borderRadius: BORDERRADIUS.radius_10,
    backgroundColor: COLORS.primaryOrangeHex,
  },
  FlatListContainer:{
    gap : 20,
    paddingVertical: SPACING.space_20,
    paddingHorizontal: SPACING.space_30,
  }
})