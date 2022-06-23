const pool = require("../databasepg");

const available_hours = ["8:00", "9:00", "10:00", "11:00", "12:00", "13:00"];

async function getAvailableHours(therapistName, date) {
  const client = await pool.connect();
  let Response = {
    success: false,
    content: "Could not retrieve available hours.",
  };

  try {
    const query =
      "SELECT * FROM bookings WHERE therapist_name = $1 and date = $2";
    const values = [therapistName, date];
    const data = await client.query(query, values);

    if (data.rowCount <= 0) {
      Response.success = true;
      // If no booking found, the entire schedule is free - set all available hours.
      Response.content = available_hours;
    } else {
      let free_schedule = available_hours;

      data.rows.forEach((element) => {
        value = element["time"];
        free_schedule = free_schedule.filter(function (item) {
          return item !== value;
        });
      });

      Response.success = true;

      if (free_schedule.length === 0) {
        Response.content = "No available hours.";
      } else {
        Response.content = free_schedule;
      }
    }
  } catch (error) {
    Response.content += error;
  }

  client.release();
  return JSON.stringify(Response);
}

async function addBooking(
  client_name,
  client_email,
  date,
  time,
  therapist_name,
  service,
  for_child,
  child_name
) {
  const client = await pool.connect();
  let Response = {
    success: false,
    content: "Could not register booking.",
  };

  try {
    let query = "SELECT * FROM accounts WHERE email = $1";
    let values = [client_email];
    const data = await client.query(query, values);

    if (data.rowCount <= 0) {
      Response.content = `No account with the email address '${client_email}' registered.`;

      return JSON.stringify(Response);
    }

    get_therapist_id = `SELECT id from therapists where name='${therapist_name}'`
    const data2 = await client.query(get_therapist_id)
    therapist_id = data2.rows[0]["id"]

    get_client_id = `SELECT id from accounts where name='${client_name}'`
    const data3 = await client.query(get_client_id)
    client_id = data3.rows[0]["id"]

    query = `INSERT INTO bookings(client_name, client_email, date, time, therapist_name, service, for_child, child_name, therapist_id, client_id) 
  VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10);`;
    values = [
      client_name,
      client_email,
      date,
      time,
      therapist_name,
      service,
      for_child,
      child_name,
      therapist_id,
      client_id,
    ];

    await client.query(query, values);

    Response.success = true;
    Response.content = "Booking registered successfully.";
  } catch (error) {
    Response.content += error;
  }

  client.release();
  return JSON.stringify(Response);
}

async function getFutureBookings(id) {
  const client = await pool.connect();
  let Response = {
    success: false,
    content: "Could not retrieve future bookings.",
  };

  let today = new Date();
  let dd = String(today.getDate()).padStart(2, "0");
  let mm = String(today.getMonth() + 1).padStart(2, "0");
  let yyyy = today.getFullYear();
  today = yyyy + "-" + mm + "-" + dd;

  try {
    let query = "SELECT acc_type FROM accounts where id = $1";
    let values = [id];
    const accountTypeData = await client.query(query, values);

    if (accountTypeData.rowCount <= 0) {
      Response.success = false;
      Response.content =
        "No user present with this id.";

      return JSON.stringify(Response);
    }

    const account_type =
      accountTypeData.rows[0]["acc_type"] === "client" ? "therapist" : "client";

    query = `SELECT service, date, time, ${account_type}_name  FROM bookings where client_id = $1 and date > $2`;
    values = [id, today];
    const data = await client.query(query, values);

    if (data.rowCount <= 0) {
      Response.success = true;
      Response.content = "There are no future bookings";

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

async function getPreviousBookings(id) {
  const client = await pool.connect();
  let Response = {
    success: false,
    content: "Previous bookings could not be retrieved.",
  };

  let today = new Date();
  let dd = String(today.getDate()).padStart(2, "0");
  let mm = String(today.getMonth() + 1).padStart(2, "0");
  let yyyy = today.getFullYear();
  today = yyyy + "-" + mm + "-" + dd;

  try {
    const query = "SELECT acc_type FROM accounts where id = $1";
    const values = [id];
    const accountTypeData = await client.query(query, values);

    console.log(accountTypeData)

    if (accountTypeData.rowCount <= 0) {
      Response.success = false;
      Response.content = "No account registered with this id.";
    } else {
      const account_type =
        accountTypeData.rows[0]["acc_type"] === "client"
          ? "therapist" : "client";

      const query = `SELECT service, date, time, ${account_type}_name FROM bookings where client_id = $1 and date < $2`;
      const values = [id, today];
      const data = await client.query(query, values);

      if (data.rowCount <= 0) {
        Response.success = true;
        Response.content = "There are no previous bookings.";

        return JSON.stringify(Response);
      }

      Response.content = data.rows;
    }
  } catch (error) {
    Response.content += error;
  }
  client.release();
  return JSON.stringify(Response);
}

module.exports = {
  addBooking,
  getPreviousBookings,
  getFutureBookings,
  getAvailableHours,
};
