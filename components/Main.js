import React, { Component } from 'react';
import { Text, View, Button } from 'react-native';

import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { fetchUser, signOut } from '../redux/actions/index';

export class Main extends Component {
  componentDidMount() {
    this.props.fetchUser();
  }

  render() {
    console.log(this.props);
    const { currentUser, navigation } = this.props;
    if (currentUser === undefined) {
      return <View />;
    }
    return (
      <View style={{ flex: 1, justifyContent: 'center' }}>
        <Text>{currentUser.name} is Logged In</Text>
        <Button title="Camera" onPress={() => navigation.navigate('Camera')} />
        <Button title="Sign Out" onPress={() => signOut()} />
      </View>
    );
  }
}

const mapStateToProps = (store) => ({
  currentUser: store.userState.currentUser,
});

const mapDispatchProps = (dispatch) =>
  bindActionCreators({ fetchUser }, dispatch);

export default connect(mapStateToProps, mapDispatchProps)(Main);
