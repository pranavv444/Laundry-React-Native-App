import { StyleSheet, Text, View,ScrollView,Pressable,Image } from 'react-native'
import React from 'react'

const Services = () => {
    const services = [
        {
          id: "0",
          image: "https://cdn-icons-png.flaticon.com/128/3003/3003984.png",
          name: "Washing",
        },
        {
          id: "11",
          image: "https://cdn-icons-png.flaticon.com/128/2975/2975175.png",
          name: "Laundry",
        },
        {
          id: "12",
          image: "https://cdn-icons-png.flaticon.com/128/9753/9753675.png",
          name: "Wash & Iron",
        },
        {
          id: "13",
          image: "https://cdn-icons-png.flaticon.com/128/995/995016.png",
          name: "Cleaning",
        },
      ];
  return (
    <View style={{padding:10}}>
    <Text style={{fontSize:18,fontWeight:"700",marginBottom:8}}>Services Available</Text>
    <ScrollView horizontal showsHorizontalScrollIndicator={false}>
        {services.map((service,index)=>(
            <Pressable style={{margin:8,backgroundColor:"white",padding:21,borderRadius:7}} key={index}>
            <Image source={{uri:service.image}} style={{width:70,height:70}}></Image>
            <Text style={{marginTop:9,textAlign:"center"}}>{service.name}</Text>     
                
            </Pressable>

        ))}
    </ScrollView>
    </View>
  )
}

export default Services

const styles = StyleSheet.create({})