// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract MusicSubscription {

    // STATE VARIABLES STATE VARIABLES STATE VARIABLES STATE VARIABLES
    
    address public admin;
    uint public subscriptionPrice = 0.02 ether;
    
    // Hardcoded artist wallets - Replace with your MetaMask addresses
    address public artist1 = 0x0000000000000000000000000000000000000001;
    address public artist2 = 0x0000000000000000000000000000000000000002;
    address public artist3 = 0x0000000000000000000000000000000000000003;
    
    
    // Track active subscriptions
    mapping(address => bool) public hasActiveSubscription;
    mapping(address => uint) public subscriptionAmount;
    
    // EVENTS EVENTS EVENTS EVENTS EVENTS EVENTS EVENTS
    
    event SubscriptionCreated(address indexed subscriber, uint amount);
    event PayoutCompleted(address indexed subscriber, uint totalAmount);
    event ArtistPaid(address indexed artist, uint amount, uint percentage);
    
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
    
    // User subscribes and pays
    function subscribe() public payable {
        require(msg.value == subscriptionPrice, "Incorrect subscription amount");
        require(!hasActiveSubscription[msg.sender], "Already have active subscription");
        
        hasActiveSubscription[msg.sender] = true;
        subscriptionAmount[msg.sender] = msg.value;
        
        emit SubscriptionCreated(msg.sender, msg.value);
    }
    
    // User triggers payout after listening session
    function payoutToArtists(uint percentage1, uint percentage2, uint percentage3) public hasSubscription {
        
        // Validate percentages add up to 100
        require(percentage1 + percentage2 + percentage3 == 100, "Percentages must add up to 100");
        
        uint amount = subscriptionAmount[msg.sender];
        require(amount > 0, "No funds to distribute");
        
        // Calculate individual payouts
        uint payout1 = (amount * percentage1) / 100;
        uint payout2 = (amount * percentage2) / 100;
        uint payout3 = (amount * percentage3) / 100;
        
        // Reset subscription before sending (reentrancy protection)
        hasActiveSubscription[msg.sender] = false;
        subscriptionAmount[msg.sender] = 0;
        
        // Send payments to artists
        payable(artist1).transfer(payout1);
        payable(artist2).transfer(payout2);
        payable(artist3).transfer(payout3);
        
        // Emit events
        emit ArtistPaid(artist1, payout1, percentage1);
        emit ArtistPaid(artist2, payout2, percentage2);
        emit ArtistPaid(artist3, payout3, percentage3);
        emit PayoutCompleted(msg.sender, amount);
    }
    
    // Admin can update artist addresses if needed
    function setArtists(address _artist1, address _artist2, address _artist3) public onlyAdmin {
        require(_artist1 != address(0) && _artist2 != address(0) && _artist3 != address(0), 
                "Invalid artist addresses");
        
        artist1 = _artist1;
        artist2 = _artist2;
        artist3 = _artist3;
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
