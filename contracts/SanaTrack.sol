// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

contract SanaTrack {
    
    event ChildRegistered(uint256 indexed childId, string name, address indexed parent);
    event LocationUpdated(uint256 indexed childId, int256 latitude, int256 longitude, string zone);
    event EmergencyTriggered(uint256 indexed childId, address indexed triggeredBy, string alertType);
    
    struct Child {
        uint256 id;
        string name;
        uint256 age;
        string emergencyContact;
        bool isActive;
        address primaryParent;
        uint256 registeredAt;
    }
    
    struct Location {
        int256 latitude;
        int256 longitude;
        string zone;
        uint256 timestamp;
        bool isEmergency;
    }
    
    mapping(uint256 => Child) public children;
    mapping(uint256 => Location[]) public locationHistory;
    mapping(uint256 => mapping(address => bool)) public authorizedParents;
    mapping(address => uint256[]) public parentToChildren;
    
    uint256 public nextChildId = 1;
    uint256 public totalChildren = 0;
    
    modifier onlyAuthorizedParent(uint256 _childId) {
        require(
            children[_childId].primaryParent == msg.sender || 
            authorizedParents[_childId][msg.sender],
            "Not authorized for this child"
        );
        _;
    }
    
    modifier childExists(uint256 _childId) {
        require(_childId > 0 && _childId < nextChildId, "Child does not exist");
        require(children[_childId].isActive, "Child is not active");
        _;
    }
    
    function registerChild(
        string memory _name,
        uint256 _age,
        string memory _emergencyContact
    ) external returns (uint256 childId) {
        require(bytes(_name).length > 0, "Name cannot be empty");
        require(_age > 0 && _age < 18, "Invalid age");
        
        childId = nextChildId++;
        
        children[childId] = Child({
            id: childId,
            name: _name,
            age: _age,
            emergencyContact: _emergencyContact,
            isActive: true,
            primaryParent: msg.sender,
            registeredAt: block.timestamp
        });
        
        authorizedParents[childId][msg.sender] = true;
        parentToChildren[msg.sender].push(childId);
        totalChildren++;
        
        emit ChildRegistered(childId, _name, msg.sender);
    }
    
    function updateLocation(
        uint256 _childId,
        int256 _latitude,
        int256 _longitude,
        string memory _zone
    ) external onlyAuthorizedParent(_childId) childExists(_childId) {
        Location memory newLocation = Location({
            latitude: _latitude,
            longitude: _longitude,
            zone: _zone,
            timestamp: block.timestamp,
            isEmergency: false
        });
        
        locationHistory[_childId].push(newLocation);
        
        emit LocationUpdated(_childId, _latitude, _longitude, _zone);
    }
    
    function getChild(uint256 _childId) external view childExists(_childId) returns (
        uint256 id,
        string memory name,
        uint256 age,
        string memory emergencyContact,
        address primaryParent,
        uint256 registeredAt
    ) {
        Child memory child = children[_childId];
        return (
            child.id,
            child.name,
            child.age,
            child.emergencyContact,
            child.primaryParent,
            child.registeredAt
        );
    }
    
    function getLatestLocation(uint256 _childId) external view childExists(_childId) returns (
        int256 latitude,
        int256 longitude,
        string memory zone,
        uint256 timestamp,
        bool isEmergency
    ) {
        require(locationHistory[_childId].length > 0, "No location history");
        
        Location memory latest = locationHistory[_childId][locationHistory[_childId].length - 1];
        return (
            latest.latitude,
            latest.longitude,
            latest.zone,
            latest.timestamp,
            latest.isEmergency
        );
    }
    
    function getChildrenForParent(address _parent) external view returns (uint256[] memory) {
        return parentToChildren[_parent];
    }
}
