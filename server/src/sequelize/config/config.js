module.exports = {
  [process.env.NODE_ENV || "development"]: {
    "username": "chandru",
    "password": "chandru",
    "database": "parking",
    "host": "127.0.0.1",
    "post": 5432,
    "dialect": "postgres",
    "logging": false,
    define: {
      timestamps: false
  }
  }  
}
