const user =
  {
    id: 1,
    username: 'Admin',
    role: 'admin',
    email: 'admin@admin.com',
    password: '$2a$08$xi.Hxk1czAO0nZR..B393u10aED0RQ1N3PAEXQ7HxtLjKPEZBu.PW'
  }

  const login = {
    email: 'admin@admin.com',
    password: '$2a$08$xi.Hxk1czAO0nZR..B393u10aED0RQ1N3PAEXQ7HxtLjKPEZBu.PW'
  }

  const loginFalse = {
    email: 'admin@admin.com',
    password: '$B393u10aED0RQ1N3PAEXQ7HxtLjKPEZBu.PW'
  }

  export {
    user,
    login,
    loginFalse
  }
