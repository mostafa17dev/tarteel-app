import React from "react"
import { View, Text, FlatList, TouchableWithoutFeedback, Linking, Share, Alert } from "react-native"
import { connect } from "react-redux"
import { Actions } from "react-native-router-flux"
import { MaterialCommunityIcons } from "@expo/vector-icons"

import Navbar from "../Navbar";
import Button from  "../Button"
import StatusBar from  "../StatusBar"
import Snackbar from '../SnackBar'

import { restoreRecords } from "../../store/actions/index"
import { numberWithCommas } from "../../utils"
import showError from "../../utils/showError";
import AnimatedCircularProgress  from '../../utils/AnimatedCircularProgress'

import styles from "./styles"
import NavbarStyles from "../Navbar/styles"

class Profile extends React.Component {
  state = {
    fill: 100,
    linksList: [
      {
        text: "Change Surah / Ayah",
        key: 1,
        onClick: () => Actions.change()
      },
      {
        text: "Demographic data",
        key: 1,
        onClick: () => Actions.demographicForm()
      },
      {
        text: "Share Tarteel",
        key: 2,
        onClick: () => {
          Share.share({
            message: 'Test test test',
            url: 'https://expo.io/',
            title: 'React Native',
          }).then(() => {

          }).catch(e => showError(e.message))
        }
      },
      {
        text: "Privacy policy",
        key: 3,
        onClick: () => Linking.openURL("https://tarteel.io/privacy")
      },
      {
        text: "Reset records",
        key: 4,
        onClick: () => {
          Alert.alert(
            'Are you sure ?',
            'This is going to remove all your recordings history',
            [
              {text: 'Cancel', style: 'cancel'},
              {text: 'Restore', onPress: this.handleRestore },
            ],
            { cancelable: true }
          )

        }
      },
      {
        text: "Contact us",
        key: 5,
        onClick: () => Linking.openURL("mailto:support@tarteel.io")
      },
    ]
  }
  handleRestore = () => {
    this.props.dispatch(restoreRecords())
  }
  render() {
    const { linksList } = this.state
    const { ayahsCount } = this.props
    return (
      <View style={styles.container}>
        <StatusBar />
        <Navbar>
          <View style={NavbarStyles.left} >
            <Button color={"transparent"} Height={35} Width={35} radius={0} onPress={Actions.pop}>
              <View>
                <MaterialCommunityIcons name={"keyboard-backspace"} size={32} color={"#474f59"} />
              </View>
            </Button>
          </View>
          <View >
            <Text style={[NavbarStyles.center, styles.primaryColor]}>
              Profile
            </Text>
          </View>
        </Navbar>
        <View style={styles.content}>
          <View style={styles.progressContainer}>
            <AnimatedCircularProgress
              size={120}
              width={3}
              fill={75}
              rotation={360}
              duration={1000}
              tintColor="#5ec49e"
              onAnimationComplete={() => console.log('onAnimationComplete')}
              backgroundColor="#ccc" >
              {
                (fill) => (
                  <View>
                    <Text style={styles.ayahsCount}>
                      { String(numberWithCommas((ayahsCount))) }
                    </Text>
                    <Text style={styles.progressText} >
                      Ayah recited
                    </Text>
                  </View>
                )
              }
            </AnimatedCircularProgress>
          </View>
          <View style={styles.list}>
            <FlatList
              data={linksList}
              renderItem={({item}) => <ListItem item={item} /> }
            />
          </View>
        </View>
      </View>
    )
  }
}

const ListItem = ({ item }) => {
  return (
    <View style={styles.listItem}>
      <TouchableWithoutFeedback onPress={item.onClick} >
        <View>
          <Text style={styles.primaryColor}>
            { item.text }
          </Text>
        </View>
      </TouchableWithoutFeedback>
    </View>
  )
}


export default connect(
  state => ({
    ayahsCount: state.ayahs.count,
    demographicData: state.demographicData,
    passedOnBoarding: state.data.passedOnBoarding
  })
)(Profile)
