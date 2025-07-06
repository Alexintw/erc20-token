// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "@openzeppelin/contracts/utils/Context.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import "@openzeppelin/contracts/token/ERC20/extensions/ERC20Permit.sol";
import "@openzeppelin/contracts/metatx/ERC2771Context.sol";

contract MyToken is ERC20, ERC20Permit, ERC2771Context, Ownable {
    /// @dev fee in basis points (50 = 0.5%)
    uint256 public burnRate = 50;

    constructor(uint256 initialSupply, address forwarder)
        ERC20("MyToken", "MTK")
        ERC20Permit("MyToken")
        ERC2771Context(forwarder)
        Ownable(msg.sender)
    {
        _mint(_msgSender(), initialSupply);
    }

    // —— Meta-tx plumbing ——
    function _msgSender()
        internal view
        override(Context, ERC2771Context)
        returns (address)
    {
        return ERC2771Context._msgSender();
    }

    function _msgData()
        internal view
        override(Context, ERC2771Context)
        returns (bytes calldata)
    {
        return ERC2771Context._msgData();
    }

    function _contextSuffixLength()
        internal view
        override(Context, ERC2771Context)
        returns (uint256)
    {
        return ERC2771Context._contextSuffixLength();
    }

    // —— Burn on every transfer hook ——
    // Override the virtual _update hook from ERC20
    function _update(
        address from,
        address to,
        uint256 amount
    ) internal override(ERC20) {
        if (from != address(0) && to != address(0) && burnRate > 0) {
            uint256 fee = (amount * burnRate) / 10_000;
            uint256 sendAmt = amount - fee;
            super._update(from, to, sendAmt);
            if (fee > 0) {
                super._update(from, address(0), fee);
            }
        } else {
            super._update(from, to, amount);
        }
    }

    /// @notice let the owner tweak the rate (max 5%)
    function setBurnRate(uint256 newRate) external onlyOwner {
        require(newRate <= 500, "burnRate <= 5%");
        burnRate = newRate;
    }
}
