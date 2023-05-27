const sensorListDtoInType = shape ({
    pageInfo: {
      pageIndex: integer(),
      pageSize: integer()
    }
});

const sensorDeleteDtoInType = shape({
   sensorid: id().isRequired()
});

const sensorUpdateDtoInType = shape({
   sensorid: id().isRequired(),
   name: string(255),
   relayid: id().isRequired(),
   isFlooded: boolean()
});

const sensorCreateDtoInType = shape({
   sensorid: id().isRequired(),
   name: string(255),
   relayid: id().isRequired(),
   isFlooded: boolean()
});