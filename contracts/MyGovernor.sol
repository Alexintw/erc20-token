// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "@openzeppelin/contracts/governance/Governor.sol";
import "@openzeppelin/contracts/governance/extensions/GovernorSettings.sol";
import "@openzeppelin/contracts/governance/extensions/GovernorCountingSimple.sol";
import "@openzeppelin/contracts/governance/extensions/GovernorVotes.sol";
import "@openzeppelin/contracts/governance/extensions/GovernorVotesQuorumFraction.sol";

contract MyGovernor is
    Governor,
    GovernorSettings,
    GovernorCountingSimple,
    GovernorVotes,
    GovernorVotesQuorumFraction
{
    constructor(IVotes token)
        Governor("MyGovernor")
        GovernorSettings(
            /* votingDelay */        1,
            /* votingPeriod */    45818,  // ~1 week
            /* proposalThreshold */ 0
        )
        GovernorVotes(token)
        GovernorVotesQuorumFraction(4)    // 4%
    {}

    // —— Required overrides —— 

    function votingDelay()
        public view override(Governor, GovernorSettings)
        returns (uint256)
    {
        return super.votingDelay();
    }

    function votingPeriod()
        public view override(Governor, GovernorSettings)
        returns (uint256)
    {
        return super.votingPeriod();
    }

    function proposalThreshold()
        public view override(Governor, GovernorSettings)
        returns (uint256)
    {
        return super.proposalThreshold();
    }

    // We do *not* need any other overrides when not using the TimelockControl extension
}
