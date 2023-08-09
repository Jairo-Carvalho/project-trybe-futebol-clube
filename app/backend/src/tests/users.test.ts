import * as sinon from "sinon";
import * as chai from "chai";
import * as bcrypt from 'bcryptjs';
// @ts-ignore
import chaiHttp = require("chai-http");
import * as jwt from 'jsonwebtoken';

import { app } from "../app";

import UsersModel from "../database/models/SequelizeUsersModel";
import { payloadEmail } from "../utils/JWTToken";
import { login, loginFalse, user } from "./mocks/users.mock";

chai.use(chaiHttp);

const { expect } = chai;

describe("Users e Login...", () => {
  const token = 'beared batatinha';
  afterEach(function () {
    sinon.restore();
  });
  it("...post, faz login", async function () {
    sinon.stub(bcrypt, 'compareSync').returns(true);
    sinon.stub(UsersModel, "findOne").resolves(user as any);

    const { status, body } = await chai.request(app).post("/login").send(login);

    expect(status).to.equal(200);
    expect(body).to.haveOwnProperty('token');
  });
  it("...post, não é possível fazer login com password inválido", async function () {
    sinon.stub(bcrypt, 'compareSync').returns(false);
    sinon.stub(UsersModel, "findOne").resolves(user as any);

    const { status, body } = await chai.request(app).post("/login").send(loginFalse);

    expect(status).to.equal(401);
    expect(body).to.be.deep.equal({ message: 'Invalid email or password' });
  });
  it("...post, usuário invalido", async function () {
    sinon.stub(UsersModel, "findOne").resolves(null as any);

    const { status, body } = await chai.request(app).post("/login").send(login);

    expect(status).to.equal(401);
    expect(body).to.be.deep.equal({ message: 'Invalid email or password' });
  });
  it("...get, devolve o role do usuário", async function () {
    const payload: payloadEmail = {
      email: "email@example.com",
      role: "admin"
    }
    sinon.stub(jwt, "verify").callsFake(() => payload);

    const { status, body } = await chai.request(app).get("/login/role").set('authorization', token);

    expect(status).to.equal(200);
    expect(body).to.haveOwnProperty('role');
  });
});

