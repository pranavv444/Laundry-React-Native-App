import { StyleSheet, Text, View, Pressable, Image } from "react-native";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { addToCart, decrementQuantity, incrementQuantity } from "../CartReducer";
import { decrementQty, incrementQty } from "../ProductReducer";

const DressItem = ({ item }) => {
  const dispatch = useDispatch();
  const cart = useSelector((state) => state.cart.cart);
  const addItemToCart = () => {
    dispatch(addToCart(item)); //cart
    dispatch(incrementQty(item)); // for product reducer
  };
  return (
    <>
      <Pressable
        style={{
          backgroundColor: "#F8F8F8",
          borderRadius: 8,
          padding: 10,
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "space-between",
          margin: 13,
        }}
      >
        <Image
          style={{ width: 70, height: 70 }}
          source={{ uri: item.image }}
        ></Image>
        <View>
          <Text
            style={{
              width: 83,
              fontSize: 16,
              fontWeight: "600",
              marginBottom: 7,
            }}
          >
            {item.name}
          </Text>
          <Text style={{ width: 59, color: "grey", fontSize: 16 }}>
            Rs.{item.price}
          </Text>
        </View>

        {cart.some((cartItem) => cartItem.id === item.id) ? (
          <Pressable
            style={{
              flexDirection: "row",
              paddingHorizontal: 10,
              paddingVertical: 5,
            }}
          >
            <Pressable onPress={()=>{
              dispatch(decrementQuantity(item)); //cart
              dispatch(decrementQty(item)); //product
            }}
              style={{
                width: 26,
                height: 26,
                borderRadius: 14,
                borderColor: "#BEBEBE",
                backgroundColor: "#E0E0E0",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <Text
                style={{
                  fontSize: 20,
                  color: "#088F8F",
                  paddingHorizontal: 6,
                  fontWeight: "600",
                  textAlign: "center",
                }}
              >
                -
              </Text>
              </Pressable>
              
              <Pressable>
                <Text
                  style={{
                    fontSize: 19,
                    color: "088F8F",
                    paddingHorizontal: 8,
                    fontWeight: "600",
                  }}
                >
                  {item.quantity}
                </Text>
              </Pressable>
              <Pressable onPress={()=>{
                dispatch(incrementQuantity(item)); //cart
                dispatch(incrementQty(item)); // product
              }}
                style={{
                  width: 26,
                  height: 26,
                  borderRadius: 13,
                  borderColor: "#BEBEBE",
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <Text
                  style={{
                    fontSize: 20,
                    color: "#088F8F",
                    paddingHorizontal: 6,
                    fontWeight: "600",
                    textAlign: "center",
                  }}
                >
                  +
                </Text>
              
            </Pressable>
          </Pressable>
        ) : (
          <Pressable onPress={addItemToCart} style={{ width: 80 }}>
            <Text
              style={{
                borderColor: "grey",
                borderWidth: 0.7,
                borderRadius: 3,
                marginVertical: 10,
                color: "#088F8F",
                textAlign: "center",
                padding: 6,
                fontSize: 15,
                fontWeight: "bold",
              }}
            >
              Add
            </Text>
          </Pressable>
        )}
      </Pressable>
    </>
  );
};

export default DressItem;

const styles = StyleSheet.create({});
