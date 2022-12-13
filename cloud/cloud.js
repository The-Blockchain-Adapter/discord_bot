Moralis.settings.setAPIRateLimit({
    anonymous: 10000, authenticated: 10000, windowMs: 60000
})


Moralis.Cloud.define("getAllUsers", async () => {
    //create the query to get all the users
    var query = new Moralis.Query("User");
    var result = await query.find({ useMasterKey: true });


    //transform into lower case string and return the result
    var stringAllUsers = JSON.stringify(result);
    var allUsers = stringAllUsers.toLowerCase()
    return allUsers;
});


Moralis.Cloud.define("getUserAddress", async (request) => {
    //receive the correct username in the function
    userName = request.params.memberName;


    //create the query to the database
    var query = new Moralis.Query("User");
    query.equalTo("username", userName);
    var result = await query.find({ useMasterKey: true });


    //get, and send the user address
    var userAddress = result[0].get("ethAddress");
    return userAddress;
});