import * as sinon from "sinon";
import * as chai from "chai";
// @ts-ignore
import chaiHttp = require("chai-http");
import * as jwt from 'jsonwebtoken';

import { app } from "../app";

import SequelizeMatchesModel from "../database/models/SequelizeMatchesModel";
import {
  matches,
  matchesInProgress,
  matchesFinished,
} from "./mocks/matches.mocks";
import { payloadEmail } from "../utils/JWTToken";

chai.use(chaiHttp);

const { expect } = chai;

describe("Se, ao fazer uma requisição do tipo...", () => {
  const token = 'beared batatinha';
  afterEach(function () {
    sinon.restore();
  });
  it("...get, retorna todas as partidas", async function () {
    sinon.stub(SequelizeMatchesModel, "findAll").resolves(matches as any);

    const { status, body } = await chai.request(app).get("/matches");

    expect(status).to.equal(200);
    expect(body).to.deep.equal(matches);
  });
  it("...get, não retorna todos as partidas", async function () {
    sinon.stub(SequelizeMatchesModel, "findAll").resolves(null as any);

    const { status, body } = await chai.request(app).get("/matches");

    // expect(status).to.equal(404);
    expect(body).to.deep.equal({ message: 'Not Found' });
  });
  it("...get, retorna partidas em andamento", async function () {
    sinon
      .stub(SequelizeMatchesModel, "findAll")
      .resolves(matchesInProgress as any);

    const { status, body } = await chai
      .request(app)
      .get("/matches?inProgress=true");

    expect(status).to.equal(200);
    expect(body).to.deep.equal(matchesInProgress);
  });
  it("...get, retorna partidas finalizadas", async function () {
    sinon
      .stub(SequelizeMatchesModel, "findAll")
      .resolves(matchesFinished as any);

    const { status, body } = await chai
      .request(app)
      .get("/matches?inProgress=false");

    expect(status).to.equal(200);
    expect(body).to.deep.equal(matchesFinished);
  });
  it("...patch, é possível finalizar uma partida no BD", async function () {
    const payload: payloadEmail = {
      email: "email@example.com",
      role: "admin"
    }
    sinon.stub(SequelizeMatchesModel, "update").resolves([1]);
    sinon.stub(jwt, "verify").callsFake(() => payload);

    const { status, body } = await chai
      .request(app)
      .patch("/matches/1/finish")
      .set("Authorization", token);

    expect(status).to.equal(200);
    expect(body).to.deep.equal({ message: "Finished" });
  });
  it("...patch, não é possível finalizar uma partida no BD", async function () {
    const payload: payloadEmail = {
      email: "email@example.com",
      role: "admin"
    }
    sinon.stub(SequelizeMatchesModel, "update").resolves([0]);
    sinon.stub(jwt, "verify").callsFake(() => payload);

    const { status, body } = await chai
      .request(app)
      .patch("/matches/99/finish")
      .set("Authorization", token);

    // expect(status).to.equal(404);
    expect(body).to.deep.equal({ message: "Not Found" });
  });
  it("...patch, é possível atualizar uma partida no BD", async function () {
    const payload: payloadEmail = {
      email: "email@example.com",
      role: "admin"
    }
    // const bodyRequest = {
    //   "homeTeamGoals": 3,
    //   "awayTeamGoals": 1
    // }
    sinon.stub(SequelizeMatchesModel, "update").resolves([1]);
    sinon.stub(jwt, "verify").callsFake(() => payload);

    const { status, body } = await chai
      .request(app)
      .patch("/matches/1")
      .set("Authorization", token);

    expect(status).to.equal(200);
    expect(body).to.deep.equal({ message: 'Placar Atualizado' });
  });
});
