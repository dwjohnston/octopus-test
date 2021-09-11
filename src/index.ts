import { Deployment, Environment, Project, Release } from './fetchData';


export type AbridgedReleaseData = {
    keepCount: number; 
    releasesKept: Array<{
        release: Release; 
        keepReason: string;
    }>; 
}

export function determineReleasesToKeep(data: {
    deployments: Array<Deployment>; 
    environments: Array<Environment>; 
    projects: Array<Project>; 
    releases: Array<Release>;
}, keepCount: number) : AbridgedReleaseData {

    return {
        keepCount, 
        releasesKept: []
    }; 
}