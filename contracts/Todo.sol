pragma solidity >=0.4.21 <0.7.0;

contract Todo {
    uint256 countTasks = 0;
    string msg = "";
    struct Task {
    }

    mapping(uint256 => Task) public tasks;

    function getCountTasks() public view returns (uint256) {
        return countTasks;
    }

    function getGreeting() public view returns (string memory) {
    }

    function createTask(string memory _content) public {
    }
}
