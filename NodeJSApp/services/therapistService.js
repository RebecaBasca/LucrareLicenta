const pool = require("../databasepg");

async function addTherapist(name, specialty, picture, description) {
  const client = await pool.connect();
  let Response = {
    success: false,
    content: "Therapists could not be added.",
  };

  try {
    const data = await client.query(
      `SELECT * FROM therapists WHERE name='${name}'`
    );

    if (data.rowCount > 0) {
      Response.success = false;
      Response.content = "Therapist already registered.";
    } else {
      await client.query(
        `INSERT INTO therapists(name, specialty, picture, description)VALUES('${name}','${specialty}', '${picture}',  '${description}');`
      );

      Response.success = true;
      Response.content = "Therapist inserted successfully.";
    }
  } catch (err) {
    Response.content += err;
  }

  client.release();
  return JSON.stringify(Response);
}

async function getTherapists() {
  const client = await pool.connect();
  let Response = {
    success: false,
    content: "Therapists could not be retrieved",
  };

  try {
    const data = await client.query(`SELECT * FROM therapists`);

    if (data.rowCount <= 0) {
      Response.content = "No therapists registered";

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

async function deleteTherapistById(id) {
  const client = await pool.connect();
  let Response = {
    success: false,
    content: "Therapists could not be deleted",
  };

  try {
    const data = await client.query(`DELETE FROM therapists WHERE id=${id}`);

    if (data.rowCount <= 0) {
      Response.content = `Therapist with id=${id} does not exist.`;

      return JSON.stringify(Response);
    }

    Response.success = true;
    Response.content = `Therapist with id=${id} deleted successfully.`;
  } catch (err) {
    Response.content += err;
  }

  client.release();
  return JSON.stringify(Response);
}

module.exports = {
  addTherapist,
  getTherapists,
  deleteTherapistById,
};
