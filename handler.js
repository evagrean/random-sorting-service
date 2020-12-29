"use strict";

const axios = require("axios");

module.exports.getRandomHouseAndHousemates = async (event) => {
  const houses = ["Gryffindor", "Hufflepuff", "Ravenclaw", "Slytherin"];

  const index = Math.floor(Math.random() * houses.length);

  const randomHouse = houses[index];

  const houseMembersURL = `http://hp-api.herokuapp.com/api/characters/house/${randomHouse}`;

  try {
    const getHouseMembers = await axios.get(houseMembersURL);
    const allHouseMembers = getHouseMembers.data;
    const students = allHouseMembers.filter((member) => member.hogwartsStudent);

    return {
      statusCode: 200,

      body: JSON.stringify({
        randomHouse: randomHouse,
        housemates: students,
      }),
    };
  } catch (err) {
    console.error(err);
  }
};
