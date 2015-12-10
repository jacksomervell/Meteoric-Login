if (Meteor.isClient) {

//The register funcitonality with error handling if the email has been taken: 

Template.register.events({
    'submit form': function(event){
        event.preventDefault();
        var email = $('[name=email]').val();
        var name = $('[name=name]').val();
        var city = $('[name=city]').val();
        var password = $('[name=password]').val();
        Accounts.createUser({
            email: email,
            password: password,
            profile: {'name': name, 'city': city}
        },
         function(error){
          if(error){
            alert(error.reason); 
          } 
          else {
            Router.go("home"); 
          }
      })
    }
})

//The login funcitonality with error handling if the password is incorrect, or if the email is not recognised:

Template.login.events({
    'submit form': function(event){
        event.preventDefault();
        var email = $('[name=email]').val();
        var password = $('[name=password]').val();
        Meteor.loginWithPassword(email, password, function(error){
          if (error){
            alert(error.reason);
          }
          else {
            Router.go('home');
          }
        })
    }
});

//the logout function:

Template.navigation.events({
    'click .logout': function(event){
        event.preventDefault();
        Meteor.logout();
        Router.go('login');
    }
});


//these functions allow the user to update their respective fields as they type rather than via a form:

Template.updating.events({

  'keyup [name=updateName]': function(event){
    var updatedName = $(event.target).val();
    Meteor.users.update({_id: Meteor.user()._id}, {$set: {"profile.name": updatedName}});
    console.log(Meteor.user().profile.name);
    },

    'keyup [name=updateCity]': function(event){
    var updatedCity = $(event.target).val();
    Meteor.users.update({_id: Meteor.user()._id}, {$set: {"profile.city": updatedCity}});
    console.log(Meteor.user().profile.city);
    },

    'keyup [name=updateEmail]': function(event){
    var updatedEmail = $(event.target).val();
    Meteor.users.update({_id: Meteor.user()._id}, {$set: {"emails.0.address": updatedEmail}});
    }


})

}

//this statement, on the server side, allows the user to update their email address:

if (Meteor.isServer) {
  Meteor.users.allow({
    update: function (userId, user) {     
    return userId === user._id; 
    }
  });
}


//Routing:

Router.route('/register');

Router.route('/login');

Router.route('/updating');

Router.route('/', {
  template: 'home',
  name: 'home'
});

// this makes the default template the main template:
Router.configure({
  layoutTemplate: 'main'
})

