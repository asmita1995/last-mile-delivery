

/**
 * New script file
 *//**
 * Place an item 
 * @param {com.syntel.demo.retail.PlaceItem}  placeItemTx - the place item transaction
 * @transaction
 */
 async function PlaceItem(placeItemTx){
    console.log('placeItem');

    var factory = getFactory();
    var namespace = 'com.syntel.demo.retail';

   var placeItem = factory.newResource(namespace,'Parcel',placeItemTx.parcelId);
    placeItem.parcelId = placeItemTx.parcelId;
	placeItem.weight = placeItemTx.weight;
	placeItem.pickUpLocation = placeItemTx.pickUpLocation;
	placeItem.dropOfLocation = placeItemTx.dropOfLocation;
    placeItem.pickUpTime = placeItemTx.pickUpTime;
	placeItem.dropOfTime = placeItemTx.dropOfTime;
	placeItem.parcelVolume = placeItemTx.parcelVolume;
    placeItem.dateOfDelivery = placeItemTx.dateOfDelivery;
    placeItem.liveBidValue= placeItemTx.liveBidValue;
    placeItem.status="D";
    placeItem.customer=placeItemTx.customer;
	placeItem.logisticProvider = getCurrentParticipant();
     
   // placeItem.driver=placeItemTx.driver;
   
   var sourceAddress = placeItemTx.pickUpLocation.locality + ' ' + placeItemTx.pickUpLocation.city + ' ' + placeItemTx.pickUpLocation.postalCode;
   
   var destinationAddress = placeItemTx.dropOfLocation.locality + ' ' + placeItemTx.dropOfLocation.city + ' ' + placeItemTx.dropOfLocation.postalCode;
  
   const distance1 = await request.get({ uri: 'https://maps.googleapis.com/maps/api/distancematrix/json?origins=' + sourceAddress + '&destinations=' + destinationAddress + '&departure_time=now&mode=car&sensor=false', json: true });
   
   const DT=distance1.rows[0].elements[0].distance.text;
   const DT1=parseInt(DT);
    placeItem.estimatedDistance = DT1;
   
   const Time=distance1.rows[0].elements[0].duration.text;
   placeItem.estimatedDeliveryTime =Time;
   
  const  fare = 6;
  const  fare1 = fare*DT1;
  const fare2 = parseFloat(fare1);
   
 placeItem.estimatedBidValue= fare2;

 const participantRegistry = 	await getAssetRegistry('com.syntel.demo.retail.Parcel');
    	await participantRegistry.add(placeItem);
   
   var placeItemEvent = factory.newEvent(namespace,'PlaceItemEvent');
	placeItemEvent.parcelId = placeItem.parcelId;
	placeItemEvent.weight   = placeItem.weight;
    emit(placeItemEvent);
  

 }


/**
 * New script file
 *//**
 * Place an item 
 * @param {com.syntel.demo.retail.UpdateBidValue}  updateBidValueTx - the place item transaction
 * @transaction
 */
async function UpdateBidValue(updateBidValueTx){
  var factory = getFactory();
   var namespace = 'com.syntel.demo.retail';
  updateBidValueTx.liveBidValue = updateBidValueTx.liveBidValue ;
   updateBidValueTx.parcel.driver= getCurrentParticipant();

 var updateBidValueEvent = factory.newEvent(namespace,'updateBidValueEvent');
  // placeItem.parcelId = placeItemTx.parcelId;
updateBidValueEvent.liveBidValue =  updateBidValueTx.liveBidValue;
updateBidValueEvent.driver =getCurrentParticipant(); 
	
    emit(updateBidValueEvent);
  
  const participantRegistry = 	await getAssetRegistry('com.syntel.demo.retail.Parcel');
    	await participantRegistry.update(updateBidValueTx.parcel);
}
    
           

/**
 * New script file
 *//**
 * Place an item 
 * @param {com.syntel.demo.retail.CloseBidding}  closeBiddingTx - the place item transaction
 * @transaction
 */
async function CloseBidding(closeBiddingTx){
 var factory = getFactory();
 var namespace = 'com.syntel.demo.retail';
 closeBiddingTx.parcel.bidingStatus = true;
  
  
  
var closeBiddingEvent = factory.newEvent(namespace,'closeBiddingEvent');
  // placeItem.parcelId = placeItemTx.parcelId;
 
var customer="Your parcel has been picked up from" + ' ' +  closeBiddingTx.parcel.pickUpLocation.locality+' '+"and will be delivered in"+' '+closeBiddingTx.parcel.estimatedDeliveryTime + ' '+"Driver name is:"+ closeBiddingTx.parcel.driver.name;
  
  closeBiddingEvent.msg= customer;
	//updateBidValueEvent.weight   = updateBidValueEvent.weight;
    emit(closeBiddingEvent);
  
    const participantRegistry = 	await getAssetRegistry('com.syntel.demo.retail.Parcel');
    	await participantRegistry.update(closeBiddingTx.parcel);
  
}





/**
 * New script file
 *//**
 * Place an item 
 * @param {com.syntel.demo.retail.allDriver}  allDriverTx - the place item transaction
 * @transaction
 */



function allDriver(allDriverTx){
/*
return getParticipantRegistry('com.syntel.demo.retail.Driver')
   .then(function(driverRegistry){
	    return query('getStatus')
	      .then(function(results){
		
		if(results.length==0){
			throw new Error('no driver in the registry');
		}
		
	for(var n=0;n<results.length;n++){
			
		var status = results[n];
		
		console.log(status);
		}
		  
		 });
		
    });
    */
 
  return getAssetRegistry('com.syntel.demo.retail.Parcel')
   .then(function(parcelRegistry){
	    
		var parcelId = allDriverTx.parcelId;   
   // parcelID1=driver.parcelId
            return query('getParcel',{parcelId: parcelId})
                .then(function (results) {
                      if(results.length == 0){
                        throw new Error('INVALID parcelID');
                    }
		
		for(var i=0;i<results.length;i++){
		var arr = results[i];
		
		console.log(arr);
		}
            
               
   return getParticipantRegistry('com.syntel.demo.retail.Driver')
  .then(function (participantRegistry) {
     
   
  //  var parcelId = allDriverTx.parcelId;  
 // return participantRegistry.get();
     
     var emailId=allDriverTx.emailId;
   
    {
 //var parcelId = allDriverTx.parcelId;
    return query('getStatus',{emailId1:emailId})
    }
  })
               .then(function(results){
	    
                if(results.length == 0){
                        throw new Error('INVALID parcelID');
                    }
		
		for(var i=0;i<results.length;i++){
		var arr = results[i];
		
		console.log(arr);
        }
        
     
   return getParticipantRegistry('com.syntel.demo.retail.Customer')
  .then(function (customerRegistry) {
    
  
   //  return  customerRegistry.get(cust);
     
     var emailId=allDriverTx.customeremailId;
   
    {
    return query('getCustomer',{emailId:emailId})
    }
  })
               .then(function(results){
	    
                if(results.length == 0){
                        throw new Error('INVALID parcelID');
                    }
		
		for(var i=0;i<results.length;i++){
		var arr = results[i];
		
		console.log(arr);
		}
      })
     })
  	})
			
  });
}
		
    
  /*

return getParticipantRegistry('com.syntel.demo.retail.Driver')
  .then(function (participantRegistry) {
    
   return participantRegistry.getAll();
    
   
    {
    return query('getStatus');
    }
  })
        
  .then(function(results){
      
		
		if(results.length==0){
			throw new Error('no driver in the registry');
		}
    console.log("asmita");
  
  
		
	for(var n=0;n<results.length;n++){
			
		var status = results[n];
		
		console.log(status);
	
   }
    	 
  })
    
}

        
/*
  
var parcelId2 = allDriverTx.parcelId;
 var parcel1 =allDriverTx.parcel.parcelId;
  
allDriverTx.parcelId = allDriverTx.parcelId;  
  
    if(parcel1==parcelId2) {
      
  return getParticipantRegistry('com.syntel.demo.retail.Driver')
  .then(function (participantRegistry) {
    
   
     
    return participantRegistry.getAll();
    
    {
    return query('getStatus');
    }
        
      })
    
      
  
   .then(function(results){
      
		
		if(results.length==0){
			throw new Error('no driver in the registry');
		}
    console.log("asmita");
  
  
		
	for(var n=0;n<results.length;n++){
			
		var status = results[n];
		
		console.log(status);
		}
    	 
  })
    }
  /*
return getAssetRegistry('com.syntel.demo.retail.Parcel')
       .then(function(parcelRegistry) {
              
              return query('getParcel')
  
        })
    
 .then(function(results1){
      
		
		if(results1.length==0){
			throw new Error('no driver in the registry');
		}
    console.log("asmita");
   
     for(var n=0;n<results1.length;n++){
			
		var status1 = results1[n];
		
		console.log(status1);
		}
    	 
  });
  */
    
    /*
    // Get all of the drivers in the driver participant registry.
    return participantRegistry.getAll();
    return query('getStatus')
  })
  .then(function (drivers) {
    // Process the array of driver objects.
    drivers.forEach(function (driver) {
      console.log(driver.name);
    });
  })
  .catch(function (error) {
    // Add optional error handling here.
  });
  */



