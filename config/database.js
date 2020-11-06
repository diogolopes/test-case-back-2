if (process.env.LOCALHOM) {
  module.exports = {
    host: process.env.DB_HOST || 'bprspsql25h',
    database: 'legaldirf',
    dialect: 'mssql',
    dialectOptions: {
      authentication: {
        type: 'ntlm',
        options: {
          domain: "brasilprev",
          userName: process.env.DB_USER || 'f2416',
          password: process.env.DB_PASSWORD
        },
      },
      options: {
        //instanceName: process.env.DB_NAME,
      }
    },
  }

} else {
  module.exports = {
    username: process.env.DB_USER || 'USER_LEGAL_JOBS',
    password: process.env.DB_PASSWORD || 'USER_LEGAL_JOBS',
    database: process.env.DB_NAME || 'legal',
    host: process.env.DB_HOST || 'bprspsql25d',
    dialect: 'mssql',
    //logging: false,
    pool: {
      max: 50,
      min: 0,
      acquire: 30000,
      idle: 10000
    },
    options: {
      encrypt: true,
      enableArithAbort: true
    }
  }
}