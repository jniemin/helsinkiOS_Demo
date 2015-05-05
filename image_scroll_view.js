'use strict';

var React = require('react-native');
var Dimensions = require('Dimensions');
var {width, height} = Dimensions.get('window');

var MemeDetailsView = require("./meme_details_view");

var {
    ActivityIndicatorIOS,
    StyleSheet,
    Text,
    View,
    ScrollView,
    Image,
    TouchableHighlight
    } = React;

var ImageScrollView = React.createClass({

  getInitialState: function() {
    return {
      data: [],
      loading :true
    };
  },

  componentDidMount: function() {
    this.fetchData();
  },

  render: function(){

    if(this.state.loading){
      return (
          <View style={styles.loading}>
            <ActivityIndicatorIOS
                size='large'/>
            <Text>
              Loading memes...
            </Text>
          </View>
      );

    }else{
      return (
          <ScrollView contentContainerStyle={styles.contentContainer}>
            {this.state.data.map(this.renderImages)}
          </ScrollView>
      )
    }

  },
  renderImages : function(item){
    if(!item.is_album){
      var thumbnailSource = this.__parseThumbnailUrl(item.link);
      var source = {
        uri: thumbnailSource
      };
      return(
          <TouchableHighlight onPress={() => this.showMemeDetails(item)}>
            <Image style={styles.thumbnail} source={source}/>
          </TouchableHighlight>
      );
    }

  },
  showMemeDetails : function(meme){

    this.props.navigator.push({
      title: "Meme details",
      component: MemeDetailsView,
      passProps: {
        meme: meme
      }
    });

  },
  fetchData: function(){

    var apiKey = "YOUR_API_KEY_HERE";
    var authorization = "Client-ID " + apiKey;

    var headers = {
      "Authorization": authorization
    };
    var options = { method: 'GET',
      headers: headers,
      mode: 'cors',
      cache: 'default' };

    var REQUEST_URL = "https://api.imgur.com/3/g/memes/top/0.json";
    fetch(REQUEST_URL, options)
        .then((response) => response.json())
        .then((responseData) => {
          this.setState({
            data: responseData.data,
            loading: false
          });
        })
        .done();
  },

  /**
   * Converts link to thumbnail url (https://api.imgur.com/models/image)
   * @param link
   * @returns {string}
   * @private
   */
  __parseThumbnailUrl : function (link){
    var imageUrl = link;
    var lastCommaIndex = imageUrl.lastIndexOf(".");
    var imageUrlStart = imageUrl.substring(0,lastCommaIndex);
    var imageUrlEnd = imageUrl.substring(lastCommaIndex, imageUrl.length);
    return imageUrlStart +"m"+imageUrlEnd;
  }

});

module.exports = ImageScrollView;

var styles = StyleSheet.create({
  contentContainer: {
    flexDirection: "row",
    flexWrap : "wrap",
    justifyContent : "flex-start",
    paddingTop: 5,
    paddingLeft: 5
  },
  thumbnail: {
    marginRight: 2,
    marginBottom: 2,
    width: ( (width / 3) - 5),
    height: ( (width / 3) - 5)
  },
  loading: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center'
  }
});

// Fake data that can be used if you don't want to get API key to imgur.com
var fakeData = [
  {
    "id": "tzdnlIi",
    "title": "Fucking hate me.",
    "description": "It can't rain all the time.\n\nTiny FP Edit:\nI do thank you all for giving me my first FP. You've made a great day greater.\n\nI do want to throw in that we probably weren't cared about too much because while she was leaving me, it must've been hilarious to her to choose that time to admit to cheating twice. If you're already going to do something that could be considered \"bad\", try not to twist the knife, that's just sociopathic.",
    "datetime": 1430504547,
    "type": "image\/png",
    "animated": false,
    "width": 500,
    "height": 500,
    "size": 181255,
    "views": 719333,
    "bandwidth": 130382702915,
    "vote": null,
    "favorite": false,
    "nsfw": false,
    "section": null,
    "account_url": "TheDarkWave",
    "account_id": 1428305,
    "topic": "Awesome",
    "topic_id": 5,
    "link": "http:\/\/i.imgur.com\/tzdnlIi.png",
    "comment_count": 518,
    "ups": 12417,
    "downs": 473,
    "score": 12303,
    "is_album": false
  }, {
    "id": "JWmZCSM",
    "title": "It's bound to happen.",
    "description": null,
    "datetime": 1430572131,
    "type": "image\/png",
    "animated": false,
    "width": 400,
    "height": 400,
    "size": 223542,
    "views": 449261,
    "bandwidth": 100428702462,
    "vote": null,
    "favorite": false,
    "nsfw": false,
    "section": null,
    "account_url": "watchyourfuckingmouth",
    "account_id": 20069304,
    "topic": "The More You Know",
    "topic_id": 11,
    "link": "http:\/\/i.imgur.com\/JWmZCSM.png",
    "comment_count": 184,
    "ups": 6916,
    "downs": 156,
    "score": 6984,
    "is_album": false
  }
];