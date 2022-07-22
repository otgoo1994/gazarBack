const sha256 = require("js-sha256");


Date.prototype.addHours = function(h){
  this.setHours(this.getHours()+h);
  return this;
}

const query = {
    /**
     * @param {string} username 
     * @param {string} password 
     * @returns дамжуулсан параметрийг ашиглаад query текст үүсгээд буцаах болно.
     */
    login: (phone, password) => {
        return `SELECT id, name, image, phone, email from member WHERE phone = '${phone}' AND password = '${sha256(password + process.env.SALT)}' AND verified = 1`
    },
    getTypes: () => {
      return `SELECT id, typename from types`
    },
    getSizes: () => {
      return `SELECT id, size, sizeTitle from sizes`
    },
    getUsage: () => {
      return `SELECT id, usename from formuse`;
    },
    getDistricts: () => {
      return `SELECT id, district, cityId from district`
    },
    getCity: () => {
      return `SELECT id, cityname from city`
    },
    getIntents: () => {
      return `SELECT id, intent from intent`
    },
    checkPropertyCheckIdx: (value) => {
      return `SELECT propertyId from property WHERE propertyId LIKE '${value}%'`
    },
    addProperty: () => {
      return 'INSERT INTO property SET ?'
    },
    addPolygons: () => {
      return `INSERT INTO coord (lat, lng, propertyId) VALUES ?`
    },
    selectLastProperties: () => {
      return `SELECT i.imagename, COUNT(i.imagename) as totalImage, m.image, m.name, m.email, p.title, p.usage, p.description, p.price, p.special, p.city, p.district, p.created_at, p.propertyId, p.discount 
              FROM images as i INNER JOIN property as p on i.propertyId = p.propertyId 
              INNER JOIN member as m on p.member = m.id WHERE p.approved = 1 GROUP BY p.propertyId ORDER BY p.created_at DESC LIMIT 16`;
    },
    selectSingleProperty: (propertyId) => {
      return `SELECT (SELECT usename from formuse WHERE p.usage LIMIT 1) as usename, (SELECT intent from intent WHERE p.intent LIMIT 1) as intent, e.name as empName, e.phone as empPhone, e.image as empPhoto, m.phone, m.email, m.image, m.name, p.watched, p.video, p.title, p.description, p.price, p.special, p.city, p.district, DATE_FORMAT(p.created_at, "%Y-%m-%d") as created_at, p.propertyId, p.discount 
              FROM employee as e INNER JOIN property as p on e.id = p.approvedEmp 
              INNER JOIN member as m on p.member = m.id WHERE p.approved = 1 AND p.propertyId = '${propertyId}' LIMIT 1;`
    },
    selectPolygons: (propertyId) => {
      return `SELECT lat, lng FROM coord WHERE propertyId = '${propertyId}'`
    },
    selectPhotos: (propertyId) => {
      return `SELECT imagename FROM images WHERE propertyId = '${propertyId}'`
    },
    selectSimilarProperty: (propertyId) => {
      return `SELECT i.imagename, COUNT(i.imagename) as totalImage, m.image, m.name, p.title, p.description, p.price, p.special, p.city, p.district, p.created_at, p.propertyId, p.discount 
              FROM images as i INNER JOIN property as p on i.propertyId = p.propertyId 
              INNER JOIN member as m on p.member = m.id WHERE p.approved = 1 AND  p.types = (SELECT types from property WHERE propertyId = '${propertyId}') AND p.usage = (SELECT property.usage from property WHERE propertyId = '${propertyId}') GROUP BY p.propertyId ORDER BY p.created_at DESC LIMIT 10`
    },
    selectRecommended: () => {
      return `SELECT i.imagename, COUNT(i.imagename) as totalImage, m.image, m.name, p.title, p.description, p.price, p.special, p.city, p.district, p.created_at, p.propertyId, p.discount 
              FROM images as i INNER JOIN property as p on i.propertyId = p.propertyId 
              INNER JOIN member as m on p.member = m.id WHERE p.approved = 1 GROUP BY p.propertyId ORDER BY RAND() LIMIT 16`
    },
    selectProperties: (intent, usage, city, detail, special) => {
      if(!intent) { intent = ''; }
      if(!usage) { usage = ''; }
      if(!city) { city = ''; }
      if(!detail) { detail = ''; }
      let query = `SELECT i.imagename, COUNT(i.imagename) as totalImage, m.image, m.name, p.title, p.description, p.price, p.special, p.city, p.district, p.created_at, p.propertyId, p.discount 
      FROM images as i INNER JOIN property as p on i.propertyId = p.propertyId 
      INNER JOIN member as m on p.member = m.id WHERE special = ${special} AND  description LIKE '%${detail}%'`;
      if(intent != '') {
        query += ` AND p.intent = '${intent}'`;
      }

      if(usage != '') {
        query += ` AND p.usage = '${usage}'`;
      }

      if(city != '') {
        query += ` AND p.city = '${city}'`;
      }
      
      query += ' GROUP BY p.propertyId'
      return query;
    },
    selectAgentInfo: (email) => {
      return `SELECT id, image, name, phone, viewed from member WHERE email = '${email}' AND verified = 1`;
    },
    updateAgentViewed: (id) => {
      return `UPDATE member SET viewed = viewed + 1 WHERE id = ${id}`;
    },
    getAgentProperties: (id) => {
      return `SELECT title, description, COUNT(i.imagename) as totalImage, i.imagename, price, special, city, district, created_at, p.propertyId, types, sizes, p.usage, discount, intent, watched, lizing 
              from property as p inner join images as i on p.propertyId = i.propertyId WHERE member = ${id} AND p.approved = 1 GROUP BY p.propertyId ORDER BY p.created_at DESC`;
    },
    addMember: () => {
      return `INSERT INTO member SET ?`;
    },
    checkMemberExisted: (key) => {
      return `SELECT id FROM member WHERE phone = '${key}' OR email = '${key}'`;
    },
    verifyMember: (key) => {
      return `UPDATE member SET verified = 1 WHERE phone = '${key}'`;
    }
}

module.exports = query;