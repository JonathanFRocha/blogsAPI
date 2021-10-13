class Jwt {
  constructor() {
    this.config = {
      expiresIn: '1d',
      algorithm: 'HS256',
    }; 
  }
}

module.exports = new Jwt();