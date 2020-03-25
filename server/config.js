module.exports = {
    'HOST': process.env.HOST || '0.0.0.0',
    'PORT': process.env.PORT || 4000,
    'DB'  : process.env.DB || 'sqlite:/tmp/app.db'
  };