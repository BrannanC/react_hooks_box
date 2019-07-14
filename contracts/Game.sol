pragma solidity ^0.5.0;

contract Game {

  bool gameActive;
  address payable public player1;
  address payable public player2;
  uint public player1_score = 0;
  uint public player2_score = 0;

  event SetPlayerOne(address _addr);
  event SetPlayerTwo(address _addr);

  function setPlayerOne() public {
      require(player1 == address(0), "Player already set");
      player1 = msg.sender;
      emit SetPlayerOne(msg.sender);
  }

  function setPlayerTwo() public {
      require(player2 == address(0), "Player already set");
      player2 = msg.sender;
      emit SetPlayerTwo(msg.sender);
  }

  function scorePlayer1() public {
      player1_score++;
  }

  function scorePlayer2() public {
      player2_score++;
  }

}