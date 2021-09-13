import { ReleaseTable, ReleaseTableRow } from '..';
import { GeneralError } from '../errors';
import { findUniqueProjectEnvironmentPairs, ProjectEnvironmentPair } from './findUniqueProjectEnvironmentPairs';

export type GroupedRelevantDeployments = Record<string, Array<ReleaseTableRow>>;

export function createProjectEnvironmentPairKey (data: ReleaseTableRow) : string {
    // This implementation of a 'unique pair key' is possibly not guaranteed non-unique, if `/` was a valid project/environment id character. 
    // You would possibly want to defensively check that projectId, environmentId didn't contain any bad characters here
    // But you could have done that earlier anyway.
    return `${data.projectId}/${data.environmentId}`; 
}

export function groupRelevantDeployments(releaseTable: ReleaseTable) : GroupedRelevantDeployments {

    const projectEnvironmentPairs = findUniqueProjectEnvironmentPairs(releaseTable);

    // Just initialise the inital object with projectEnvironmentPairs: empty arrays
    const initialObject = projectEnvironmentPairs.reduce((acc, cur) => {
        return {
            ...acc, 
            [cur.pairKey]: []
        }; 
    }, {} as GroupedRelevantDeployments); 


    // Populate the arrays with relevant deployments
    return releaseTable.reduce((acc, cur) => {

        const pairKey = createProjectEnvironmentPairKey(cur); 

        const existingRow = acc[pairKey]; 

        if (!existingRow) {
            throw new GeneralError("Something has gone wrong, found a deployment that doesn't belong to project/environment pair", cur);
        }

        return {
            ...acc, 
            [pairKey]: [...existingRow, cur]
        }
    }, initialObject); 
}