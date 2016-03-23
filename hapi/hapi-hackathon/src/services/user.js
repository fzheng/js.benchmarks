"use strict";

(function (module) {


var User = require('src/models/user');
var _ = require('lodash');


function getPicture(provider, profile) {
  var picture;
  switch(provider) {
    case 'facebook':
      picture = 'https://graph.facebook.com/' + profile.id + '/picture?type=large';
      break;
    case 'twitter':
      picture = profile.raw.profile_image_url_https;
      break;
  }
  return picture;
}

function upsertElement(arr, provider, newElement) {
  var pos = -1;
  _.forEach(arr, function (s, i) {
    if (s.provider === provider) {
      pos = i;
    }
  });

  if (pos >= 0) {
    arr.set(pos, newElement);
  } else {
    arr.push(newElement);
  }
}

module.oauth = function (credentials, current_email) {
  var provider = credentials.provider;
  var profile = credentials.profile;
  var email = current_email || (profile.id + '@' + provider);
  var oauth = {
    provider: provider,
    token: credentials.token,
    secret: credentials.secret 
  };
  var social = {
    provider: provider,
    profile: profile
  };

  return User.findOne({'email': email}).then(function (user) {   

    if (!user) {
      user = User({
          email: email,
          profile: {
            name: profile.displayName,
            picture: getPicture(provider, profile)
          },
          social: [social],
          oauth: [oauth]
      });
    } else {
      upsertElement(user.social, provider, social);
      upsertElement(user.oauth, provider, oauth);
      
    }
    return user.save();
  }).then(function(user) {
    return user.public();
  });
};


module.getToken = function (user_id, provider) {
    return User.findById(user_id).then(function (user) {
      var token;
      if (user) {
        token = _.find(user.oauth, {provider: provider});
      }      
      return token;
    });
};

})(module.exports);


