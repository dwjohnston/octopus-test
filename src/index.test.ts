import { determineReleasesToKeep } from '.';

describe("determineReleasesToKeep", () => {
  it("Test Case 1", () => {
    const result = determineReleasesToKeep({
      deployments: [{
        "Id": "Deployment-1",
        "ReleaseId": "Release-1",
        "EnvironmentId": "Environment-1",
        "DeployedAt": "2000-01-01T10:00:00"
      },],
      environments: [{
        "Id": "Environment-1",
        "Name": "Staging"
      },],
      projects: [{
        "Id": "Project-1",
        "Name": "Random Quotes"
      },],
      releases: [{
        "Id": "Release-1",
        "ProjectId": "Project-1",
        "Version": "1.0.0",
        "Created": "2000-01-01T08:00:00"
      },]
    }, 1);

    expect(result).toBeDefined();
    expect(result.releasesKept).toHaveLength(1);



    // See note in the last test re: assertions on array. 
    expect(result.releasesKept[0].release.Id).toBe("Release-1");
    expect(result.releasesKept[0].keepReason).toBe("Release-1 kept because it was the 0 most recently deployed to Environment-1");

  });

  it("Test Case 2", () => {
    const result = determineReleasesToKeep({
      deployments: [{
        "Id": "Deployment-1",
        "ReleaseId": "Release-2",
        "EnvironmentId": "Environment-1",
        "DeployedAt": "2000-01-01T10:00:00"
      },
      {
        "Id": "Deployment-2",
        "ReleaseId": "Release-1",
        "EnvironmentId": "Environment-1",
        "DeployedAt": "2000-01-01T11:00:00"
      },

      ],
      environments: [{
        "Id": "Environment-1",
        "Name": "Staging"
      },],
      projects: [{
        "Id": "Project-1",
        "Name": "Random Quotes"
      },],
      releases: [{
        "Id": "Release-1",
        "ProjectId": "Project-1",
        "Version": "1.0.0",
        "Created": "2000-01-01T08:00:00"
      },
      {
        "Id": "Release-2",
        "ProjectId": "Project-1",
        "Version": "1.0.1",
        "Created": "2000-01-01T09:00:00"
      },
      ]
    }, 1);

    expect(result).toBeDefined();
    expect(result.releasesKept).toHaveLength(1);

    expect(result.releasesKept[0].release.Id).toBe("Release-1");
    expect(result.releasesKept[0].keepReason).toBe("Release-1 kept because it was the 0 most recently deployed to Environment-1");

  });

  it("Test Case 3", () => {
    const result = determineReleasesToKeep({
      deployments: [{
        "Id": "Deployment-1",
        "ReleaseId": "Release-2",
        "EnvironmentId": "Environment-1",
        "DeployedAt": "2000-01-01T10:00:00"
      },
      {
        "Id": "Deployment-2",
        "ReleaseId": "Release-1",
        "EnvironmentId": "Environment-2",
        "DeployedAt": "2000-01-01T11:00:00"
      },

      ],
      environments: [{
        "Id": "Environment-1",
        "Name": "Staging"
      },
      {
        "Id": "Environment-2",
        "Name": "Production"
      }
      ],
      projects: [{
        "Id": "Project-1",
        "Name": "Random Quotes"
      },],
      releases: [{
        "Id": "Release-1",
        "ProjectId": "Project-1",
        "Version": "1.0.0",
        "Created": "2000-01-01T08:00:00"
      },
      {
        "Id": "Release-2",
        "ProjectId": "Project-1",
        "Version": "1.0.1",
        "Created": "2000-01-01T09:00:00"
      },
      ]
    }, 1);

    expect(result).toBeDefined();
    expect(result.releasesKept).toHaveLength(2);

    expect(result.releasesKept[1].release.Id).toBe("Release-1");
    expect(result.releasesKept[1].keepReason).toBe("Release-1 kept because it was the 0 most recently deployed to Environment-2");


    expect(result.releasesKept[0].release.Id).toBe("Release-2");
    expect(result.releasesKept[0].keepReason).toBe("Release-2 kept because it was the 0 most recently deployed to Environment-1");

  });

  it("Test Case 4 - keep 2", () => {
    const result = determineReleasesToKeep({
      deployments: [{
        "Id": "Deployment-1",
        "ReleaseId": "Release-1",
        "EnvironmentId": "Environment-1",
        "DeployedAt": "2000-01-01T10:00:00"
      },
      {
        "Id": "Deployment-2",
        "ReleaseId": "Release-2",
        "EnvironmentId": "Environment-1",
        "DeployedAt": "2000-01-01T11:00:00"
      },
      ],
      environments: [{
        "Id": "Environment-1",
        "Name": "Staging"
      },],
      projects: [{
        "Id": "Project-1",
        "Name": "Random Quotes"
      },],
      releases: [{
        "Id": "Release-1",
        "ProjectId": "Project-1",
        "Version": "1.0.0",
        "Created": "2000-01-01T08:00:00"
      },
      {
        "Id": "Release-2",
        "ProjectId": "Project-1",
        "Version": "1.0.0",
        "Created": "2000-01-01T09:00:00"
      },

      ]
    }, 2);

    expect(result).toBeDefined();
    expect(result.releasesKept).toHaveLength(2);


    //I like writing my array assertions this way, because it's simple. 
    // However, it is a little bit more brittle, assuming that the array order doesn't matter, if you were to change the implementation and the order changed, then these tests would break. 

    expect(result.releasesKept[1].release.Id).toBe("Release-1");
    expect(result.releasesKept[1].keepReason).toBe("Release-1 kept because it was the 1 most recently deployed to Environment-1");

    expect(result.releasesKept[0].release.Id).toBe("Release-2");
    expect(result.releasesKept[0].keepReason).toBe("Release-2 kept because it was the 0 most recently deployed to Environment-1");


    // Alternatively, you can write your array assertions this way 
    // But this is a lot more difficult to write, and read, IMO. 
    // Let me know if you have any suggestions on a better way to do this!
    expect(result.releasesKept).toEqual(expect.arrayContaining([
      expect.objectContaining(
        {
          release: {
            "Created": "2000-01-01T08:00:00",
            "Id": "Release-1",
            "ProjectId": "Project-1",
            "Version": "1.0.0"
          },
          keepReason: "Release-1 kept because it was the 1 most recently deployed to Environment-1"
        },
      ),
      expect.objectContaining({
        release: {
          "Id": "Release-2",
          "ProjectId": "Project-1",
          "Version": "1.0.0",
          "Created": "2000-01-01T09:00:00"
        },
        keepReason: "Release-2 kept because it was the 0 most recently deployed to Environment-1"
      })]));




  });


});