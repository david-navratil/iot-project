const dataCreateDtoInType = shape({
    nodeId: string().isRequired(),
    status: boolean().isRequired()
  });
  
const dataListDtoInType = shape ({
    dataid: id().isRequired(),
    sensorConnection: boolean().isRequired(),
    dataAlert: boolean().isRequired(),
    timeFrom: date(),
    timeTo: date(),
    pageInfo: {
      pageIndex: integer(),
      pageSize: integer(100)
    }
});