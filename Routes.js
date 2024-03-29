import React from 'react';

import { Router, Scene, Actions } from 'react-native-router-flux';
import { Text, View, Image, TouchableOpacity, ActivityIndicator } from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

import SendNumber from './src/container/SendNumber';
import EnterCode from './src/container/EnterCode';
import Home from './src/container/Home';
import Profile from './src/container/Profile';
import Details from './src/container/Details';
import EditDetails from './src/container/EditDetails';
import RentPage from './src/container/RentPage';
import MyFlatsPage from './src/container/MyFlatsPage';
import Archives from './src/container/Archives';
import AboutUs from './src/container/AboutUs';
import Notifications from './src/container/Notifications';
import Rules from './src/container/Rules';
import Support from './src/container/Support';
import Splash from './src/components/SplashScreen'





//back button
const backButton = () => (
    <TouchableOpacity
        onPress={() => Actions.pop()}
        style={{
            width: 60,
            height: 60,
            alignItems: 'center',
            justifyContent: 'center',
        }}
    >
        <View >
            <Icon size={36} name="chevron-right" color="#A52D53" />
        </View>
    </TouchableOpacity>
);



//pass nothing 
const nothing = () => { return <View /> }


class Routes extends React.Component {
    constructor(props) {
        super(props)

        this.state = {
            logged: false,
            loading: true,
        };
    }

    componentDidMount = async () => {
        self = this;
        await AsyncStorage.getItem('@token')
            .then((value) => {
                if (value != null) {
                    this.setState({
                        logged: true,
                        loading: false,
                    });
                } else {
                    this.setState({
                        loading: false,
                    })
                }
            }
            );
        if (this.state.logged) {
            Actions.Home()
        } else {
            Actions.SendNumber()
        }
    };







    render() {
        if (this.state.loading) {
            return <Splash />
        }

        return (

            < Router >
                <Scene key="root" >

                    <Scene key="SendNumber"
                        component={SendNumber}
                        title=""
                        hideNavBar={true}
                    // initial={!this.state.logged}

                    />
                    <Scene key="EnterCode" component={EnterCode}
                        title=""
                        titleStyle={{ color: 'transparent' }}
                        renderRightButton={() => backButton()}
                        renderBackButton={() => nothing}
                        navigationBarStyle={styles.login_style_bar}
                        sceneStyle={styles.login_scene_style}
                    />

                    <Scene key="Home"
                        component={Home}
                        hideNavBar={true}
                    // initial={this.state.logged}

                    />

                    <Scene key="Profile" component={Profile}
                        title="پروفایل"
                        titleStyle={styles.title_style}
                        renderBackButton={() => nothing}
                        renderRightButton={() => backButton()}
                        navigationBarStyle={styles.login_style_bar}
                    />


                    <Scene key="MyFlatsPage" component={MyFlatsPage}
                        title=""
                        hideNavBar={true}
                    />

                    <Scene key="Details" component={Details}
                        title=""
                        hideNavBar={true}

                    />

                    <Scene key="EditDetails" component={EditDetails}
                        title=""
                        hideNavBar={true}
                    />

                    <Scene key="RentPage" component={RentPage}
                        hideNavBar={true}
                        renderRightButton={() => backButton()}
                        renderBackButton={() => nothing()}
                        navigationBarStyle={styles.login_style_bar}
                    />


                    <Scene key="Archives" component={Archives}
                        title="آرشیو"
                        titleStyle={styles.title_style}
                        renderRightButton={() => backButton()}
                        renderBackButton={() => nothing()}
                        navigationBarStyle={styles.login_style_bar}
                    />

                    <Scene key="Support" component={Support}
                        title="پشتیبانی"
                        titleStyle={styles.title_style}
                        renderRightButton={() => backButton()}
                        renderBackButton={() => nothing()}
                        navigationBarStyle={styles.login_style_bar}
                    />

                    <Scene key="Rules" component={Rules}
                        title="قوانین و مقررات"
                        titleStyle={styles.title_style}
                        renderRightButton={() => backButton()}
                        renderBackButton={() => nothing()}
                        navigationBarStyle={styles.login_style_bar}
                    />

                    <Scene key="Notifications" component={Notifications}
                        title="توجهات"
                        titleStyle={styles.title_style}
                        renderRightButton={() => backButton()}
                        renderBackButton={() => nothing()}
                        navigationBarStyle={styles.login_style_bar}
                    />
                    <Scene key="AboutUs" component={AboutUs}
                        title="درباره ما"
                        titleStyle={styles.title_style}
                        renderRightButton={() => backButton()}
                        renderBackButton={() => nothing()}
                        navigationBarStyle={styles.login_style_bar}
                    />



                </Scene>
            </Router >
        )

    }
}

export default Routes;

const styles = ({
    login_style_bar: {
        backgroundColor: '#eee',
        elevation: 0,
        height: 50,
    },
    login_style_bar_detail: {
        backgroundColor: 'transparent',
        shadowColor: "#f7f7f7",
        elevation: 0,
        height: 0,
    },
    bell: {
        width: 30,
        height: 30,
        justifyContent: 'center',
        alignItems: 'center',
    },
    notification: {
        width: 14,
        height: 14,
        borderRadius: 7,
        backgroundColor: '#B22850',
        start: 10,
        top: -10,
        justifyContent: 'center',
        alignItems: 'center',
    },
    notification_text: {
        color: '#fff',
        fontSize: 9,
        fontFamily: 'ISFMedium',
    },

    notification_box: {
        width: 40,
        height: 40,
        left: 20,
        justifyContent: 'center',
        alignItems: 'center',
    },
    bell: {
        width: 30,
        height: 30,
        justifyContent: 'center',
        alignItems: 'center',
    },
    notification: {
        width: 14,
        height: 14,
        borderRadius: 7,
        backgroundColor: '#B22850',
        start: 10,
        top: -10,
        justifyContent: 'center',
        alignItems: 'center',
    },
    notification_text: {
        color: '#fff',
        fontSize: 9,
        fontFamily: 'ISFMedium',
    },
    title_style:{
        color: '#333', 
        paddingRight: 20, 
        fontFamily: 'ISBold', 
        textAlign: 'right', 
        width: '100%', 
        fontSize: 16,
        backgroundColor:'#eee'
    }
})


