// @flow
import React, { Component } from 'react';
import {
  StyleSheet, View, Modal, ActivityIndicator,
} from 'react-native';
import Styles from '../Styles';

// common loader component
const Loader = (props) => {
  const { loading, ...attributes } = props;
  return (
    <Modal transparent animationType="none" visible={loading}>
      <View style={Styles.modalBackground}>
        <View style={Styles.activityIndicatorWrapper}>
          <ActivityIndicator animating={loading} size='large' color='#fff'/>
        </View>
      </View>
    </Modal>
  );
};
export default Loader;
