import { determineReleasesToKeep } from '.';

describe("determineReleasesToKeep", () => {
    it ("doesn't error", () => {
        const result = determineReleasesToKeep({
            deployments: [], 
            environments: [], 
            projects: [], 
            releases: []
        }, 1); 

        expect(result).toBeDefined();
    })
}); 