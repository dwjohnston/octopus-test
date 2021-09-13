import { aggreateDataIntoReleaseTable } from './dataFunctions/aggregateDataIntoReleaseTable';
import { deaggregateReleaseTableRow } from './dataFunctions/deaggregateReleaseTableRow';
import { findReleaseForDeployment } from './dataFunctions/findReleaseForDeployment';
import { findUniqueProjectEnvironmentPairs } from './dataFunctions/findUniqueProjectEnvironmentPairs';
import { GroupedRelevantDeployments, groupRelevantDeployments } from './dataFunctions/groupRelevantDeployments';
import { GeneralError } from './errors';
import { Deployment, Environment, Project, Release } from './fetchData';


export type AbridgedReleaseData = {
    releasesKept: Array<{
        release: Release;
        keepReason: string;
    }>;

    
}

//TODO can you think of a better name for this type
export type AllData = {
    deployments: Array<Deployment>;
    environments: Array<Environment>;
    projects: Array<Project>;
    releases: Array<Release>;
}

export type ReleaseTableRow = {
    deploymentId: string;
    deployedAt: string;

    environmentId: string;
    projectId: string;

    releaseId: string;
    releaseVersion: string;
    releaseCreated: string;
}

export type ReleaseTable = Array<ReleaseTableRow>;



type RawFilteredData = {
    data: ReleaseTableRow;
    keepReason: string;
}




export function filterGroupedTableRowsByKeepNumber(groupedData: GroupedRelevantDeployments, keepNumber: number): Array<RawFilteredData> {
    const values = Object.values(groupedData);

    const filteredValues = values.map((group) => {
        const sortedGroup = group.sort((a, b) => {

            const aDate = new Date(a.deployedAt);
            const bDate = new Date(b.deployedAt);

            return (aDate < bDate) ? 1 : -1;
        });

        const slicedData = sortedGroup.slice(0, keepNumber)

        const slicedDataWithKeepReasons = slicedData.map((v, i) => ({
            data: v,
            keepReason: `${v.releaseId} kept because it was the ${i} most recently deployed to ${v.environmentId}`
        }));

        return slicedDataWithKeepReasons;

    });

    const allFilteredValues = filteredValues.flatMap(v => v);
    return allFilteredValues;

}

export function formatRawFilteredData(rawFilteredData: Array<RawFilteredData>): AbridgedReleaseData {

    return {
        releasesKept: rawFilteredData.map((v) => {
            return {
                release: deaggregateReleaseTableRow(v.data).release,
                keepReason: v.keepReason
            }
        })
    }
}

export function determineReleasesToKeep(data: AllData, keepCount: number): AbridgedReleaseData {




    // If any errors are encountered at any point the whole thing is going to abort
    // I'm not programming any recovery stuff. 
    // (eg. errors like a project being referred to not existing). 
    // Also, I haven't written tests for such scenarios - I'm assuming that the data is perfect

    // I think my strategy is going to be aggregate everything into to a single table first.
    const releaseTable = aggreateDataIntoReleaseTable(data);
    const groupedTableRows = groupRelevantDeployments(releaseTable);

    const rawFilteredData = filterGroupedTableRowsByKeepNumber(groupedTableRows, keepCount);

    const formattedData = formatRawFilteredData(rawFilteredData);
    return formattedData;
}