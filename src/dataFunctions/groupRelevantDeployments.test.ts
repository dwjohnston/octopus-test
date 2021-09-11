import { groupRelevantDeployments } from './groupRelevantDeployments';

describe("groupRelevantDeployments", () => {
    it("works", () => {
        const data = [{
            deploymentId: "D1",
            deployedAt: "",

            environmentId: "A",
            projectId: "1",

            releaseId: "R1",
            releaseVersion: "",
            releaseCreated: "",
        }, 
        {
            deploymentId: "D1",
            deployedAt: "",

            environmentId: "A",
            projectId: "1",

            releaseId: "R2",
            releaseVersion: "",
            releaseCreated: "",
        }, 
        {
            deploymentId: "D3",
            deployedAt: "",

            environmentId: "A",
            projectId: "2",

            releaseId: "R1",
            releaseVersion: "",
            releaseCreated: "",
        }]; 

        const result = groupRelevantDeployments(data); 

        expect(Object.keys(result)).toHaveLength(2); 
        
        const group1 = result["1/A"]; 

        expect(group1).toBeDefined();
        expect(group1).toHaveLength(2);

        const group2 = result["2/A"]; 
        expect(group2).toBeDefined();
        expect(group2).toHaveLength(1);
    }); 
})