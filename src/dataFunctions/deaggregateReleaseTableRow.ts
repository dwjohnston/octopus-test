import { ReleaseTableRow } from '..';
import { Release } from '../fetchData';

export function deaggregateReleaseTableRow(row: ReleaseTableRow): {
    release: Release // I only need release, so that's all I'm doing for now
} {
    return {
        release: {
            Id: row.releaseId,
            Version: row.releaseVersion,
            Created: row.releaseCreated,
            ProjectId: row.projectId,
        }
    };
}