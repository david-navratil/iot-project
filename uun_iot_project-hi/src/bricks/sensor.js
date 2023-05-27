//@@viewOn:imports
import { createVisualComponent, Utils, Content, useState,PropTypes} from "uu5g05";
import Config from "./config/config.js";
import React from 'react';
import { Grid} from "uu5g05-elements";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import WaterIcon from "@mui/icons-material/Water";
import PlaceIcon from "@mui/icons-material/Place";
import CalendarTodayIcon from "@mui/icons-material/CalendarToday";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import { format } from "date-fns";
import styled from "styled-components";
import { Icon, IconButton } from "@mui/material";
//@@viewOff:imports

//@@viewOn:constants
//@@viewOff:constants

//@@viewOn:css
const Css = {
  main: () => Config.Css.css({}),
};
//@@viewOff:css

//@@viewOn:helpers
//@@viewOff:helpers

const Sensor = createVisualComponent({
  //@@viewOn:statics
  uu5Tag: Config.TAG + "Sensor",
  nestingLevel: ["areaCollection", "area"],
  //@@viewOff:statics

  //@@viewOn:propTypes
  propTypes: {
    key: PropTypes.string.isRequired,
    sensor: PropTypes.object.isRequired,
    handleUpdateSensor: PropTypes.func.isRequired,
    handleDeleteSensor: PropTypes.func.isRequired,
    sectionId: PropTypes.string.isRequired,
  },
  //@@viewOff:propTypes

  //@@viewOn:defaultProps
  defaultProps: {},
  //@@viewOff:defaultProps

  render(props) {
    //@@viewOn:private
    const { children, sensor, handleUpdateSensor, sectionId } = props;
    //@@viewOff:private

    //@@viewOn:interface
    const StatusText = styled.div`
      color: ${(props) => (props.isFlooded ? "red" : "black")};
      display: flex;
      align-items: center;
      margin-bottom: 8px;
      font-weight: bold;
      font-size: 20px;
      margin: 2px;
    `;
    const TextWithIcon = styled.div`
      display: flex;
      align-items: center;
      margin-bottom: 8px;
      font-size: 18px;
    `;

    const IconButtonWrapper = styled.div`
      display: grid;
      grid-template-columns: repeat(2, 1fr);
      gap: 16px;
    `;
    const GridItem = styled(Grid.Item)`
      background-color: #f5f5f5;
      border-radius: 8px;
      padding: 16px;
      margin: 10px;
      border: solid;
      border-width: thin;
      transition: box-shadow 0.3s ease-in-out;
      &:hover {
        box-shadow: 0 4px 20px 0 rgba(0, 0, 0, 0.12);
      }
    `;
    //@@viewOff:interface

    //@@viewOn:render
    const attrs = Utils.VisualComponent.getAttrs(props, Css.main());
    const [count, setCount] = useState(0);
    return (
      <GridItem key={sensor.id}>
      <StatusText isFlooded={sensor.isFlooded}>
        <WaterIcon />
        <span style={{ margin: "5px", fontSize:"1rm" }}>{sensor.isFlooded ? "Flooded" : "Normal"}</span>
      </StatusText>
      <TextWithIcon>
        <PlaceIcon />
        <span style={{ margin: "5px" }}>{sensor.name}</span>       
        <IconButtonWrapper>
        <IconButton onClick={() => handleUpdateSensor(sectionId, sensor.id, { ...sensor, isFlooded: true })}>
          <EditIcon />
        </IconButton>
      </IconButtonWrapper>
      </TextWithIcon>
    </GridItem>
    )
    //@@viewOff:render
  },
});

//@@viewOn:exports
export { Sensor };
export default Sensor;
//@@viewOff:exports
