import {  ReleaseTable } from '..';
import { createProjectEnvironmentPairKey } from './groupRelevantDeployments';


export type ProjectEnvironmentPair = {
    projectId: string; 
    environmentId: string; 
    pairKey: string; 
};

export function findUniqueProjectEnvironmentPairs (releaseTable: ReleaseTable) : Array<ProjectEnvironmentPair> {

    const uniquenessSet = new Set(); 

    return releaseTable.map((v) => ({
        projectId: v.projectId, 
        environmentId: v.environmentId, 
        pairKey: createProjectEnvironmentPairKey(v),
    })).filter((v) => {
        if (uniquenessSet.has(v.pairKey)) {
            return false; 
        }
        else {
            uniquenessSet.add(v.pairKey); 
            return true; 
        }
    }) 
}