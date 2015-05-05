'use strict';

var React = require('react-native');
var ImageScrollView = require("./image_scroll_view");

var {
  AppRegistry,
  StyleSheet,
    NavigatorIOS
} = React;

var helsinkiOS_Demo = React.createClass({

  render: function() {
    var initialRoute = {
      component: ImageScrollView,
      title: 'Memes'
    };
    return (
        <NavigatorIOS style={styles.container} initialRoute={initialRoute}/>
    );
  }
});

var styles = StyleSheet.create({
  container: {
    backgroundColor: '#F5FCFF',
    flex: 1
  }
});

AppRegistry.registerComponent('helsinkiOS_Demo', () => helsinkiOS_Demo);
