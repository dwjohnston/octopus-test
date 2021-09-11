import deployments from "./data/Deployments.json"; 
import environments from "./data/environments.json"; 
import projects from "./data/projects.json"; 
import releases from "./data/releases.json"; 


export type Deployment = {
    Id: string; 
    ReleaseId: string; 
    EnvironmentId: string; 
    DeployedAt: Date; 
}

export type Environment = {
    Id: string; 
    Name: string; 
}

export type Project = {
    Id: string; 
    Name: string; 
}

export type Release = {
    Id: string; 
    ProjectId: string; 
    Version: string; 
    Created: Date; 
}


// Asynchronous isn't necessary here, but in a 'real world' scenario, we would likely be getting the data via an API call or something 
export async function fetchDeployments() : Promise<Array<Deployment>> {

    // Ordinarily, we would/could validate that that the data really is the right shape, and throw an error if it isn't. 
    // For the purposes of this exercise, we'll just assume that the data is in the correct shape.
    return deployments.map(v => {
        return {
            ...v, 
            DeployedAt: new Date(v.DeployedAt)
        }
    }) as Array<Deployment>; 
}

export async function fetchEnvironments() : Promise<Array<Environment>> {
    return environments as Array<Environment>; 
}

export async function fetchProjects() : Promise<Array<Project>> {
    return projects as Array<Project>; 
}

export async function fetchReleases() : Promise<Array<Release>> {

    return releases.map((v) => {
        return {
            ...v, 
            Created: new Date(v.Created)
        }; 
    }) as Array<Release>; 
}