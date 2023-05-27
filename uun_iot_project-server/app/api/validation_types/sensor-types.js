const sensorListDtoInType = shape ({
   pageInfo: shape({
      pageIndex: integer(),
      pageSize: integer(),
    }),
});

const sensorDeleteDtoInType = shape({
   sensorid: id().isRequired()
});

const sensorUpdateDtoInType = shape({
   sensorid: id().isRequired(),
   name: string(255),
//   relayid: id().isRequired(),
   isFlooded: boolean()
});

const sensorCreateDtoInType = shape({
   name: string(255).isRequired(),
//   relayid: id().isRequired(),
   isFlooded: boolean()
});