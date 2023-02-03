const db = mysql.createConnection(
    {
      host: 'localhost',
      // MySQL username,
      user: 'root',
      // TODO: Add MySQL password here
      password: 'Beach m@yor t3ar',
      database: 'company_db'
    },
    console.log(`Connected to the company_db database.`)
  );

  module.exports =