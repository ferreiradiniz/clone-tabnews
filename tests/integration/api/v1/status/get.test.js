let response;

beforeAll(async () => {
  response = await fetch("http://localhost:3000/api/v1/status");
  responseBody = await response.json();
});

describe("GET to /api/v1/status", () => {
  it("should return STATUS 200", async () => {
    expect(response.status).toBe(200);
  });

  it("should return UPDATE AT", async () => {
    expect(responseBody.update_at).toBeDefined();
    const parseUpdateAt = new Date(responseBody.update_at).toISOString();
    expect(responseBody.update_at).toEqual(parseUpdateAt);
  });

  it("should return VERSION DATA BASE", async () => {
    expect(responseBody.dependences.database.version).toEqual("18.2");
  });

  it("should return MAX CONNECTIONS igual a 100", async () => {
    expect(responseBody.dependences.database.max_connections).toEqual(100);
  });

  it("should return OPENED CONNECTIONS igual 1", async () => {
    expect(responseBody.dependences.database.opened_connections).toEqual(1);
  });
});
