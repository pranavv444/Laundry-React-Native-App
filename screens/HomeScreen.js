import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  Alert,
  Pressable,
  Image,
  TextInput,
  ScrollView,
} from "react-native";
import React, { useEffect, useState } from "react";
import * as Location from "expo-location";
import { MaterialIcons } from "@expo/vector-icons";
import { Feather } from "@expo/vector-icons";
import Constants from "expo-constants";
import Carousel from "../components/Carousel";
import Services from "../components/Services";
import DressItem from "../components/DressItem";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { getProducts } from "../ProductReducer";
import { useNavigation } from "@react-navigation/native";
import { collection, getDoc, getDocs } from "firebase/firestore";
import { db } from "../firebase";
const HomeScreen = () => {
  const cart = useSelector((state) => state.cart.cart);
  const [items,setItems]=useState([]);
  const total = cart
    .map((item) => item.quantity * item.price)
    .reduce((curr, prev) => curr + prev, 0);
  const navigation = useNavigation();
  console.log(cart);

  const [displayCurrentAddress, setdisplayCurrentAddress] = useState(
    "we are loading your location"
  );
  const [locationServicesEnabled, setlocationServicesEnabled] =
    useState("false");
  useEffect(() => {
    checkIfLocationEnabled();
    getCurrentLocation();
  }, []);
  const checkIfLocationEnabled = async () => {
    let enabled = await Location.hasServicesEnabledAsync();
    if (!enabled) {
      Alert.alert(
        "Location Services is not enabled",
        "Please enable location services to continue",
        [
          {
            text: "Cancel",
            onPress: () => console.log("Cancel Pressed"),
            style: "cancel",
          },
          { text: "OK", onPress: () => console.log("OK Pressed") },
        ],
        { cancelable: false }
      );
    } else {
      setlocationServicesEnabled(enabled);
    }
  };
  const getCurrentLocation = async () => {
    let { status } = await Location.requestForegroundPermissionsAsync();
    if (status !== "granted") {
      Alert.alert(
        "Permission denied",
        "Allow location services to continue",
        [
          {
            text: "Cancel",
            onPress: () => console.log("Cancel Pressed"),
            style: "cancel",
          },
          { text: "OK", onPress: () => console.log("OK Pressed") },
        ],
        { cancelable: false }
      );
    }
    const { coords } = await Location.getCurrentPositionAsync();
    // console.log(coords);
    if (coords) {
      const { latitude, longitude } = coords;
      let response = await Location.reverseGeocodeAsync({
        latitude,
        longitude,
      });
      // console.log(response);
      for (let item of response) {
        let address = `${item.name} ${item.city}  ${item.postalCode}`;
        setdisplayCurrentAddress(address);
      }
    }
  };
  const product = useSelector((state) => state.product.product);
  const dispatch = useDispatch();
  useEffect(() => {
    if (product.length > 0) return;
    const fetchProducts =async () => {
      const colRef=collection(db,"types");
      const docsSnap=await getDocs(colRef);
      docsSnap.forEach((doc)=>{
        items.push(doc.data());
      });

      items?.map((service)=>dispatch(getProducts(service)));
      
    };
    fetchProducts();
  }, []);
  const services = [
    {
      id: "0",
      image: "https://cdn-icons-png.flaticon.com/128/4643/4643574.png",
      name: "shirt",
      quantity: 0,
      price: 10,
    },
    {
      id: "11",
      image: "https://cdn-icons-png.flaticon.com/128/892/892458.png",
      name: "T-shirt",
      quantity: 0,
      price: 10,
    },
    {
      id: "12",
      image: "https://cdn-icons-png.flaticon.com/128/9609/9609161.png",
      name: "dresses",
      quantity: 0,
      price: 10,
    },
    {
      id: "13",
      image: "https://cdn-icons-png.flaticon.com/128/599/599388.png",
      name: "jeans",
      quantity: 0,
      price: 10,
    },
    {
      id: "14",
      image: "https://cdn-icons-png.flaticon.com/128/9431/9431166.png",
      name: "Sweater",
      quantity: 0,
      price: 10,
    },
    {
      id: "15",
      image: "https://cdn-icons-png.flaticon.com/128/3345/3345397.png",
      name: "shorts",
      quantity: 0,
      price: 10,
    },
    {
      id: "16",
      image: "https://cdn-icons-png.flaticon.com/128/293/293241.png",
      name: "Sleeveless",
      quantity: 0,
      price: 10,
    },
  ];
  return (
    <>
      <ScrollView
        style={{
          flex: 1,
          marginTop: Constants.statusBarHeight,
          backgroundColor: "#F0F0F0",
          marginTop: 50,
        }}
      >
        {/*Locations and profile */}
        <View style={{ flexDirection: "column" }}>
          <MaterialIcons name="location-on" size={28} color="black" />
          <View>
            <Text style={{ fontSize: 18, fontWeight: "700" }}>Home</Text>
          </View>
          <Text>{displayCurrentAddress}</Text>
        </View>
        <Pressable onPress={()=>navigation.navigate("Profile")} style={{ marginLeft: "auto", marginRight: 7 }}>
          <Image
            style={{ width: 40, height: 40, borderRadius: 35, marginTop: -38 }}
            source={{
              uri: "https://yt3.ggpht.com/yti/AHXOFjVJO0CYr0xDX-viGEZoVH3_b69yS3UeXVki1w=s88-c-k-c0x00ffffff-no-rj-mo",
            }}
          />
        </Pressable>
        <View
          style={{
            padding: 10,
            margin: 10,
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "space-between",
            borderWidth: 0.8,
            borderColor: "grey",
            borderRadius: 8,
          }}
        >
          <TextInput placeholder="Search for Items"></TextInput>
          <Feather name="search" size={24} color="black" />
        </View>
        {/*Carousel */}
        <Carousel />
        {/*Services */}
        <Services />
        {/*Products */}
        {product.map((item, index) => (
          <DressItem item={item} key={index}></DressItem>
        ))}
      </ScrollView>
      {total === 0 ? null : (
        <Pressable
          style={{
            backgroundColor: "#088F8F",
            padding: 10,
            marginBottom: 40,
            margin: 14,
            borderRadius: 7,
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <View>
            <Text style={{ fontSize: 17, fontWeight: "600", color: "white" }}>
              {cart.length}items | Rs. {total}
            </Text>
            <Text
              style={{
                fontSize: 14,
                fontWeight: "500",
                color: "white",
                marginVertical: 6,
              }}
            >
              Extra charges may apply
            </Text>
          </View>

          <Pressable onPress={() => navigation.navigate("PickUp")}>
            <Text style={{ fontSize: 17, fontWeight: "500", color: "white" }}>
              Proceed for pickup
            </Text>
          </Pressable>
        </Pressable>
      )}
    </>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({});
