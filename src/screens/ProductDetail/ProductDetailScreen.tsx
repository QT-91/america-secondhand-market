import React, { useLayoutEffect, useRef, useState } from "react";
import {
  ScrollView,
  Text,
  View,
  Image,
  Dimensions,
  TouchableHighlight,
} from "react-native";
import styles from "./styles";
import Carousel, { Pagination } from "react-native-snap-carousel";
import BackButton from "@/components/BackButton/BackButton";
import ViewIngredientsButton from "@/components/ViewIngredientsButton/ViewIngredientsButton";

import { dbURL } from '@/hooks/api'


const { width: viewportWidth } = Dimensions.get("window");

const options: Intl.DateTimeFormatOptions = {
  weekday: "short",
  year: "numeric",
  month: "long",
  day: "numeric",
  hour: "numeric",
  minute: "numeric",
  second: "numeric",
  timeZone: "America/New_York",
	timeZoneName: "short",
};


export default function ProductDetailScreen(props) {
  const { navigation, route } = props;

  const item = route.params?.item;
  const created_date = new Date(item.created_date).toLocaleString('en-US', options);

  const [activeSlide, setActiveSlide] = useState(0);
  const slider1Ref = useRef();

  useLayoutEffect(() => {
    navigation.setOptions({
      headerTransparent: "true",
      headerLeft: () => (
        <BackButton
          onPress={() => {
            navigation.goBack();
          }}
        />
      ),
      headerRight: () => <View />,
    });
  }, []);

  const renderImage = ({ item }) => (
    <TouchableHighlight>
      <View style={styles.imageContainer}>
        <Image style={styles.image} source={{ uri: dbURL + item.image.file }} />
      </View>
    </TouchableHighlight>
  );

  return (
    <ScrollView style={styles.container}>
      <View style={styles.carouselContainer}>
        <View style={styles.carousel}>
          <Carousel
            ref={slider1Ref}
            data={item.images}
            renderItem={renderImage}
            sliderWidth={viewportWidth}
            itemWidth={viewportWidth}
            inactiveSlideScale={1}
            inactiveSlideOpacity={1}
            firstItem={0}
            loop={false}
            autoplay={false}
            autoplayDelay={500}
            autoplayInterval={3000}
            onSnapToItem={(index: number) => setActiveSlide(index)}
          />
          <Pagination
            dotsLength={item.images.length}
            activeDotIndex={activeSlide}
            containerStyle={styles.paginationContainer}
            dotColor="rgb(0, 0, 0)"
            dotStyle={styles.paginationDot}
            inactiveDotColor="white"
            inactiveDotOpacity={0.4}
            inactiveDotScale={0.6}
            carouselRef={slider1Ref.current}
            tappableDots={!!slider1Ref.current}
          />
        </View>
      </View>
      <View style={styles.infoRecipeContainer}>
        <Text style={styles.infoRecipeName}>{item.title}</Text>
        <View style={styles.infoContainer}>
          <Text style={styles.category}>{item.status}</Text>
        </View>

        <View style={styles.infoContainer}>
          <Text style={styles.infoRecipe}>{item.price}$</Text>
        </View>

        <View style={styles.infoContainer}>
          <View>
            <Text>{item.seller_info}</Text>
          </View>
          <View>
            <Text>{item.location}</Text>
          </View>
        </View>

        <View style={styles.infoContainer}>
          <Text style={styles.infoDescriptionRecipe}>{item.description}</Text>
        </View>

        <View style={styles.infoContainer}>
          <ViewIngredientsButton
            value="Contact Seller"
            onPress={() => {
              console.log('pressed')
            }}
          />
        </View>
      </View>
    </ScrollView>
  );
}
