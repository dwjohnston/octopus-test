import { GeneralError } from '../errors';
import { Deployment, Release } from '../fetchData';

export function findReleaseForDeployment(deployment: Deployment, releases: Array<Release>) : Release {

    const foundReleases = releases.filter((release) => release.Id === deployment.ReleaseId); 

    // Defensive programming
    if (foundReleases.length ===0) {
        throw new GeneralError("Something has gone wrong, release found for deployment ", deployment); 
    }

    if (foundReleases.length >1) {
        throw new GeneralError("Something has gone wrong, multiple releases found for deployment ", deployment); 
    }

    return foundReleases[0]; 
}