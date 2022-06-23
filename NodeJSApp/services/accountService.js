const pool = require("../databasepg");
const bcrypt = require("bcryptjs");

async function createAccount(name, emailAddress, password, accType) {
  const client = await pool.connect();
  let Response = {
    success: false,
    content: "Account could not be created.",
  };

  let hashPassword;
  bcrypt.hash(password, 5, async function (err, encryptedPassword) {
    if (err) {
      Response.success = false;
      Response.changeName = "Error encrypting the password: " + err;

      return JSON.stringify(Response);
    }

    hashPassword = encryptedPassword;
  });

  try {
    const query = `SELECT * FROM accounts WHERE email = $1`;
    const values = [emailAddress];

    let data = await client.query(query, values);
    let accountExists = data.rowCount > 0;

    if (accountExists) {
      Response.success = false;
      Response.content = "Email already exists";
    } else {
      const query = `INSERT INTO accounts (name, email, password, acc_type) VALUES ($1, $2, $3, $4)`;
      const values = [name, emailAddress, hashPassword, accType];

      await client.query(query, values);

      Response.success = true;
      Response.content = "Account successfully created.";
    }
  } catch (err) {
    Response.content += err;
  }

  client.release();
  return JSON.stringify(Response);
}

async function loginAccount(emailAddress, password) {
  const client = await pool.connect();
  let Response = {
    success: false,
    content: `Failed to log into account '${emailAddress}'. Wrong email or password.`,
  };

  try {
    const query = "SELECT * FROM accounts WHERE email = $1";
    const values = [emailAddress];
    const data = await client.query(query, values);
    const accountDetails = data.rows[0];

    if (accountDetails === undefined) {
      return JSON.stringify(Response);
    }

    let hash = accountDetails.password;
    const doesMatch = await compareAsync(password, hash);

    if (doesMatch) {
      let date = new Date().getTime();
      let token = date + accountDetails.email + "-AT";

      Response.success = true;
      Response.content = {
        token: token,
        userEmail: accountDetails.email,
        userId: accountDetails.id,
        userName: accountDetails.name,
        userAccType: accountDetails.acc_type,
      };

      const query = "UPDATE public.accounts SET auth_token = $1 WHERE id= $2";
      const values = [token, accountDetails.id];
      await client.query(query, values);
    }
  } catch (err) {
    Response.content += err;
  }

  client.release();
  return JSON.stringify(Response);
}

async function compareAsync(plainPassword, hashPassword) {
  return new Promise(function (resolve, reject) {
    bcrypt.compare(plainPassword, hashPassword, function (err, res) {
      if (err) {
        reject(err);
      } else {
        resolve(res);
      }
    });
  });
}

async function changeEmail(id, newEmail, token) {
  const client = await pool.connect();
  let Response = {
    success: false,
    content: "Email could not be changed.",
  };

  try {
    const isTokenValid = JSON.parse(await validateToken(id, token));

    if (isTokenValid.success) {
      let data = await client.query(
          `UPDATE accounts SET email='${newEmail}' WHERE id='${id}'`
      );

      if (data === undefined || data.rowCount === 0) {
        Response.content = `The email '${newEmail}' does not exist`;
      } else {
        Response.success = true;
        Response.content = `Email successfully changed to '${newEmail}'.`;
      }
    } else {
      Response = isTokenValid;
    }
  } catch (err) {
    Response.content += err;
  }

  client.release();
  return JSON.stringify(Response);
}

async function changePassword(id, newPassword, token) {
  const client = await pool.connect();
  let Response = {
    success: false,
    content: "Password could not be changed.",
  };

  try {
    let hashPassword;
    bcrypt.hash(newPassword, 5, async function (err, encryptedPassword) {
      if (err) {
        Response.success = false;
        Response.changeName = "Error encrypting the password: " + err;

        return JSON.stringify(Response);
      }

      hashPassword = encryptedPassword;
    });

    const isTokenValid = JSON.parse(await validateToken(id, token));

    if (isTokenValid.success) {
      const query = "UPDATE accounts SET password = $1 WHERE id = $2";
      const values = [hashPassword, id];

      await client.query(query, values);

      Response.success = true;
      Response.content = "Password changed successfully.";
    } else {
      Response = isTokenValid;
    }
  } catch (err) {
    Response.content += err;
  }

  client.release();
  return JSON.stringify(Response);
}

async function changeName(id, newName, token) {
  const client = await pool.connect();
  let Response = {
    success: false,
    content: "User name could not be changed.",
  };

  try {
    const isTokenValid = JSON.parse(await validateToken(id, token));

    if (isTokenValid.success) {
      const query = "UPDATE accounts SET name = $1 WHERE id = $2";
      const values = [newName, id];

      await client.query(query, values);

      Response.success = true;
      Response.content = "User name changed successfully.";
    } else {
      Response = isTokenValid;
    }
  } catch (err) {
    Response.content += err;
  }

  client.release();
  return JSON.stringify(Response);
}

async function validateToken(id, token) {
  const client = await pool.connect();
  let Response = {
    success: true,
    content: "Token is valid.",
  };

  const query = "SELECT * FROM accounts WHERE id = $1";
  const values = [id];
  const data = await client.query(query, values);
  const accountDetails = data.rows[0];

  if (accountDetails === undefined) {
    Response.success = false;
    Response.content = `ID not found: ${id}`;
  } else if (token !== accountDetails.auth_token) {
    Response.success = false;
    Response.content = `Token not valid`;
  }

  client.release();
  return JSON.stringify(Response);
}

async function getAccountInfo(emailAddress, password) {
  const client = await pool.connect();
  let Response = {
    success: false,
    content:
      "Could not get account info, account does not exists or invalid credentials provided.",
  };

  try {
    let query = "SELECT * FROM accounts WHERE email = $1";
    let values = [emailAddress];
    let data = await client.query(query, values);
    const accountDetails = data.rows[0];

    if (accountDetails === undefined) {
      return JSON.stringify(Response);
    }

    let hash = accountDetails.password;
    const doesMatch = await compareAsync(password, hash);

    if (doesMatch) {
      query =
        "SELECT name, email, password, auth_token FROM accounts where email = $1 and password = $2";
      values = [emailAddress, hash];

      data = await client.query(query, values);

      Response.content = data.rows;
      Response.success = true;
    }
  } catch (err) {
    Response.content += err;
  }

  client.release();
  return JSON.stringify(Response);
}

module.exports = {
  createAccount,
  loginAccount,
  changeEmail,
  changeName,
  changePassword,
  validateToken,
  getAccountInfo,
};
