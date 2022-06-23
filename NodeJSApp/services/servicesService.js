const pool = require("../databasepg");

async function addService(name, price, timeSpan, category, picture, description) {
  const client = await pool.connect();
  let Response = {
    success: false,
    content: "Service could not be added.",
  };

  try {
    const data = await client.query(
      `SELECT * FROM services WHERE name='${name}' AND category='${category}'`
    );

    if (data.rowCount > 0) {
      Response.success = false;
      Response.content = "Service already inserted";
    } else {
      await client.query(
        `INSERT INTO services(name, price, time_span, category, picture, description) VALUES('${name}','${price}', '${timeSpan}', '${category}', '${picture}', '${description}');`
      );

      Response.success = true;
      Response.content = "Service inserted successfully.";
    }
  } catch (err) {
    Response.content += err;
  }

  client.release();
  return JSON.stringify(Response);
}


async function getServicesByCategory(category) {
  const client = await pool.connect();
  let Response = {
    success: false,
    content: "Services could not be retrieved.",
  };

  try {
    const data = await client.query(
        `SELECT name, time_span, price, picture, description,id FROM services where category='${category}'`
    );

    if (data.rowCount === 0) {
      Response.success = false;
      Response.content = "Category does not exist";

      return JSON.stringify(Response);
    }

    Response.success = true;
    Response.content = data.rows;
  } catch (err) {
    Response.content += err;
  }

  client.release();
  return JSON.stringify(Response);
}


async function getServices(){
  const client = await pool.connect();
  let Response = {
    success: false,
    content: "Services could not be retrieved.",
  };

  try {
    const data = await client.query(
        `SELECT name,category, time_span, price, picture, description,id FROM services`
    );

    Response.success = true;
    Response.content = data.rows;
  } catch (err) {
    Response.content += err;
  }

  client.release();
  return JSON.stringify(Response);
}


async function deleteServiceById(id) {
  const client = await pool.connect();
  let Response = {
    success: false,
    content: "Services could not be deleted.",
  };

  try {
    const data = await client.query(`DELETE FROM services WHERE id='${id}'`);

    if (data.rowCount === 0) {
      Response.success = false;
      Response.content = `Service with id = '${id}' does not exist.`;

      return JSON.stringify(Response);
    }

    Response.success = true;
    Response.content = `Service with id = '${id}' deleted successfully.`;
  } catch (err) {
    Response.content += err;
  }

  client.release();
  return JSON.stringify(Response);
}

module.exports = {
  addService,
  getServicesByCategory,
  deleteServiceById,
  getServices
};
