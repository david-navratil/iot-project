/* eslint-disable */
const alertHistoryCreateDtoInType = shape({
  sensorId: uu5String(512).isRequired(),
  check: boolean(),
  checkTime: Date(),
  status: boolean(),
  switchTime: Date(),
  });
  
  const alertHistoryListDtoInType = shape({
    timeFrom: uu5String(512),
    timeTo: uu5String(512),
    sensorid: id(),
    pageInfo: shape({
      pageIndex: integer(),
      pageSize: integer(),
    }),
  });
  