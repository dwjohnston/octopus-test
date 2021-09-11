import { ReleaseTable } from '..';
import { findUniqueProjectEnvironmentPairs } from './findUniqueProjectEnvironmentPairs';

describe("findUniqueProjectEnvironmentPairs", () => {

    it("works - dedupes", () => {
        const data: ReleaseTable = [
            {
                deploymentId: "",
                deployedAt: "",

                environmentId: "A",
                projectId: "1",

                releaseId: "",
                releaseVersion: "",
                releaseCreated: "",
            },
            {
                deploymentId: "",
                deployedAt: "",

                environmentId: "A",
                projectId: "1",

                releaseId: "",
                releaseVersion: "",
                releaseCreated: "",
            }]

        const result = findUniqueProjectEnvironmentPairs(data);

        expect(result).toHaveLength(1);
    });


    it("works - keeps unique", () => {
        const data: ReleaseTable = [
            {
                deploymentId: "",
                deployedAt: "",

                environmentId: "A",
                projectId: "1",

                releaseId: "",
                releaseVersion: "",
                releaseCreated: "",
            },
            {
                deploymentId: "",
                deployedAt: "",

                environmentId: "A",
                projectId: "2",

                releaseId: "",
                releaseVersion: "",
                releaseCreated: "",
            },
            {
                deploymentId: "",
                deployedAt: "",

                environmentId: "A",
                projectId: "1",

                releaseId: "",
                releaseVersion: "",
                releaseCreated: "",
            }]

        const result = findUniqueProjectEnvironmentPairs(data);

        expect(result).toHaveLength(2);
    });


});