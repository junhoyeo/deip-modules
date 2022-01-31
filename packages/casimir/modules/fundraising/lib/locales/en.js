export default {
  module: {
    crowdfunding: {
      createForm: {
        cancel: 'Cancel',
        start: 'Start',
        titleBlock: 'Enter title of crowdfunding',
        title: 'Title',
        determineNumberOfTokens: 'Determine the number of non-fungible token units',
        units: 'Units',
        selectDates: 'Select start and end dates of crowdfunding',
        startDate: 'Start date',
        endDate: 'End date',
        selectAmounts: 'Select min and max amounts',
        selectAmount: 'Select amount',
        selectISA: 'Select amount',
        min: 'Min',
        max: 'Max',
        isaAmountPerItem: 'How much is one ISA?',
        isaQuantity: 'How many ISAs do you want to fund?',
        validations: {
          assetSmaller: '{_field_} should be smaller than {target}',
          assetGreater: '{_field_} should be greater than {target}'
        }
      },
      amountSelector: {
        amount: 'Amount',
        enterAmount: 'Enter amount'
      },
      crowdfundingProgress: {
        goal: 'Goal',
        collected: 'Collected',
        untilCompletion: 'Until completion',
        beforeStart: 'Before start',
        investors: 'Investors'
      },
      investForm: {
        title: 'Your investment',
        cancel: 'Cancel',
        invest: 'Invest',
        amount: 'Amount',
        agree: 'I have read the terms of the {0} and understand that the investment is associated with the risk of non-return of the invested funds',
        tos: 'User Agreement',
        userBalanceIsNotEnough: 'You do not have enough funds in your account',
        confirmTitle: 'Investment confirmation',
        doYouConfirm: 'Do you confirm the investment of funds from your account?'
      },
      crowdfundingWidget: {
        yourInvestment: 'Your investment',
        invest: 'Invest',
        startCrowdfunding: 'Start crowdfunding',
        noCrowdfunding: 'Crowdfunding has never started'
      }
    }
  }
};
