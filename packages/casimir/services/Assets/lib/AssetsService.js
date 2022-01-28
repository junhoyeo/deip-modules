import { genRipemd160Hash, createInstanceGetter } from '@deip/toolbox';
import { proxydi } from '@deip/proxydi';
import { JsonDataMsg } from '@deip/message-models';
import {
  AcceptProposalCmd,
  CreateProposalCmd,
  TransferAssetCmd,
  CreateFungibleTokenCmd,
  CreateNonFungibleTokenCmd,
  IssueFungibleTokenCmd,
  IssueNonFungibleTokenCmd
} from '@deip/command-models';
import { APP_PROPOSAL } from '@deip/constants';
import { AccessService } from '@deip/access-service';
import { ChainService } from '@deip/chain-service';
import { AssetsHttp } from './AssetsHttp';

const proposalDefaultLifetime = new Date(new Date().getTime() + 86400000 * 365 * 3).getTime();

export class AssetsService {
  proxydi = proxydi;

  accessService = AccessService.getInstance();

  assetsHttp = AssetsHttp.getInstance();

  transferAssets({ privKey, username }, {
    from,
    to,
    asset
  }, proposalInfo) {
    const { isProposal, isProposalApproved, proposalLifetime } = {
      isProposal: false,
      isProposalApproved: true,
      proposalLifetime: proposalDefaultLifetime,
      ...proposalInfo
    };

    const env = this.proxydi.get('env');

    return ChainService.getInstanceAsync(env)
      .then((chainService) => {
        const chainNodeClient = chainService.getChainNodeClient();
        const chainTxBuilder = chainService.getChainTxBuilder();
        return chainTxBuilder.begin()
          .then((txBuilder) => {
            const transferAssetCmd = new TransferAssetCmd({
              from,
              to,
              asset
            });

            if (isProposal) {
              const createProposalCmd = new CreateProposalCmd({
                type: APP_PROPOSAL.ASSET_TRANSFER_PROPOSAL,
                creator: username,
                expirationTime: proposalLifetime || proposalDefaultLifetime,
                proposedCmds: [transferAssetCmd]
              });

              txBuilder.addCmd(createProposalCmd);

              if (isProposalApproved) {
                const updateProposalId = createProposalCmd.getProtocolEntityId();
                const updateProposalCmd = new AcceptProposalCmd({
                  entityId: updateProposalId,
                  account: username
                });

                txBuilder.addCmd(updateProposalCmd);
              }
            } else {
              txBuilder.addCmd(transferAssetCmd);
            }
            return txBuilder.end();
          })
          .then((packedTx) => packedTx.signAsync(privKey, chainNodeClient))
          .then((packedTx) => {
            const msg = new JsonDataMsg(packedTx.getPayload());
            return this.assetsHttp.transferAssets(msg);
          });
      });
  }

  createFungibleToken({ privKey }, {
    symbol,
    issuer,
    precision,
    maxSupply,
    description,
    holders
  }) {
    const env = this.proxydi.get('env');

    return ChainService.getInstanceAsync(env)
      .then((chainService) => {
        const chainNodeClient = chainService.getChainNodeClient();
        const chainTxBuilder = chainService.getChainTxBuilder();

        return chainTxBuilder.begin()
          .then((txBuilder) => {
            const entityId = genRipemd160Hash(symbol);
            const createFungibleTokenCmd = new CreateFungibleTokenCmd({
              entityId,
              issuer,
              symbol,
              precision,
              maxSupply,
              description
            });
            txBuilder.addCmd(createFungibleTokenCmd);
            const tokenId = createFungibleTokenCmd.getProtocolEntityId();

            if (holders && holders.length) {
              for (let i = 0; i < holders.length; i++) {
                const { account, asset } = holders[i];
                const issueFungibleTokenCmd = new IssueFungibleTokenCmd({
                  asset: {
                    ...asset,
                    id: tokenId
                  },
                  issuer,
                  recipient: account
                });
                txBuilder.addCmd(issueFungibleTokenCmd);
              }
            }

            return txBuilder.end();
          })
          .then((packedTx) => packedTx.signAsync(privKey, chainNodeClient))
          .then((packedTx) => {
            const msg = new JsonDataMsg(packedTx.getPayload());
            return this.assetsHttp.createFungibleToken(msg);
          });
      });
  }

  createNonFungibleToken({ privKey }, {
    symbol,
    issuer,
    precision,
    maxSupply,
    description,
    projectTokenSettings,
    holders
  }) {
    const env = this.proxydi.get('env');

    return ChainService.getInstanceAsync(env)
      .then((chainService) => {
        const chainNodeClient = chainService.getChainNodeClient();
        const chainTxBuilder = chainService.getChainTxBuilder();

        return chainTxBuilder.begin()
          .then((txBuilder) => {
            const entityId = genRipemd160Hash(symbol);
            const createNonFungibleTokenCmd = new CreateNonFungibleTokenCmd({
              entityId,
              issuer,
              symbol,
              precision,
              maxSupply,
              description,
              projectTokenSettings
            });
            txBuilder.addCmd(createNonFungibleTokenCmd);
            const tokenId = createNonFungibleTokenCmd.getProtocolEntityId();

            if (holders && holders.length) {
              for (let i = 0; i < holders.length; i++) {
                const { account, asset } = holders[i];
                const issueNonFungibleTokenCmd = new IssueNonFungibleTokenCmd({
                  asset: {
                    ...asset,
                    id: tokenId
                  },
                  issuer,
                  recipient: account
                });
                txBuilder.addCmd(issueNonFungibleTokenCmd);
              }
            }

            return txBuilder.end();
          })
          .then((packedTx) => packedTx.signAsync(privKey, chainNodeClient))
          .then((packedTx) => {
            const msg = new JsonDataMsg(packedTx.getPayload());
            return this.assetsHttp.createNonFungibleToken(msg);
          });
      });
  }

  issueFungibleToken({ privKey }, {
    issuer,
    asset,
    recipient
  }) {
    const env = this.proxydi.get('env');

    return ChainService.getInstanceAsync(env)
      .then((chainService) => {
        const chainNodeClient = chainService.getChainNodeClient();
        const chainTxBuilder = chainService.getChainTxBuilder();

        return chainTxBuilder.begin()
          .then((txBuilder) => {
            const issueFungibleTokenCmd = new IssueFungibleTokenCmd({
              issuer,
              asset,
              recipient
            });
            txBuilder.addCmd(issueFungibleTokenCmd);
          })
          .then((packedTx) => packedTx.signAsync(privKey, chainNodeClient))
          .then((packedTx) => {
            const msg = new JsonDataMsg(packedTx.getPayload());
            return this.assetsHttp.issueFungibleToken(msg);
          });
      });
  }

  issueNonFungibleToken({ privKey }, {
    issuer,
    asset,
    recipient
  }) {
    const env = this.proxydi.get('env');

    return ChainService.getInstanceAsync(env)
      .then((chainService) => {
        const chainNodeClient = chainService.getChainNodeClient();
        const chainTxBuilder = chainService.getChainTxBuilder();

        return chainTxBuilder.begin()
          .then((txBuilder) => {
            const issueNonFungibleTokenCmd = new IssueNonFungibleTokenCmd({
              issuer,
              asset,
              recipient
            });
            txBuilder.addCmd(issueNonFungibleTokenCmd);
          })
          .then((packedTx) => packedTx.signAsync(privKey, chainNodeClient))
          .then((packedTx) => {
            const msg = new JsonDataMsg(packedTx.getPayload());
            return this.assetsHttp.issueNonFungibleToken(msg);
          });
      });
  }

  getAccountDepositHistory(account, status) {
    return this.assetsHttp.getAccountDepositHistory(account, status);
  }

  getAssetById(assetId) {
    return this.assetsHttp.getAssetById(assetId);
  }

  getAssetBySymbol(symbol) {
    return this.assetsHttp.getAssetBySymbol(symbol);
  }

  getAssetsByType(type) {
    return this.assetsHttp.getAssetsByType(type);
  }

  getAssetsByIssuer(issuer) {
    return this.assetsHttp.getAssetsByIssuer(issuer);
  }

  lookupAssets(lowerBoundSymbol, limit) {
    return this.assetsHttp.lookupAssets(lowerBoundSymbol, limit);
  }

  getAccountAssetBalance(owner, symbol) {
    return this.assetsHttp.getAccountAssetBalance(owner, symbol);
  }

  getAccountAssetsBalancesByOwner(owner) {
    return this.assetsHttp.getAccountAssetsBalancesByOwner(owner);
  }

  getAccountsAssetBalancesByAsset(symbol) {
    return this.assetsHttp.getAccountsAssetBalancesByAsset(symbol);
  }

  createAssetsExchangeProposal({ privKey, username }, {
    party1,
    party2,
    asset1,
    asset2
  }, proposalInfo) {
    const { isProposalApproved, proposalLifetime } = {
      isProposalApproved: true,
      proposalLifetime: proposalDefaultLifetime,
      ...proposalInfo
    };

    const env = this.proxydi.get('env');

    return ChainService.getInstanceAsync(env)
      .then((chainService) => {
        const chainNodeClient = chainService.getChainNodeClient();
        const chainTxBuilder = chainService.getChainTxBuilder();
        return chainTxBuilder.begin()
          .then((txBuilder) => {
            const transferAssetCmd1 = new TransferAssetCmd({
              from: party1,
              to: party2,
              asset: asset1
            });

            const transferAssetCmd2 = new TransferAssetCmd({
              from: party2,
              to: party1,
              asset: asset2
            });

            const createProposalCmd = new CreateProposalCmd({
              type: APP_PROPOSAL.ASSET_EXCHANGE_PROPOSAL,
              creator: username,
              expirationTime: proposalLifetime || proposalDefaultLifetime,
              proposedCmds: [transferAssetCmd1, transferAssetCmd2]
            });

            txBuilder.addCmd(createProposalCmd);

            const updateProposalId = createProposalCmd.getProtocolEntityId();

            if (isProposalApproved) {
              const updateProposalCmd = new AcceptProposalCmd({
                entityId: updateProposalId,
                account: username
              });

              txBuilder.addCmd(updateProposalCmd);
            }
            return txBuilder.end();
          })
          .then((packedTx) => packedTx.signAsync(privKey, chainNodeClient))
          .then((packedTx) => {
            const msg = new JsonDataMsg(packedTx.getPayload());
            return this.assetsHttp.createAssetsExchangeProposal(msg);
          });
      });
  }

  depositAssets(payload) {
    const {
      initiator: { privKey, username },
      redirectUrl,
      amount,
      currency,
      account,
      timestamp
    } = payload;

    const depositData = {
      amount,
      currency,
      account,
      timestamp
    };

    const env = this.proxydi.get('env');
    return ChainService.getInstanceAsync(env)
      .then((chainService) => {
        const seedAccount = chainService.generateChainSeedAccount({
          username,
          privateKey: privKey
        });
        const sigSource = JSON.stringify(depositData, Object.keys(depositData).sort());
        const sigHex = seedAccount.signString(sigSource);
        return this.assetsHttp.depositAssets(
          {
            ...depositData,
            sigSource,
            sigHex,
            redirectUrl
          }
        );
      });
  }

  /** @type {() => AssetsService} */
  static getInstance = createInstanceGetter(AssetsService);
}
