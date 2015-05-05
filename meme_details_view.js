'use strict';

var React = require('react-native');
var {width, height} = require('Dimensions').get('window');

var {
    StyleSheet,
    Text,
    View,
    Image
    } = React;

var MemeDetailsView = React.createClass({

  render: function () {
    var thumbnailSource = this.props.meme.link;
    var source = {
      uri: thumbnailSource
    };

    return (
      <View style={styles.container}>
        <Text>{this.props.meme.title}</Text>
        <Image style={styles.image} resizeMode={Image.resizeMode.contain} source={source}/>
      </View>
    );

  }
});

var styles = StyleSheet.create({
  container: {
    marginTop: 75,
    alignItems: 'center'
  },
  image: {
    width: width,
    height: 320
  }
});

module.exports = MemeDetailsView;