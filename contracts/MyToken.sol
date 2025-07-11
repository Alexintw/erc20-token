// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

/**
 * @title MyToken
 * @dev ERC20 Token with fixed initial supply, mintable by owner, burnable by holders.
 */
contract MyToken is ERC20, Ownable {
    uint256 public constant INITIAL_SUPPLY = 1000 * 10 ** 18;

    constructor() ERC20("MyToken", "MTK") {
        // Ownable’s constructor auto-sets owner = msg.sender
        _mint(_msgSender(), INITIAL_SUPPLY);
    }

    function mint(address to, uint256 amount) external onlyOwner {
        _mint(to, amount * 10 ** decimals());
    }

    function burn(uint256 amount) external {
        _burn(_msgSender(), amount * 10 ** decimals());
    }
}
