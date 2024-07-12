import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { produce } from "immer";
import CoffeeData from "../data/CoffeeData";
import BeansData from "../data/BeansData";

export const useStore = create(
    persist((set, get) => ({
            CoffeeList: CoffeeData,
            BeanList: BeansData,
            Cart: [],
            Favorites: [],
            OrderHistory: [],
            CartPrice : 0,
        }),
        {
            name : 'BrewHub',
            storage: createJSONStorage(() => AsyncStorage),
        }
    )
)