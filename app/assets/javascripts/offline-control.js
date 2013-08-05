var appCache = window.applicationCache;

$(function(){
	init();
	$('#new_contact').submit(function() {
		if (!navigator.onLine) {			
			alert("Você não está online, espere até ficar online novamente para sincronizar os seus dados com o servidor.")
			saveOffline();
			return false;		
		} else {
			cleanOfflineInfo();
			return true;		
		}
	});
	appCache.addEventListener('updateready', function(){
	  if (appCache.status == appCache.UPDATEREADY) {
	    appCache.swapCache();
	  } 
	}, false);
})

var init = function(){
  checkCacheStatus();
  checkOnlineStatus();  
}

var saveOffline = function(){
	var contact = {
		"name": $('#contact_name').val(),
		"email": $('#contact_email').val(),
		"address": $('#contact_address').val()
	}
	
	storageType()['contact'] = JSON.stringify(contact);
}

var storageType = function(){
	return  localStorage;
}

var cleanOfflineInfo = function(){
	delete storageType()['contact'];
}

var loadOfflineContact = function(){
	if (storageType()['contact']){
		var contact = JSON.parse(storageType()['contact'])
		$('#contact_name').val(contact.name);
		$('#contact_email').val(contact.email);
		$('#contact_address').val(contact.address);
	}	
}

var renderContacts = function(){
  // Compile template
  $.templates( "contactTmpl", "#contactTmpl" );
  $.retrieveJSON("/contacts.json", function(json, status) {
      var content = $.render.contactTmpl( json );        
        $("#contact_details").empty().append(content);
      });
  }

var checkCacheStatus = function(){
	$('#cache_status').html(cacheStatus);
}

var checkOnlineStatus = function(){
	navigator.onLine ? $('#network_status').html('Online') : $('#network_status').html('Offline');
}

var cacheStatus = function(){
	switch (appCache.status) {
	  case appCache.UNCACHED: // UNCACHED == 0
	    return 'UNCACHED';
	    break;
	  case appCache.IDLE: // IDLE == 1 (already have latest version)
	    return 'IDLE';
	    break;
	  case appCache.CHECKING: // CHECKING == 2
	    return 'CHECKING';
	    break;
	  case appCache.DOWNLOADING: // DOWNLOADING == 3
	    return 'DOWNLOADING';
	    break;
	  case appCache.UPDATEREADY:  // UPDATEREADY == 4
	    return 'UPDATEREADY';
	    break;
	  case appCache.OBSOLETE: // OBSOLETE == 5
	    return 'OBSOLETE';
	    break;
	  default:
	    return 'UKNOWN CACHE STATUS';
	    break;
	};	
}
