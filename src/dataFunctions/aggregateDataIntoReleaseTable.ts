import { AllData, ReleaseTable } from '..';
import { findReleaseForDeployment } from './findReleaseForDeployment';

export function aggreateDataIntoReleaseTable(data: AllData) : ReleaseTable {

    return data.deployments.map((deployment) => {

        const releaseForThisDeployment = findReleaseForDeployment(deployment, data.releases);

        return {
            deploymentId: deployment.Id, 
            deployedAt: deployment.DeployedAt, 
            environmentId: deployment.EnvironmentId, 
            projectId: releaseForThisDeployment.ProjectId,
            releaseId: deployment.ReleaseId, 
            releaseVersion: releaseForThisDeployment.Version, 
            releaseCreated: releaseForThisDeployment.Created
        }; 
    }); 

}