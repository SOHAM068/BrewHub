import { Dimensions, FlatList, ScrollView, StatusBar, StyleSheet, Text, TextInput, ToastAndroid, TouchableOpacity, View } from 'react-native'
import React, { useRef, useState } from 'react'
import { useStore } from '../store/Store'
import { useBottomTabBarHeight } from '@react-navigation/bottom-tabs'
import { COLORS, FONTSIZE, SPACING, FONTFAMILY, BORDERRADIUS } from '../theme/theme'
import HeaderBar from '../components/HeaderBar'
import CustomIcons from '../components/CustomIcons'
import CoffeeCard from '../components/CoffeeCard'
import { KeyboardAvoidingView, Platform } from 'react-native';


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

const HomeScreen = ({ navigation }: any) => {
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
  const ListRef: any = useRef<FlatList>();

  const searchCoffee = (search: string) => {
    if (search != '') {
      ListRef?.current?.scrollToOffset({
        animated: true,
        offset: 0,
      })
      setCategoryIndex({ index: 0, category: categories[0] });
      setSortedCoffee([...CoffeeList.filter((item: any) => item.name.toLowerCase().includes(search.toLowerCase()))]);
    }
  }

  const resetSearch = () => {
    ListRef?.current?.scrollToOffset({
      animated: true,
      offset: 0,
    });
    setCategoryIndex({ index: 0, category: categories[0] });
    setSortedCoffee([...CoffeeList]);
    setSearchText('');
  }
  const addToCart = useStore((state:any) => state.addToCart);
  const calculateCartPrice = useStore((state:any) => state.calculateCartPrice);

  const coffeeCardAddToCart = ({
    id,
    type,
    name,
    special_ingredient,
    prices,
    index,
    roasted,
    imagelink_square,
  }:any) => {
    addToCart({
      id,
      type,
      name,
      special_ingredient,
      prices,
      index,
      roasted,
      imagelink_square,
    });
    calculateCartPrice();
    ToastAndroid.showWithGravity(`${name}is added to Cart`, ToastAndroid.SHORT, ToastAndroid.CENTER);
  };

  return (
    <KeyboardAvoidingView
      style={styles.screenContainer}
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
      // keyboardVerticalOffset={Platform.OS === 'ios' ? 64 : 0}
      keyboardVerticalOffset={100}
    >
      <StatusBar backgroundColor={COLORS.primaryBlackHex} />
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollViewFlex}
      >
        {/* App Header */}
        <HeaderBar title='Home Screen' />

        <Text style={styles.ScreenText}>Find the best{'\n'}coffee for you</Text>
        <View style={[styles.InputConatainerComponent]}>
          <CustomIcons
            style={styles.InputIcon}
            name='search'
            size={FONTSIZE.size_18}
            color={
              searchText.length > 0 ? COLORS.primaryOrangeHex : COLORS.primaryLightGreyHex
            }
          />
          <TextInput
            placeholder='Find Your Coffee...'
            keyboardAppearance='dark'
            placeholderTextColor={COLORS.primaryLightGreyHex}
            style={styles.TextInputContainer}
            value={searchText}
            onChangeText={(text) => {
              setSearchText(text)
              searchCoffee(text)
            }}
          />
          {searchText.length > 0 ? <View>
            <TouchableOpacity onPress={() => { resetSearch() }}>
              <CustomIcons
                style={styles.InputIcon}
                name='close'
                size={FONTSIZE.size_16}
                color={COLORS.primaryLightGreyHex}
              />
            </TouchableOpacity>
          </View>
            : <></>}
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
                ListRef?.current?.scrollToOffset({
                  animated: true,
                  offset: 0,
                })
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
          ref={ListRef}
          ListEmptyComponent={
            <View style={styles.EmptyListContainer}>
              <Text style={styles.CategoryText}>No Coffee Available</Text>
            </View>
          }
          horizontal
          showsHorizontalScrollIndicator={false}
          data={sortedCoffee}
          keyExtractor={(item) => item.id}
          contentContainerStyle={styles.FlatListContainer}
          renderItem={({ item }) => {
            return (
              <TouchableOpacity onPress={() => { navigation.push('Details',{
                index: item.index,
                id: item.id,
                type : item.type,
              })}}>
                <CoffeeCard
                  id={item.id}
                  index={item.index}
                  name={item.name}
                  imagelink_square={item.imagelink_square}
                  price={item.prices[2]}
                  type={item.type}
                  roasted={item.roasted}
                  special_ingredient={item.special_ingredient}
                  average_rating={item.average_rating}
                  buttonPressHandler={coffeeCardAddToCart}
                />
              </TouchableOpacity>
            )
          }}
        />

        {/* Beans Flatlist */}
        <Text style={styles.BeansTitle}>Coffee Beans</Text>

        <FlatList
          horizontal
          showsHorizontalScrollIndicator={false}
          data={BeanList}
          keyExtractor={(item) => item.id}
          contentContainerStyle={[styles.FlatListContainer, { paddingBottom: tabBarHeight }]}
          renderItem={({ item }) => {
            return (
              <TouchableOpacity onPress={() => { navigation.push('Details',{
                index: item.index,
                id: item.id,
                type : item.type,
              })}}>
                <CoffeeCard
                  id={item.id}
                  index={item.index}
                  name={item.name}
                  imagelink_square={item.imagelink_square}
                  price={item.prices[2]}
                  type={item.type}
                  roasted={item.roasted}
                  special_ingredient={item.special_ingredient}
                  average_rating={item.average_rating}
                  buttonPressHandler={coffeeCardAddToCart}
                />
              </TouchableOpacity>
            )
          }}
        />

      </ScrollView>
    </KeyboardAvoidingView>
  )
}

export default HomeScreen

const styles = StyleSheet.create({
  screenContainer: {
    flex: 1,
    backgroundColor: COLORS.primaryBlackHex,
    offset: 20
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
  FlatListContainer: {
    gap: 20,
    paddingVertical: SPACING.space_20,
    paddingHorizontal: SPACING.space_30,
  },
  BeansTitle: {
    fontSize: FONTSIZE.size_18,
    color: '#8c8c8c',
    fontFamily: FONTFAMILY.poppins_bold,
    marginLeft: SPACING.space_30,
    marginTop: SPACING.space_10,
  },
  EmptyListContainer: {
    width: Dimensions.get('window').width - SPACING.space_30 * 2,
    paddingVertical: SPACING.space_36 * 3.2,
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
})