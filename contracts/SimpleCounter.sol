pragma solidity ^0.5.0;

contract SimpleCounter {

  uint public count = 0;

  event AddCount(uint _count);

  function addCount() public {
      count++;
      emit AddCount(count);
  }

}