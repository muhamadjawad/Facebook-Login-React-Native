// ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

import React, {Component, useState} from 'react';
import {Button, TouchableOpacity, View, Text} from 'react-native';
import {LoginManager, AccessToken} from 'react-native-fbsdk';
import {height, width} from 'react-native-dimension';
import {Icon} from 'native-base';

export default class FbLoginButton extends Component {
  state = {
    token_fb: '',
  };

  constructor() {
    super();
    this.state = {
      token_fb: '',
    };
  }

  async initUser(token) {
    let url =
      'https://graph.facebook.com/v2.5/me?fields=email,name,friends&access_token=' +
      token;
    console.log('URLS', url);
    try {
      const response = await fetch(url);
      // console.log('REsponse', response);
      // Storing data in form of JSON
      var data = await response.json();
      console.log(data);
    } catch (err) {
      console.log('Errr Message in fetvhinh data', err);
    }
  }

  handleFacebookLogin = () => {
    let token = '';

    LoginManager.logInWithPermissions([
      'public_profile',
      'email',
      // 'user_friends',
    ]).then(
      result => {
        if (result.isCancelled) {
          console.log('Login cancelled');
        } else {
          console.log(
            'Login success with permissions: ' +
              result.grantedPermissions.toString(),
          );

          AccessToken.getCurrentAccessToken().then(data => {
            token = data.accessToken.toString();
            console.log('Token===', token);
            this.state.token_fb = token;
          });
        }
      },

      function ss(error) {
        console.log('Login fail with error: ' + error);
      },
      LoginManager.getLoginBehavior(),
    );
  };

  returnState = () => {
    console.log('show_token', this.state.token_fb);
  };
  render() {
    return (
      <View>
        {/* <Button
          onPress={this.handleFacebookLogin}
          title="Continue with fb"
          color="#4267B2"
        /> */}

        <TouchableOpacity
          onPress={this.handleFacebookLogin}
          style={{
            height: width(17),
            marginHorizontal: width(10),
            backgroundColor: 'white',
            borderRadius: width(10),
            shadowColor: 'black',
            flexDirection: 'row',
            elevation: 2,
          }}>
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'space-around',
              flex: 1,
            }}>
            <Icon
              type="EvilIcons"
              name="sc-facebook"
              color="blue"
              style={{
                fontSize: width(13),
                flex: 0.15,
                color: '#1877f2',
              }}
            />
            <Text
              style={{
                color: 'black',
                fontSize: width(5),
                flex: 0.7,
                opacity: 0.7,
              }}>
              Continue With Facebook
            </Text>
          </View>
        </TouchableOpacity>

        <Button
          onPress={() => this.initUser(this.state.token_fb)}
          title="Fetch Data"
          color="#4267C2"
        />
      </View>
    );
  }
}
