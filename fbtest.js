// This is called with the results from from FB.getLoginStatus().
function statusChangeCallback(response) {
	console.log('statusChangeCallback');
	console.log(response);
	// The response object is returned with a status field that lets the
	// app know the current login status of the person.
	// Full docs on the response object can be found in the documentation
	// for FB.getLoginStatus().
	if (response.status === 'connected') {
	  // Logged into your app and Facebook.
	  testAPI();
	  getUserInfo();
	  oneEvent('/857296087642658');
	  allAttendingEvents();
	} else if (response.status === 'not_authorized') {
	  // The person is logged into Facebook, but not your app.
	  document.getElementById('status').innerHTML = 'Please log ' +
	    'into this app.';
	} else {
	  // The person is not logged into Facebook, so we're not sure if
	  // they are logged into this app or not.
	  document.getElementById('status').innerHTML = 'Please log ' +
	    'into Facebook.';
	}
}

// This function is called when someone finishes with the Login
// Button.  See the onlogin handler attached to it in the sample
// code below.
function checkLoginState() {
FB.getLoginStatus(function(response) {
  statusChangeCallback(response);
});
}


  // Here we run a very simple test of the Graph API after login is
  // successful.  See statusChangeCallback() for when this call is made.
  function testAPI() {
    console.log('Welcome!  Fetching your information.... ');
    FB.api('/me', function(response) {
      console.log('Successful login for: ' + response.name);

    document.getElementById('status').innerHTML =
    'Thanks for logging in, ' + response.name + '!';
	});
}

  function getUserInfo() {
    console.log('getting User info');
    FB.api('/me', function(response) {

    var strInfos="";

    strInfos +="<b>Name</b> : "+response.name+"<br>";
	strInfos +="<b>Link: </b>"+response.link+"<br>";
	strInfos +="<b>Username:</b> "+response.username+"<br>";
	strInfos +="<b>id: </b>"+response.id+"<br>";
	strInfos +="<b>Email:</b> "+response.email+"<br>";
	strInfos +="<input type='button' value='Logout' onclick='Logout();'/><br>";

    document.getElementById('infosMax').innerHTML = strInfos;
    getPhoto();
    });
  }

   function getPhoto() {
   	console.log('getting picture');
   	FB.api('/me/picture', 
   		{
        "redirect": false,
        "height": "100",
        "type": "normal",
        "width": "100"
    	},

   		function(response) {
   		if(response && !response.error){
   			console.log('got picture');
   			document.getElementById('ppicture').innerHTML = "<img src=\"" + response.data.url + "\"/>";

   		}
   	});
   }

    function oneEvent(EventID) {
    console.log(' Fetching event '+EventID);
    FB.api(EventID,
	    function(response) {
	    console.log('retrieved info' + response.name);

	    var strEvent="";
	    strEvent +="<b>Name: </b>"+ response.name+"<br>";
   	    strEvent +="<b>Id: </b>"+ response.id+"<br>";
   	    strEvent +="<b>Owner: </b>"+ response.owner.name+"<br>";
   	    strEvent +="<b>Privacy: </b>"+ response.privacy+"<br>";


	    document.getElementById('oneEvent').innerHTML = strEvent;
	    });
   	}

   	function allAttendingEvents(){
   	console.log(' Fetching all attending events ');
    FB.api('/me/events/attending',
	    function(response) {
		    if (response && !response.error) {
		
		    	console.log('retrieved info');
		    	var 	strEvent="";
		    	for (var i = response.data.length - 1; i >= 0; i--) 

		    	{
		    		strEvent += "Event " + i + " " +response.data[i].name + "<br>";
		    		strEvent += "  time " + response.data[i].start_time + "<br>";
		    		strEvent += " at " + response.data[i].location + "<br>";
		    		strEvent += "<br>";

		    	};
		    	
		    	document.getElementById('attendingEvents').innerHTML = strEvent;
		    }
	    });	


   	}

    function Logout()
    {
        FB.logout(function(){document.location.reload();});
    }
