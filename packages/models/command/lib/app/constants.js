import { createEnum } from '@deip/toolbox';
import CreateAccountCmd from './impl/CreateAccountCmd';
import CreateProjectCmd from './impl/CreateProjectCmd';
import UpdateProjectCmd from './impl/UpdateProjectCmd';
import DeleteProjectCmd from './impl/DeleteProjectCmd';
import JoinProjectCmd from './impl/JoinProjectCmd';
import CreateProposalCmd from './impl/CreateProposalCmd';
import UpdateProposalCmd from './impl/UpdateProposalCmd';
import DeclineProposalCmd from './impl/DeclineProposalCmd';
import UpdateAccountCmd from './impl/UpdateAccountCmd';


const APP_CMD = createEnum({
  CREATE_ACCOUNT: 1,
  UPDATE_ACCOUNT: 2,
  CREATE_PROJECT: 3,
  UPDATE_PROJECT: 4,
  DELETE_PROJECT: 5,
  JOIN_PROJECT: 6,
  CREATE_PROPOSAL: 7,
  UPDATE_PROPOSAL: 8,
  DECLINE_PROPOSAL: 9
});


const APP_PROPOSAL = createEnum({
  PROJECT_PROPOSAL: 1,
  PROJECT_UPDATE_PROPOSAL: 2,
  PROJECT_CONTENT_PROPOSAL: 3,
  PROJECT_FUNDRASE_PROPOSAL: 4,
  TEAM_UPDATE_PROPOSAL: 5,
  PROJECT_INVITE_PROPOSAL: 6,
  PROJECT_LEAVE_PROPOSAL: 7,
  ASSET_TRANSFER_PROPOSAL: 8,
  EXPRESS_LICENSE_PROPOSAL: 9,
  ASSET_EXCHANGE_PROPOSAL: 10,
  PROJECT_NDA_PROPOSAL: 11
});


const APP_CMD_INFO = {
  [APP_CMD.CREATE_ACCOUNT]: { class: CreateAccountCmd },
  [APP_CMD.UPDATE_ACCOUNT]: { class: UpdateAccountCmd },
  [APP_CMD.CREATE_PROJECT]: { class: CreateProjectCmd },
  [APP_CMD.UPDATE_PROJECT]: { class: UpdateProjectCmd },
  [APP_CMD.DELETE_PROJECT]: { class: DeleteProjectCmd },  
  [APP_CMD.JOIN_PROJECT]: { class: JoinProjectCmd },
  [APP_CMD.CREATE_PROPOSAL]: { class: CreateProposalCmd },
  [APP_CMD.UPDATE_PROPOSAL]: { class: UpdateProposalCmd },
  [APP_CMD.DECLINE_PROPOSAL]: { class: DeclineProposalCmd }
}


export {
  APP_CMD,
  APP_CMD_INFO,
  APP_PROPOSAL
}