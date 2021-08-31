const CHAIN_TYPES = {
  "InputProposalBatch": "Vec<InputProposalBatchItem>",
  "InputProposalBatchItem": {
    "account": "DeipAccountId",
    "call": "Call"
  },
  "DeipAccountId": {
    "_enum": {
      "Native": "AccountId",
      "Org": "OrgName"
    }
  },
  "InputKeySource": "KeySource",
  "KeySource": {
    "signatories": "Vec<AccountId>",
    "threshold": "u16"
  },
  "OrgOf": "Org",
  "Org": {
    "members_key": "AccountId",
    "members_key_source": "KeySource",
    "name": "OrgName",
    "org_key": "AccountId"
  },
  "OrgName": "H160",
  "DomainId": "H160",
  "ReviewId": "H160",
  "AccountInfo": {
    "nonce": "Index",
    "consumers": "RefCount",
    "providers": "RefCount",
    "data": "AccountData"
  },
  "ProposalBatchItemOf": {
    "account": "AccountId",
    "call": "Call"
  },
  "ProposalBatch": "Vec<ProposalBatchItemOf>",
  "ProposalId": "H160",
  "PendingProposalsMap": "BTreeMap<ProposalId,AccountId>",
  "DeipProposal": {
    "id": "ProposalId",
    "batch": "Vec<ProposalBatchItemOf>",
    "decisions": "BTreeMap<AccountId,ProposalMemberDecision>",
    "state": "ProposalState",
    "author": "AccountId"
  },
  "ProposalState": {
    "_enum": [
      "Pending",
      "Rejected",
      "Done",
      "Failed(DispatchError)"
    ]
  },
  "ProposalMemberDecision": {
    "_enum": [
      "Pending",
      "Approve",
      "Reject"
    ]
  },
  "Domain": "H160",
  "ProjectId": "H160",
  "ProjectContentId": "H160",
  "NdaAccessRequestId": "H160",
  "NdaId": "H160",
  "InvestmentId": "H160",
  "NdaOf": "Nda",
  "NdaAccessRequestOf": "NdaAccessRequest",
  "ProjectOf": "Project",
  "ProjectContentOf": "ProjectContent",
  "SimpleCrowdfundingOf": "SimpleCrowdfunding",
  "InvestmentOf": "Investment",
  "Nda": {
    "contract_creator": "AccountId",
    "external_id": "NdaId",
    "end_date": "Moment",
    "start_date": "Option<Moment>",
    "contract_hash": "Hash",
    "parties": "Vec<AccountId>",
    "projects": "Vec<ProjectId>"
  },
  "NdaAccessRequestStatus": {
    "_enum": [
      "Pending",
      "Fulfilled",
      "Rejected"
    ]
  },
  "NdaAccessRequest": {
    "external_id": "NdaAccessRequestId",
    "nda_external_id": "NdaId",
    "requester": "AccountId",
    "encrypted_payload_hash": "Hash",
    "encrypted_payload_iv": "Text",
    "status": "NdaAccessRequestStatus",
    "grantor": "Option<AccountId>",
    "encrypted_payload_encryption_key": "Option<Text>",
    "proof_of_encrypted_payload_encryption_key": "Option<Text>"
  },
  "Project": {
    "is_private": "bool",
    "external_id": "ProjectId",
    "team": "AccountId",
    "description": "Hash",
    "domains": "Vec<Domain>"
  },
  "ProjectContentType": {
    "_enum": [
      "Announcement",
      "FinalResult",
      "MilestoneArticle",
      "MilestoneBook",
      "MilestoneChapter",
      "MilestoneCode",
      "MilestoneConferencePaper",
      "MilestoneCoverPage",
      "MilestoneData",
      "MilestoneExperimentFindings",
      "MilestoneMethod",
      "MilestoneNegativeResults",
      "MilestonePatent",
      "MilestonePoster",
      "MilestonePreprint",
      "MilestonePresentation",
      "MilestoneRawData",
      "MilestoneResearchProposal",
      "MilestoneTechnicalReport",
      "MilestoneThesis"
    ]
  },
  "ProjectContent": {
    "external_id": "ProjectContentId",
    "project_external_id": "ProjectId",
    "team_id": "AccountId",
    "content_type": "ProjectContentType",
    "description": "Hash",
    "content": "Hash",
    "authors": "Vec<AccountId>",
    "references": "Option<Vec<ProjectContentId>>"
  },
  "Weight": "u64",
  "DispatchClass": {
    "_enum": [
      "Normal",
      "Operational",
      "Mandatory"
    ]
  },
  "Pays": {
    "_enum": [
      "Yes",
      "No"
    ]
  },
  "DispatchInfo": {
    "weight": "Weight",
    "class": "DispatchClass",
    "pays_fee": "Pays"
  },
  "SimpleCrowdfundingStatus": {
    "_enum": [
      "Active",
      "Finished",
      "Expired",
      "Inactive"
    ]
  },
  "TokenSaleAssetPair": {
    "id": "AssetId",
    "amount": "AssetsBalanceOf"
  },
  "SimpleCrowdfunding": {
    "external_id": "InvestmentId",
    "project_id": "ProjectId",
    "start_time": "Moment",
    "end_time": "Moment",
    "status": "SimpleCrowdfundingStatus",
    "asset_id": "AssetId",
    "total_amount": "AssetsBalanceOf",
    "soft_cap": "AssetsBalanceOf",
    "hard_cap": "AssetsBalanceOf",
    "shares": "Vec<TokenSaleAssetPair>"
  },
  "Investment": {
    "sale_id": "InvestmentId",
    "owner": "AccountId",
    "amount": "AssetsBalanceOf",
    "time": "Moment"
  },
  "FundingModel": {
    "_enum": {
      "SimpleCrowdfunding": {
        "start_time": "Moment",
        "end_time": "Moment",
        "asset_id": "AssetId",
        "soft_cap": "AssetsBalanceOf",
        "hard_cap": "AssetsBalanceOf"
      }
    }
  },
  "AssetsBalanceOf": "u64",
  "DeipAssetBalanceOf": "AssetsBalanceOf",
  "AssetBalance": {
    "balance": "AssetsBalanceOf",
    "is_frozen": "bool",
    "is_zombie": "bool"
  },
  "AssetMetadata": {
    "deposit": "Balance",
    "name": "Vec<u8>",
    "symbol": "Vec<u8>",
    "decimals": "u8"
  },
  "AssetDetails": {
    "owner": "AccountId",
    "issuer": "AccountId",
    "admin": "AccountId",
    "freezer": "AccountId",
    "supply": "AssetsBalanceOf",
    "deposit": "Balance",
    "max_zombies": "u32",
    "min_balance": "AssetsBalanceOf",
    "zombies": "u32",
    "accounts": "u32",
    "is_frozen": "bool"
  },
  "DeipProjectIdOf": "H160",
  "AssetId": {
    "0": "H160"
  },
  "AssetsAssetIdOf": "AssetId",
  "DeipAssetIdOf": "AssetId",
  "Compact<AssetId>": {
    "0": "AssetId"
  },
  "DeipReviewVoteId": "H160",
  "DeipReviewVote": {
    "dao": "AccountId",
    "review_id": "ReviewId",
    "domain_id": "DomainId",
    "voting_time": "Moment"
  },
  "DeipReviewVoteOf": "DeipReviewVote",
  "Review": {
    "external_id": "ReviewId",
    "author": "AccountId",
    "content": "Hash",
    "domains": "Vec<DomainId>",
    "assessment_model": "u32",
    "weight": "Vec<u8>",
    "project_content_external_id": "ProjectContentId"
  },
  "ReviewOf": "Review"
};


export default CHAIN_TYPES;
