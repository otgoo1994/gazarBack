const jwt = require('jwt-then');
const sql = require('../config/query');
const db = require('../config/sql');
const url = require('url');

Date.prototype.addHours = function(h){
  this.setHours(this.getHours()+h);
  return this;
}

exports.getProperties = async (req, res) => {
  const { city, intent, usage, detail } = req.body;
  db.query(sql.selectProperties(intent, usage, city, detail, 1), async (err, normal) => {
    if(err) {
      res.status(500).json({
        msg: 'Something went wrong'
      });
    }
    db.query(sql.selectProperties(intent, usage, city, detail, 2), async (err, special) => {
      if(err) {
        res.status(500).json({
          msg: 'Something went wrong'
        });
      }
      db.query(sql.selectProperties(intent, usage, city, detail, 3), async (err, vip) => {
        if(err) {
          res.status(500).json({
            msg: 'Something went wrong'
          });
        }
        res.json({ normal, special, vip });
      });
    });
  });
}

exports.getCity = async (req, res) => {
  db.query(sql.getCity(), async (err, city) => {
    if(err) {
      res.status(500).json({
        msg: 'Something went wrong'
      });
    }
    db.query(sql.getDistricts(), async (err, district) => {
      if(err) {
        res.status(500).json({
          msg: 'Something went wrong'
        });
      }
      res.json({ city, district });
    });
  });
}

exports.getSettings = async (req, res) => {

  db.query(sql.getTypes(), async (err, types) => {
    if(err) {
      res.status(500).json({
        msg: 'Something went wrong'
      });
    }
    db.query(sql.getSizes(), async (err, sizes) => {
        if(err) {
            res.status(500).json({
              msg: 'Something went wrong'
            });
        }
        db.query(sql.getUsage(), async (err, usages) => {
            if(err) {
                res.status(500).json({
                  msg: 'Something went wrong'
                });
            }
            db.query(sql.getIntents(), async (err, intents) => {
                if(err) {
                    res.status(500).json({
                      msg: 'Something went wrong'
                    });
                }
                res.json({ types, sizes, usages, intents });
            })
        });
    })
  });
}

async function photoUpload(file, propertyId) {
  const type = file.mimetype.split("/")[1];
  const time = Date.now();
  const iname = time + "." + type;
  file.mv("./public/images/property/" + iname, function (err, result) {
    if(err) {
      throw err;
    }
    db.query(`INSERT INTO images SET ?`, { imagename: iname, propertyId}, async err => {
      if(err) {
        throw err;
      }
    });
  });
}

function timeOut(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

getMaxId = async function ( date ) {
  return new Promise(function(resolve, reject){
    db.query(`SELECT propertyId from property WHERE id = (SELECT MAX(id) from property WHERE propertyId LIKE '${date}%')`, async (err, id) => {
      if(err) {
        throw err;
      }

      if(id.length > 0) {
        return resolve(id[0].propertyId);
      } else {
        return resolve(0);
      }
    })
  })
}

exports.uploadPropertyImages = async ( req, res ) => {
  try {
    //GZR220311-32

    const payload = await jwt.verify(req.headers.authorization.split(" ")[1], 'HS256');
    const photo = req.files.images;
    let { data } = req.body;
    data = JSON.parse(data);

    var date = new Date();
    date = date.getFullYear().toString().substr(-2) + ((date.getMonth() > 8) ? (date.getMonth() + 1) : ('0' + (date.getMonth() + 1))) + ((date.getDate() > 9) ? date.getDate() : ('0' + date.getDate()))
    date = 'GZR' + date + '-';
    
    db.query(sql.checkPropertyCheckIdx(date), async (err, getIdx) => {
      if(err) {
        throw err;
      }
      if(getIdx.length > 0) {
        let idx = await getMaxId(date);
        
        idx = Number(idx.split('-')[1]);
        idx++;
        date += idx;
      } else {
        date += '1'
      }

      for (let i = 0; i < photo.length; i++) {
        await timeOut(100)
        await photoUpload(photo[i], date);
      }

      let property = data.main
      property.city = data.location.city;
      property.district = data.location.district;
      property.propertyId = date;
      property.member = payload.id;

      console.table(property);

      const newUrl = new URL(property.video);
      if (newUrl.searchParams.get("v")) {
        property.video = newUrl.searchParams.get("v");
      }

      

      db.query(sql.addProperty(), property, async err => { 
        if(err) {
          throw err;
        }
        
        var polys = [];

        data.location.polygons.forEach(element => {
          polys.push([element.lat, element.lng, date])
        });
        db.query(sql.addPolygons(), [polys], async err => {
          if(err) {
            throw err;
          }
          res.json({
            result: 200
          });
        });
      });
      
    });
  } catch (error) {
    console.log(error);
  }  
}

exports.lastProperties = async (req, res) => {
  db.query(sql.selectLastProperties(), async (err, properties) => {
    if(err) {
      throw err;
    }
    res.json({
      result: 200,
      properties
    });
  });
}

exports.singleProperty = async (req, res) => {
  const { propertyId } = req.body;
  db.query(sql.selectSingleProperty(propertyId), async (err, property) => {
    if(err) {
      throw err;
    }
    if(property.length > 0) {
      db.query(sql.selectPolygons(propertyId), async (err, polygons) => {
        if(err) {
          throw err;
        }
        db.query(sql.selectPhotos(propertyId), async (err, carousel) => {
          if(err) {
            throw err;
          }
          res.json({
            result: 200,
            property: {
              info: property[0],
              polygons,
              carousel
            }
          });
        });
      })
    } else {
      res.json({
        result: 502
      });
    }
  });
}

exports.getSimilarProperty = async (req, res) => {
  const { propertyId } = req.body;
  db.query(sql.selectSimilarProperty(propertyId), async (err, similar) => {
    if(err) {
      throw err;
    }
    res.json({
      result: 200,
      similar
    });
  });
}

exports.getRecommended = async (req, res) => {
  db.query(sql.selectRecommended(), async (err, recommended) => {
    if(err) {
      throw err;
    }
    res.json({
      result: 200,
      recommended
    });
  });
}

