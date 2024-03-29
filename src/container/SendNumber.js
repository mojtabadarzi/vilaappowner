import React, { Component } from 'react';
import {
    UIManager,
    ImageBackground,
    Image,
    Text,
    View,
    Dimensions,
    TextInput,
    KeyboardAvoidingView,
    Animated
} from 'react-native';


import { Actions } from 'react-native-router-flux';

//components
import GradientButton from '../components/GradientButton';

//style
import styles from '../styles/SendNumber'


class SendNumber extends Component {

    constructor(props) {
        super(props)
        this.state = {
            iranIcon: true,
            code: '+98',
            number: '',
            fadeText: new Animated.Value(1),
            wrongNumber: false
        }
    }


    // country code onchange 
    _changeCode = (e) => {

        //just numbers and (+) have permission
        if (e.trim() === '+98') {
            this.setState({
                iranIcon: true,
                code: e.replace(/[^0-9\+]/g, '').trim()
            })
        } else {
            this.setState({
                iranIcon: false,
                code: e.replace(/[^0-9\+]/g, '').trim()
            })
        }
    }



    // mobile number onchange
    _changeNumber = (e) => {

        // just number has permission
        this.setState({
            number: e.replace(/[^0-9]/g, '').trim()
        })
    }


    // send code function
    _sendNumber = async () => {

        let self = this
        if (this.state.number.length === 10) {

            // merge code and user number 
            let sentNumber = this.state.code + this.state.number
            await this.setState({
                sentNumber: sentNumber.trim()
            })



            // go to enter code page 
            Actions.EnterCode();


        } else if (this.state.number.length === 11) {

            let enternumber = this.state.number.split('')
            await enternumber.splice(0, 1)

            let sentNumber = this.state.code + enternumber.join('')
            await this.setState({
                sentNumber: sentNumber.trim()
            })

            console.log(this.state.sentNumber)
            // go to enter code page 
            Actions.EnterCode();



        } else {

            // animation show permission 
            await this.setState({
                wrongNumber: true
            })

            //text animation 
            Animated.timing(
                this.state.fadeText,
                {
                    toValue: 0,
                    duration: 2000,
                    delay: 3000
                }
            ).start()

            // set text animation opacity value
            // reset wrong number to default
            setTimeout(() => {
                this.setState({
                    wrongNumber: false,
                    fadeText: new Animated.Value(1),
                })
            }, 5000)
        }
    }


    scrolldown(ref) {
        const self = this;
        // this.refs[ref].measure((ox, oy, width, height, px, py) => {
        //     self.refs.scrollView.scrollTo({y: oy - 200});
        // });

        // this.scrollView.getNode().scrollTo({y:100})


        const { State: TextInputState } = TextInput;
        const currentlyFocusedField = TextInputState.currentlyFocusedField();

        UIManager.measure(currentlyFocusedField, (originX, originY, width, height, pageX, pageY) => {
            console.log(originX, originY, width, height, pageX, pageY);
        });
    }


    render() {

        let { fadeText } = this.state

        return (





            <View style={styles.send_number}>

                <ImageBackground style={styles.bg_image}
                    imageStyle={{ borderBottomRightRadius: 300 }}
                    source={require('./../../Assets/Images/sendNumber.png')}
                >

                    <KeyboardAvoidingView style={{
                        width: '100%',
                        justifyContent: 'center',
                        alignItems: 'center',
                    }} behavior="position">
                        <View style={{
                            justifyContent: 'center',
                            alignItems: 'center'
                        }}>
                            <View style={styles.logo_box} >
                                <Image style={styles.logo} source={require('../../Assets/Images/logo1.png')} />
                            </View>
                        </View>

                        <View style={styles.number_inputs}>
                            <Text style={styles.number_inputs_title} >
                                شماره همراه خود را وارد نمایید
                            </Text>


                            <View style={styles.input_box} >
                                <View style={{
                                    flexDirection: 'row',
                                    width: '30%',
                                    justifyContent: 'center',
                                    alignItems: 'center',
                                    borderRightWidth: 1,
                                    borderRightColor: '#ccc',
                                }} >
                                    <Image source={
                                        this.state.iranIcon ?
                                            require('../../Assets/Images/iran.png') :
                                            require('../../Assets/Images/national.png')
                                    } />

                                    <TextInput
                                        style={styles.input_box_1}
                                        onChangeText={(e) => this._changeCode(e)}
                                        value={this.state.code}
                                        keyboardType='numeric'
                                        value={this.state.code}
                                        maxLength={4}
                                    />

                                </View>

                                <TextInput
                                    style={styles.input_box_2}
                                    onChangeText={(e) => this._changeNumber(e)}
                                    value={this.state.number}
                                    keyboardType='numeric'
                                    textContentType="telephoneNumber"
                                    maxLength={11}
                                />

                            </View>


                        </View>

                        {
                            this.state.wrongNumber ?
                                <Animated.Text style={{
                                    height: 20,
                                    width: Dimensions.get('window').width - 100,
                                    fontSize: 10,
                                    fontFamily: 'ISBold',
                                    justifyContent: 'center',
                                    alignItems: 'center',
                                    color: 'red',
                                    paddingHorizontal: 20,
                                    marginTop: 5,
                                    opacity: fadeText
                                }} >
                                    شماره همراه باید ۱۰ کارکتر باشد
                            </Animated.Text> :
                                <Text style={{ height: 20, paddingHorizontal: 20, marginTop: 5, }}></Text>

                        }



                        <GradientButton
                            width={Dimensions.get('window').width - 100}
                            press={this._sendNumber}
                            activeOpacity={.6}
                            color_1="#18749a"
                            color_2="#46add8"
                            height={50}
                            borderRadius={50}
                            textColor="#fff"
                            size={16}
                            title="ارسال"
                            top={20}
                            bottom={100}
                        />


                    </KeyboardAvoidingView>


                </ImageBackground>
            </View>



        );
    }
}




export default SendNumber;