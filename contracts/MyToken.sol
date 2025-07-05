// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

/**
 * @title MyToken
 * @dev Simple ERC20 Token example, with mintable and burnable functionality.
 */
contract MyToken is ERC20, Ownable {
    /**
     * @dev Sets the values for {name} and {symbol}, mints initial supply to deployer.
     * @param initialSupply The initial token supply in whole units (not considering decimals).
     */
    constructor(uint256 initialSupply) ERC20("MyToken", "MTK") {
        // Mint the initial supply to the contract deployer, scaled by decimals()
        _mint(_msgSender(), initialSupply * (10 ** decimals()));
    }

    /** @dev Allows the owner to mint new tokens. */
    function mint(address to, uint256 amount) external onlyOwner {
        _mint(to, amount * (10 ** decimals()));
    }

    /** @dev Allows token holders to burn their own tokens. */
    function burn(uint256 amount) external {
        _burn(_msgSender(), amount * (10 ** decimals()));
    }
}
