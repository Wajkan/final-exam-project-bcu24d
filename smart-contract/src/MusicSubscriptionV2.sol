// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract MusicSubscriptionV2 {

    // STATE VARIABLES STATE VARIABLES STATE VARIABLES STATE VARIABLES
    
    address public admin;
    uint public subscriptionPrice = 0.02 ether;
    
    // Dynamic artist array
    address[] public artists;
    
    // Track active subscriptions
    mapping(address => bool) public hasActiveSubscription;
    mapping(address => uint) public subscriptionAmount;
    
    // EVENTS EVENTS EVENTS EVENTS EVENTS EVENTS EVENTS
    
    event SubscriptionCreated(address indexed subscriber, uint amount);
    event PayoutCompleted(address indexed subscriber, uint totalAmount);
    event ArtistPaid(address indexed artist, uint amount, uint percentage);
    event ArtistAdded(address indexed artist);
    event ArtistRemoved(address indexed artist);
    
    // CONSTRUCTOR CONSTRUCTOR CONSTRUCTOR CONSTRUCTOR
    
    constructor() {
        admin = msg.sender;
    }
    
    // MODIFIERS MODIFIERS MODIFIERS MODIFIERS
    
    modifier onlyAdmin() {
        require(msg.sender == admin, "Only admin can perform this action");
        _;
    }
    
    modifier hasSubscription() {
        require(hasActiveSubscription[msg.sender], "No active subscription");
        _;
    }
    
    // FUNCTIONS FUNCTIONS FUNCTIONS FUNCTIONS FUNCTIONS
    
    // Admin adds an artist
    function addArtist(address artistAddress) public onlyAdmin {
        require(artistAddress != address(0), "Invalid artist address");
        artists.push(artistAddress);
        emit ArtistAdded(artistAddress);
    }
    
    // Get all artists
    function getArtists() public view returns (address[] memory) {
        return artists;
    }
    
    // Get artist count
    function getArtistCount() public view returns (uint) {
        return artists.length;
    }
    
    // User subscribes and pays
    function subscribe() public payable {
        require(msg.value == subscriptionPrice, "Incorrect subscription amount");
        require(!hasActiveSubscription[msg.sender], "Already have active subscription");
        
        hasActiveSubscription[msg.sender] = true;
        subscriptionAmount[msg.sender] = msg.value;
        
        emit SubscriptionCreated(msg.sender, msg.value);
    }
    
    // User triggers payout after listening session
    // Percentages array must match artists array length
    function payoutToArtists(uint[] memory percentages) public hasSubscription {
        require(percentages.length == artists.length, "Percentages must match artist count");
        
        // Validate percentages add up to 100
        uint totalPercentage = 0;
        for (uint i = 0; i < percentages.length; i++) {
            totalPercentage += percentages[i];
        }
        require(totalPercentage == 100, "Percentages must add up to 100");
        
        uint amount = subscriptionAmount[msg.sender];
        require(amount > 0, "No funds to distribute");
        
        // Reset subscription before sending (reentrancy protection)
        hasActiveSubscription[msg.sender] = false;
        subscriptionAmount[msg.sender] = 0;
        
        // Send payments to artists
        for (uint i = 0; i < artists.length; i++) {
            uint payout = (amount * percentages[i]) / 100;
            payable(artists[i]).transfer(payout);
            emit ArtistPaid(artists[i], payout, percentages[i]);
        }
        
        emit PayoutCompleted(msg.sender, amount);
    }
    
    // Check contract balance
    function getContractBalance() public view returns (uint) {
        return address(this).balance;
    }
    
    // Check if user has active subscription
    function checkSubscription(address user) public view returns (bool) {
        return hasActiveSubscription[user];
    }
}
