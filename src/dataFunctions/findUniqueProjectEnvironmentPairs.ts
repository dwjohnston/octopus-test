import {  ReleaseTable } from '..';


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

        // Potentially dangerous if two different combinations happened to share the same key (eg. if `/` was a valid project/environment id character). 
        pairKey: `${v.projectId}/${v.environmentId}`
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