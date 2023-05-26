/* eslint-disable */

/*)
const alertuuSchema = {
  id: "012...", //generated unique code
  sensorid: "01", // sensor ID
  check: false, // Checks if the situation was check personally
  checkTime: 2023-01-02T00:00:00Z, // Time when the user checks alert
  status: false, // checks if alert is currently active
  awid: "012...", //app instance id - unique code specified externally
  sys: {
    cts: "...", //creation timestamp
      mts: "...", //modification timestamp
      rev: 0 //revision number
  },
*/

const alertCreateDtoInType = shape({
  sensorId: uu5String(512).isRequired(),
  status: boolean(),
});

const alertListDtoInType = shape({
  timeFrom: uu5String(512),
  timeTo: uu5String(512),
  sensorid: id(),
  pageInfo: shape({
    pageIndex: integer(),
    pageSize: integer(),
  }),
});

const alertDeleteDtoInType = shape({
  id: id().isRequired()
})

const alertUpdateDtoInType = shape({
  id: id().isRequired(),
  sensorId: id(),
  check: boolean(),
  checkTime: uu5String(512),
  status: boolean(),
});

const alertCheckDtoInType = shape({
  id: id().isRequired()
});
