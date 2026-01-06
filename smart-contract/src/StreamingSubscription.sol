// SPDX-License-Identifier: MIT
// Author: Wajkan
pragma solidity 0.8.30;

contract StreamingSubscription {


    // STRUCTS STRUCTS STRUCTS STRUCTS STRUCTS STRUCTS STRUCTS STRUCTS

    struct Artist {

        address wallet;
        string name;
        uint totalAmountEarned;

    }

    struct Subscription {
    
        bool active;
        uint subscriptionAmount;
        uint expiresAt;
    
    }


    // ENUMS ENUMS ENUMS ENUMS ENUMS ENUMS ENUMS ENUMS ENUMS ENUMS ENUMS

    enum SubscriptionStatus {
       
        Inactive,
        Active
        
    }


    // STATE VARIABLES & MAPPING STATE VARIABLES & MAPPING STATE VARIABLES & MAPPING

    address public admin;
    
    uint public subscriptionPrice = 0.02 ether;
    uint public artistCount;
    
    Artist[] public artists;

    mapping(address => Subscription) public subscriptions;
    mapping(address => SubscriptionStatus) public subscriptionStatus;


    // EVENTS EVENTS EVENTS EVENTS EVENTS EVENTS EVENTS EVENTS EVENTS EVENTS 

    event ArtistAddedToContract(address indexed artistWallet, string name);
    
    event SubscriptionCreatedByUser(address indexed subCostumer, uint amount, uint expiresAt);

    event PayoutCompletedByUser(address indexed subCostumer, uint totalAmount);

    event ArtistRecivedPayment(address indexed artistWallet, uint amount);


    // CONSTRUCTOR CONSTRUCTOR CONSTRUCTOR CONSTRUCTOR CONSTRUCTOR CONSTRUCTOR

    constructor() {

        admin = msg.sender;

    }


    // MODIFIERS MODIFIERS MODIFIERS MODIFIERS MODIFIERS MODIFIERS MODIFIERS

    modifier onlyAdmin() {

        require(msg.sender == admin, "Only admin");
        _;

    }

    modifier activeSubscriptionCheck() {

        require(subscriptions[msg.sender].active == true, "Subscription not active!");
        _;

    }


    // FUNCTIONS FUNCTIONS FUNCTIONS FUNCTIONS FUNCTIONS FUNCTIONS FUNCTIONS FUNCTIONS

    function addArtistToContract(address artistWallet, string memory artistName) public onlyAdmin {

        require(artistWallet != address(0), "Please use a valid artist wallet address!");
        require(bytes(artistName).length > 0, "Artist name must be submittet!");

        artists.push( Artist ( {

            wallet: artistWallet,
            name: artistName,
            totalAmountEarned: 0
        
        }
        ));

        artistCount++;

        emit ArtistAddedToContract(artistWallet, artistName);


    }


    function viewAllRegisteredArtists() public view returns (Artist[] memory) {

        return artists;

    }


    function subscribe() public payable {

        require(msg.value == subscriptionPrice, "Please send the correct subscription amount!");
        require(subscriptions[msg.sender].active == false, "Subscription is already Active!");

        subscriptions[msg.sender] = Subscription({

            active: true,
            subscriptionAmount: msg.value,
            expiresAt: block.timestamp + 30 days

        });

        subscriptionStatus[msg.sender] = SubscriptionStatus.Active;

        emit SubscriptionCreatedByUser(msg.sender, msg.value, block.timestamp + 30 days);

    }
    

    function payoutToArtists(uint[] memory listeningSeconds) public activeSubscriptionCheck {

        // Prevent crashing
        require(listeningSeconds.length == artistCount, "Error accured, wrong information sent from front-end");


        // Calculate total amount of listened seconds based of the sent information
        uint totalSecondsListened = 0;

        for (uint i = 0; i < listeningSeconds.length; i++) {

            totalSecondsListened = totalSecondsListened + listeningSeconds[i];

        }

        uint userSubscriptionAmount = subscriptions[msg.sender].subscriptionAmount;

        subscriptions[msg.sender].active = false;
        subscriptions[msg.sender].subscriptionAmount = 0;
        subscriptionStatus[msg.sender] = SubscriptionStatus.Inactive;

        // If a zero listening seconds recorded, money stays in the contract
        if (totalSecondsListened == 0) {

        emit PayoutCompletedByUser(msg.sender, 0);

        return;

        }

        // Pay out each artist their amount based on the formula "Total Money × Artist's Seconds / Total Seconds"

        for (uint i = 0; i < artists.length; i++) {

            uint secondsForThisArtist = listeningSeconds[i];

            uint moneyForThisArtist = (userSubscriptionAmount * secondsForThisArtist) / totalSecondsListened;

            (bool sentSuccessfully, ) = payable(artists[i].wallet).call{value: moneyForThisArtist}("");

            require(sentSuccessfully, "Payment to artist failed");

            artists[i].totalAmountEarned = artists[i].totalAmountEarned + moneyForThisArtist;

            emit ArtistRecivedPayment(artists[i].wallet, moneyForThisArtist);

        }

        emit PayoutCompletedByUser(msg.sender, userSubscriptionAmount);

    }


}

