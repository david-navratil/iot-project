/* eslint-disable */

/*
const sectionuuSchema = {
  id: "012...", //generated unique code
  name: "African reptiles", //A name of the section or room.
  sensorIds:[01,02,03], // array of relay id
  description: 1, //A floor where the section/room is located.
  awid: "012...", //app instance id - unique code specified externally
  sys: {
    cts: "...", //creation timestamp
    mts: "...", //modification timestamp
    rev: 0 //revision number
  },
};
*/

const sectionCreateDtoInType = shape({
  name: uu5String(512).isRequired(),
  description: uu5String(512),
  sensorIds: array(id()),
});

const sectionListDtoInType = shape({
  pageInfo: shape({
    pageIndex: integer(),
    pageSize: integer(),
  }),
});

const sectionDeleteDtoInType = shape({
  id: id().isRequired()
})

const sectionUpdateDtoInType = shape({
  id: id().isRequired(),
  name: uu5String(512),
  description: uu5String(512),
  sensorIds: array(id()),
});

