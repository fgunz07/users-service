import { afterAll, beforeAll, describe, expect, it } from "@jest/globals";
import request from "supertest";
import { Mongoose } from "mongoose";
import app from "../../../index";
import mongo from "../../../../databases/mongo.db";

const token =
  "eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiYWRtaW4iOnRydWUsImlhdCI6MTUxNjIzOTAyMiwibW9kdWxlcyI6WyJ1c2VyLmluZGV4IiwidXNlci5zdG9yZSIsInVzZXIuZmluZCIsInVzZXIudXBkYXRlIiwidXNlci5kZWxldGUiXX0.NDzu9xNoJfg-HX5fCeNBj4rxFCRbfyBghjCGpJV6_b3Ypwo5kO8d4vpHCD1HyODF-oMi3auXcNiHae4SCRqb01F0O-6dKM5yoQ5XheSL4y9tS32OuAXMF0Csmw0DhDMVApcbo1lo3iNlWo8l7qnMu72IaWxQ7jdBt4B2Uu9KB-L__Gbr5bh-e5WzLtLqB79XpyqQXBljOpk2kQbnjSat9oiJBoqbxdrooREfWoHbUHrnid0l-0jyQgYEGsUPiL5oGBCnhb7vrKb4EJPgw9TLVRDVxY_9dxyCzarPV1KKxwHacKi7DQBoLPqy1e1Gxrq7QszifZ98tkPRN52ikRJy1g";
const missingPermissionToken =
  "eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiYWRtaW4iOnRydWUsImlhdCI6MTUxNjIzOTAyMiwibW9kdWxlcyI6WyJ1c2VyLnN0b3JlIiwidXNlci5maW5kIiwidXNlci51cGRhdGUiLCJ1c2VyLmRlbGV0ZSJdfQ.bOmSGl0Wobnkn39ZFThfb8B7tvr9ozzXANSLb_oX710PwuCOYBoKLJzeipeD0woDYy9j5DjygDiATRINnaK-Dsf8H0aE_l9Gypl1sYiKV4Ouexhp8LGey233N929In5oI_-Mgkhj8ydmS01f_nbw7yzzgM4xiTL6jSS8CWDF9eQGjLu9lD3taX3WrxrQNV6S4DF3-DjSLDMlc1e5BPvPXs0K4B2uepY1Bdp8ifgnntE07K4qiOekW8YhDq78acWKppStO1o2_-hYfHyRxAQynG-GObQdByTYDGFcCKKC8OgK7nyF8ssojIHPxWbPFRYd4W-8wETf1t82eiMND0Q8GQ";

describe("users", () => {
  let db: Mongoose | any, _id: string;

  beforeAll(async () => {
    db = await mongo;
  });

  afterAll(() => {
    db.connection.close();
  });

  it("should support cors", async () => {
    const res = await request(app)
      .get("/")
      .set({ Authorization: `Bearer ${token}` });
    expect(
      res.headers.hasOwnProperty("access-control-allow-origin") &&
        res.headers.hasOwnProperty("access-control-allow-methods") &&
        res.headers.hasOwnProperty("access-control-allow-headers")
    ).toBeTruthy();
  });

  it("should return 404", async () => {
    const res = await request(app).get("/notfound");
    expect(res.status).toBe(404);
  });

  it("should return 401", async () => {
    const res = await request(app).get("/v1/users");
    expect(res.status).toBe(401);
  });

  it("should return 403", async () => {
    const res = await request(app)
      .get("/v1/users")
      .set({ Authorization: `Bearer ${missingPermissionToken}` });
    expect(res.status).toBe(403);
  });

  describe("/healthcheck", () => {
    it("should return 200", async () => {
      const res = await request(app).get("/healthcheck");
      expect(res.status).toBe(200);
    });
  });

  describe("/users", () => {
    it("should GET return 200 list all users", async () => {
      const res = await request(app)
        .get("/v1/users")
        .set({ Authorization: `Bearer ${token}` });
      expect(res.status).toBe(200);
      expect(res.body.hasOwnProperty("data")).toBeTruthy();
    });

    it("should POST return 422", async () => {
      const res = await request(app)
        .post("/v1/users")
        .set({ Authorization: `Bearer ${token}` })
        .send({
          firstName: "Juan",
          lastName: "Dela Cruz",
          phone: "+639559331401",
          email: "juan@takez.xyz",
          address: {
            country: "Philippines",
            province: "Negros Oriental",
            city: "Dumaguete City",
            postal: "6200",
          },
        });
      expect(res.status).toBe(422);
    });

    it("should POST return 201", async () => {
      const res = await request(app)
        .post("/v1/users")
        .set({ Authorization: `Bearer ${token}` })
        .send({
          firstName: "Juan",
          lastName: "Dela Cruz",
          phone: "+639559331401",
          email: "juan@takez.xyz",
          password: "admin123",
          address: {
            country: "Philippines",
            province: "Negros Oriental",
            city: "Dumaguete City",
            postal: "6200",
          },
        });
      _id = res.body._id;
      expect(res.status).toBe(201);
      expect(res.body.hasOwnProperty("_id")).toBeTruthy();
    });

  });

  describe("/users/:id", () => {
    it("should GET return 200 user", async () => {
      const res = await request(app)
        .get(`/v1/users/${_id}`)
        .set({ Authorization: `Bearer ${token}` });
      expect(res.status).toBe(200);
      expect(res.body.hasOwnProperty("_id")).toBeTruthy();
    });

    it("should PUT return 200 update users", async () => {
      const res = await request(app)
        .put(`/v1/users/${_id}`)
        .set({ Authorization: `Bearer ${token}` })
        .send({
          firstName: "Juan",
          lastName: "Dela Cruz",
          phone: "+639559331402",
          email: "juan@takez.xyz",
          password: "admin123",
          address: {
            country: "Philippines",
            province: "Negros Oriental",
            city: "Dumaguete City",
            postal: "6200",
          },
        });
      _id = res.body._id;
      expect(res.status).toBe(200);
      expect(res.body.hasOwnProperty("_id")).toBeTruthy();
    });

    it("should DELETE return 200 delete users", async () => {
      const res = await request(app)
        .delete(`/v1/users/${_id}`)
        .set({ Authorization: `Bearer ${token}` });
      expect(res.status).toBe(200);
      expect(res.body.hasOwnProperty("_id")).toBeTruthy();
    });
  });
});
