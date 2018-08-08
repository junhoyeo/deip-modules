export default [{
        "api": "database_api",
        "method": "set_block_applied_callback",
        "params": ["cb"]
    },    
    {
        "api": "database_api",
        "method": "get_block_header",
        "params": ["blockNum"]
    },
    {
        "api": "database_api",
        "method": "get_block",
        "params": ["blockNum"]
    },
    {
        "api": "database_api",
        "method": "get_ops_in_block",
        "params": ["blockNum", "onlyVirtual"]
    },
    {
        "api": "database_api",
        "method": "get_state",
        "params": ["path"]
    },    
    {
        "api": "database_api",
        "method": "get_config"
    },
    {
        "api": "database_api",
        "method": "get_dynamic_global_properties"
    },
    {
        "api": "database_api",
        "method": "get_chain_properties"
    },
    {
        "api": "database_api",
        "method": "get_witness_schedule"
    },
    {
        "api": "database_api",
        "method": "get_hardfork_version"
    },
    {
        "api": "database_api",
        "method": "get_next_scheduled_hardfork"
    },
    {
        "api": "account_by_key_api",
        "method": "get_key_references",
        "params": ["key"]
    },
    {
        "api": "database_api",
        "method": "get_accounts",
        "params": ["names"]
    },
    {
        "api": "database_api",
        "method": "get_account_references",
        "params": ["accountId"]
    },
    {
        "api": "database_api",
        "method": "lookup_account_names",
        "params": ["accountNames"]
    },
    {
        "api": "database_api",
        "method": "lookup_accounts",
        "params": ["lowerBoundName", "limit"]
    },
    {
        "api": "database_api",
        "method": "get_account_count"
    },
    {
        "api": "database_api",
        "method": "get_account_history",
        "params": ["account", "from", "limit"]
    },
    {
        "api": "database_api",
        "method": "get_owner_history",
        "params": ["account"]
    },
    {
        "api": "database_api",
        "method": "get_recovery_request",
        "params": ["account"]
    },
    {
        "api": "database_api",
        "method": "get_withdraw_routes",
        "params": ["account", "withdrawRouteType"]
    },
    {
        "api": "database_api",
        "method": "get_account_bandwidth",
        "params": ["account", "bandwidthType"]
    },
    {
        "api": "database_api",
        "method": "get_transaction_hex",
        "params": ["trx"]
    },
    {
        "api": "database_api",
        "method": "get_transaction",
        "params": ["trxId"]
    },
    {
        "api": "database_api",
        "method": "get_required_signatures",
        "params": ["trx", "availableKeys"]
    },
    {
        "api": "database_api",
        "method": "get_potential_signatures",
        "params": ["trx"]
    },
    {
        "api": "database_api",
        "method": "verify_authority",
        "params": ["trx"]
    },
    {
        "api": "database_api",
        "method": "verify_account_authority",
        "params": ["nameOrId", "signers"]
    },
    {
        "api": "database_api",
        "method": "get_witnesses",
        "params": ["witnessIds"]
    },
    {
        "api": "database_api",
        "method": "get_witness_by_account",
        "params": ["accountName"]
    },
    {
        "api": "database_api",
        "method": "get_witnesses_by_vote",
        "params": ["from", "limit"]
    },
    {
        "api": "database_api",
        "method": "lookup_witness_accounts",
        "params": ["lowerBoundName", "limit"]
    },
    {
        "api": "database_api",
        "method": "get_witness_count"
    },
    {
        "api": "database_api",
        "method": "get_active_witnesses"
    },
    {
        "api": "database_api",
        "method": "get_reward_fund",
        "params": ["name"]
    },
    {
        "api": "login_api",
        "method": "login",
        "params": ["username", "password"]
    },
    {
        "api": "login_api",
        "method": "get_api_by_name",
        "params": ["database_api"]
    },
    {
        "api": "login_api",
        "method": "get_version"
    },
    {
        "api": "network_broadcast_api",
        "method": "broadcast_transaction",
        "params": ["trx"]
    },
    {
        "api": "network_broadcast_api",
        "method": "broadcast_transaction_with_callback",
        "params": ["confirmationCallback", "trx"]
    },
    {
        "api": "network_broadcast_api",
        "method": "broadcast_transaction_synchronous",
        "params": ["trx"]
    },
    {
        "api": "network_broadcast_api",
        "method": "broadcast_block",
        "params": ["b"]
    },
    {
        "api": "network_broadcast_api",
        "method": "set_max_block_age",
        "params": ["maxBlockAge"]
    },
    {
        "api": "database_api",
        "method": "get_research_group_by_permlink",
        "params": [
            "permlink"
        ]
    },
    {
        "api": "database_api",
        "method": "get_research_group_by_id",
        "params": [
            "id"
        ]
    },
    {
        "api": "database_api",
        "method": "get_proposals_by_research_group_id",
        "params": [
            "id"
        ]
    },
    {
        "api": "database_api",
        "method": "get_research_group_tokens_by_research_group",
        "params": [
            "research_group_id"
        ]
    },
    {
        "api": "database_api",
        "method": "get_research_group_tokens_by_account",
        "params": [
            "account"
        ]
    },
    {
        "api": "database_api",
        "method": "get_review_votes_by_review_id",
        "params": [
            "review_id"
        ]
    },
    {
        "api": "database_api",
        "method": "get_review_votes_by_voter",
        "params": [
            "account"
        ]
    },
    {
        "api": "database_api",
        "method": "get_researches_by_research_group_id",
        "params": [
            "research_group_id"
        ]
    },
    {
        "api": "database_api",
        "method": "get_research_group_invites_by_account_name",
        "params": [
            "account_name"
        ]
    },
    {
        "api": "database_api",
        "method": "get_research_group_invites_by_research_group_id",
        "params": [
            "research_group_id"
        ]
    },
    {
        "api": "database_api",
        "method": "get_schema"
    },
    {
        "api": "database_api",
        "method": "get_grants",
        "params": [
            "account_names"
        ]
    },
    {
        "api": "database_api",
        "method": "lookup_grant_owners",
        "params": [
            "lower_bound_name",
            "limit"
        ]
    },
    {
        "api": "database_api",
        "method": "get_expiring_vesting_delegations",
        "params": [
            "account",
            "from",
            "limit"
        ]
    },
    {
        "api": "database_api",
        "method": "get_all_disciplines"
    },
    {
        "api": "database_api",
        "method": "get_discipline",
        "params": [
            "id"
        ]
    },
    {
        "api": "database_api",
        "method": "get_discipline_by_name",
        "params": [
            "name"
        ]
    },
    {
        "api": "database_api",
        "method": "get_disciplines_by_parent_id",
        "params": [
            "parent_id"
        ]
    },
    {
        "api": "database_api",
        "method": "get_research_by_id",
        "params": [
            "id"
        ]
    },
    {
        "api": "database_api",
        "method": "get_research_by_permlink",
        "params": [
            "research_group_id",
            "permlink"
        ]
    },

    {
        "api": "database_api",
        "method": "get_research_by_absolute_permlink",
        "params": [
            "research_group_permlink",
            "research_permlink"
        ]
    },
    {
        "api": "database_api",
        "method": "get_researches",
        "params": [
            "from",
            "limit"
        ]
    },
    {
        "api": "database_api",
        "method": "get_research_listing",
        "params": [
            "from",
            "limit"
        ]
    },
    {
        "api": "database_api",
        "method": "get_all_researches_listing",
        "params": [
            "discipline_id",
            "limit"
        ]
    },
    {
        "api": "database_api",
        "method": "get_all_research_content",
        "params": [
            "research_id",
        ]
    },
    {
        "api": "database_api",
        "method": "get_research_content_by_id",
        "params": [
            "id"
        ]
    },
    {
        "api": "database_api",
        "method": "get_research_content_by_type",
        "params": [
            "research_id",
            "type"
        ]
    },
    {
        "api": "database_api",
        "method": "get_research_content_by_permlink",
        "params": [
            "research_id",
            "permlink"
        ]
    },
    {
        "api": "database_api",
        "method": "get_research_content_by_absolute_permlink",
        "params": [
            "research_group_permlink",
            "research_permlink",
            "research_content_permlink"
        ]
    },
    {
        "api": "database_api",
        "method": "get_expert_token",
        "params": [
            "id"
        ]
    },
    {
        "api": "database_api",
        "method": "get_expert_tokens_by_account_name",
        "params": [
            "account_name"
        ]
    },
    {
        "api": "database_api",
        "method": "get_expert_tokens_by_discipline_id",
        "params": [
            "discipline_id"
        ]
    },
    {
        "api": "database_api",
        "method": "get_proposal",
        "params": [
            "id"
        ]
    },
    {
        "api": "database_api",
        "method": "get_research_group_token_by_account_and_research_group_id",
        "params": [
            "account",
            "research_group_id"
        ]
    },
    {
        "api": "database_api",
        "method": "get_research_token_sale_by_id",
        "params": [
            "research_token_sale_id"
        ]
    },
    {
        "api": "database_api",
        "method": "get_research_token_sale_by_research_id",
        "params": [
            "research_id"
        ]
    },
    {
        "api": "database_api",
        "method": "check_research_token_sale_existence_by_research_id",
        "params": [
            "research_id"
        ]
    },
    {
        "api": "database_api",
        "method": "get_research_token_sale_by_end_time",
        "params": [
            "end_time"
        ]
    },
    {
        "api": "database_api",
        "method": "get_research_token_sale_contribution_by_id",
        "params": [
            "research_token_sale_contribution_id"
        ]
    },
    {
        "api": "database_api",
        "method": "get_research_token_sale_contributions_by_research_token_sale_id",
        "params": [
            "research_token_sale_id"
        ]
    },
    {
        "api": "database_api",
        "method": "get_research_token_sale_contribution_by_account_name_and_research_token_sale_id",
        "params": [
            "owner",
            "research_token_sale_id"
        ]
    },
    {
        "api": "database_api",
        "method": "get_disciplines_by_research",
        "params": [
            "research_id"
        ]
    },
    {
        "api": "database_api",
        "method": "get_research_group_invite_by_id",
        "params": [
            "research_group_invite_id"
        ]
    },
    {
        "api": "database_api",
        "method": "get_research_group_invite_by_account_name_and_research_group_id",
        "params": [
            "account_name",
            "research_group_id"
        ]
    },
    {
        "api": "database_api",
        "method": "check_research_existence_by_permlink",
        "params": [
            "permlink"
        ]
    },
    {
        "api": "database_api",
        "method": "check_research_group_existence_by_permlink",
        "params": [
            "permlink"
        ]
    },
    {
        "api": "database_api",
        "method": "get_total_votes_by_research",
        "params": [
            "research_id"
        ]
    },
    {
        "api": "database_api",
        "method": "get_total_votes_by_research_and_discipline",
        "params": [
            "research_id",
            "discipline_id"
        ]
    },
    {
        "api": "database_api",
        "method": "get_all_accounts",
        "params": []
    },
    {
        "api": "database_api",
        "method": "get_reviews_by_content",
        "params": [
            "research_content_id"
        ]
    },
    {
        "api": "database_api",
        "method": "get_reviews_by_research",
        "params": [
            "research_id"
        ]
    },
    {
        "api": "database_api",
        "method": "get_research_token_by_id",
        "params": [
            "research_token_id"
        ]
    },
    {
        "api": "database_api",
        "method": "get_research_tokens_by_account_name",
        "params": [
            "account_name"
        ]
    },
    {
        "api": "database_api",
        "method": "get_research_tokens_by_research_id",
        "params": [
            "research_id"
        ]
    },
    {
        "api": "database_api",
        "method": "get_research_token_by_account_name_and_research_id",
        "params": [
            "account_name",
            "research_id"
        ]
    }
];