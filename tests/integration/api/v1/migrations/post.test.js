let response;

beforeAll(async () => {
  cleanDataBase;
  response = await fetch("http://localhost:3000/api/v1/migrations", {
    method: "POST",
  });
});

async function cleanDataBase() {
  await database.query("drop schema public cascade; create schema public;");
}

describe("GET to /api/v1/migrations", () => {
  it("should return STATUS 201", async () => {
    expect(response.status).toBe(201);
    responseBody = await response.json();
    expect(Array.isArray(responseBody)).toBe(true);
    expect(responseBody.length).toBeGreaterThan(0);

    response1 = await fetch("http://localhost:3000/api/v1/migrations", {
      method: "POST",
    });

    expect(response1.status).toBe(200);
    const responseBody1 = await response1.json();
    expect(Array.isArray(responseBody1)).toBe(true);
    expect(responseBody1.length).toBe(0);
  });
});
