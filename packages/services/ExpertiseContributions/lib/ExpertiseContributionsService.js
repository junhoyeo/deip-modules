import { Singleton } from '@deip/toolbox';
import { ExpertiseContributionsHttp } from './ExpertiseContributionsHttp';
import deipRpc from '@deip/rpc-client';

class ExpertiseContributionsService extends Singleton {
  expertiseContributionsHttp = ExpertiseContributionsHttp.getInstance();

  getEciHistoryByResearchContentAndDiscipline(researchContentId, disciplineId) {
    return deipRpc.api.getEciHistoryByResearchContentAndDisciplineAsync(researchContentId, disciplineId);
  }

  getEciHistoryByResearchAndDiscipline(researchId, disciplineId) {
    return deipRpc.api.getEciHistoryByResearchAndDisciplineAsync(researchId, disciplineId);
  }

  getEciHistoryByAccountAndDiscipline(account, disciplineId) {
    return deipRpc.api.getEciHistoryByAccountAndDisciplineAsync(account, disciplineId);
  }

  getExpertiseContributionsByResearch(researchId) {
    return deipRpc.api.getExpertiseContributionsByResearchAsync(researchId);
  }

  getExpertiseContributionsByResearchAndDiscipline(researchId, disciplineId) {
    return deipRpc.api.getExpertiseContributionsByResearchAndDisciplineAsync(researchId, disciplineId);
  }

  getExpertiseContributionByResearchContentAndDiscipline(researchContentId, disciplineId) {
    return deipRpc.api.getExpertiseContributionByResearchContentAndDisciplineAsync(researchContentId, disciplineId);
  }

  getExpertiseContributionsByResearchContent(researchContentId) {
    return deipRpc.api.getExpertiseContributionsByResearchContentAsync(researchContentId);
  }

  getAccountExpertiseStats(username, {
    discipline,
    from,
    to,
    contribution,
    criteria
  }) {

    const filter = {
      discipline,
      from,
      to,
      contribution,
      criteria
    };

    return this.expertiseContributionsHttp.getAccountExpertiseStats(username, filter);
  }


  getAccountExpertiseHistory(username, {
    discipline,
    from,
    to,
    contribution,
    criteria
  }) {

    const filter = {
      discipline,
      from,
      to,
      contribution,
      criteria
    };

    return this.expertiseContributionsHttp.getAccountExpertiseHistory(username, filter);
  }


  getAccountsExpertiseStats({
    searchTerm,
    discipline,
    from,
    to,
    contribution,
    criteria
  }) {

    const filter = {
      searchTerm,
      discipline,
      from,
      to,
      contribution,
      criteria
    };

    return this.expertiseContributionsHttp.getAccountsExpertiseStats(filter);
  }

  getDisciplinesExpertiseStatsHistory() {
    return this.expertiseContributionsHttp.getDisciplinesExpertiseStatsHistory();
  }

  getDisciplinesExpertiseStats() {
    return this.expertiseContributionsHttp.getDisciplinesExpertiseStats();
  }

  getResearchContentsExpertiseHistory({
    discipline
  }) {

    const filter = {
      discipline
    };

    return this.expertiseContributionsHttp.getResearchContentsExpertiseHistory(filter);
  }
  
}

export {
  ExpertiseContributionsService
};
