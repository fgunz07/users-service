import { afterAll, beforeAll, describe, expect, it } from "@jest/globals";
import request from "supertest";
import { Mongoose } from "mongoose";
import app from "../../../index";
import mongo from "../../../../databases/mongo.db";

describe("users", () => {
  let db: Mongoose | any, _id: string;

  beforeAll(async () => {
    db = await mongo;
  });

  afterAll(() => {
    db.connection.close();
  });

  it("should support cors", async () => {
    const res = await request(app).get("/");
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

  describe("/healthcheck", () => {
    it("should return 200", async () => {
      const res = await request(app).get("/healthcheck");
      expect(res.status).toBe(200);
    });
  });

  describe("/users", () => {
    it("should GET return 200 list all users", async () => {
      const res = await request(app).get("/v1/users");
      expect(res.status).toBe(200);
      expect(res.body.hasOwnProperty("data")).toBeTruthy();
    });
    it("should POST return 422", async () => {
      const res = await request(app)
        .post("/v1/users")
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
      const res = await request(app).get(`/v1/users/${_id}`);
      expect(res.status).toBe(200);
      expect(res.body.hasOwnProperty("_id")).toBeTruthy();
    });
    it("should PUT return 200 update users", async () => {
      const res = await request(app)
        .put(`/v1/users/${_id}`)
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
      const res = await request(app).delete(`/v1/users/${_id}`);
      expect(res.status).toBe(200);
      expect(res.body.hasOwnProperty("_id")).toBeTruthy();
    });
  });
});
