import * as sinon from 'sinon';
import * as chai from 'chai';
// @ts-ignore
import chaiHttp = require('chai-http');

import { app } from '../app';

import SequelizeTeamModel from '../database/models/SequelizeTeamsModel';
import { allTeams, teamId } from './mocks/teams.mocks';

chai.use(chaiHttp);

const { expect } = chai;

describe('Se, ao fazer uma requisição do tipo...', () => {
  afterEach(function () {
    sinon.restore();
  })
  it('...get, retorna todos os times', async function() {
    sinon.stub(SequelizeTeamModel, 'findAll').resolves(allTeams as any);

    const { status, body } = await chai.request(app).get('/teams');

    expect(status).to.equal(200);
    expect(body).to.deep.equal(allTeams);
  });
  it('...get by id, retorna um time específico', async function() {
    sinon.stub(SequelizeTeamModel, 'findByPk').resolves(teamId as any);

    const { status, body } = await chai.request(app).get('/teams/1');

    expect(status).to.equal(200);
    expect(body).to.deep.equal(teamId);
  });

  it('...get by id, com id inválido, retorna mensagem de erro', async function() {
    sinon.stub(SequelizeTeamModel, 'findByPk').resolves(null);

    const { status, body } = await chai.request(app).get('/teams/99');

    expect(status).to.equal(404);
    expect(body.message).to.equal('Oops. Team 99 not found!');
  });
});
