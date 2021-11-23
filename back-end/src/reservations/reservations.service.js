const knex = require("../db/connection");

function create(reservation) {
  return knex("reservations")
    .insert(reservation)
    .returning("*")
    .then((createdReservations) => createdReservations[0]);
}

function list(date) {
  return knex("reservations")
    .select("*")
    .where({ "reservation_date": date })
    .whereNotIn("status", ["finished", "cancelled"])
    .orderBy("reservation_time");
}

function read(id) {
  return knex("reservations")
    .select("*")
    .where({ "reservation_id": id })
    .first();
}

function updateStatus(reservation_id, newStatus) {
  return knex("reservations")
    .select("*")
    .where({ reservation_id })
    .update(newStatus, "*")
    .then((records) => records[0]);
}

function updateRes(reservation_id, updatedRes) {
  return knex("reservations")
    .select("*")
    .where({ reservation_id })
    .update(updatedRes, "*")
    .then((records) => records[0]);
}

function search(mobile_number) {
  return knex("reservations")
    .whereRaw(
      "translate(mobile_number, '() -', '') like ?",
      `%${mobile_number.replace(/\D/g, "")}%`
    )
    .orderBy("reservation_date");
}

module.exports = {
  create,
  list,
  read,
  updateStatus,
  updateRes,
  search,
};