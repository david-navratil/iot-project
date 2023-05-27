//@@viewOn:imports
import { createVisualComponent, Utils, Content, useState, PropTypes } from "uu5g05";
import Config from "./config/config.js";
import { Grid, Block, Button } from "uu5g05-elements";
import React from 'react';
import Sensor from './sensor';
import EditIcon from "@mui/icons-material/Edit";
import { IconButton } from "@mui/material";
import styled from "styled-components";
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

const Section = createVisualComponent({
  //@@viewOn:statics
  uu5Tag: Config.TAG + "Section",
  nestingLevel: ["areaCollection", "area"],
  //@@viewOff:statics

  //@@viewOn:propTypes
  propTypes: {
    section: PropTypes.object.isRequired,
    handleUpdateSensor: PropTypes.func.isRequired
  },
  //@@viewOff:propTypes

  //@@viewOn:defaultProps
  defaultProps: {},
  //@@viewOff:defaultProps

  render(props) {
    //@@viewOn:private
    const { children, section, handleUpdateSensor } = props;
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
    //@@viewOff:private

    //@@viewOn:interface

    //@@viewOff:interface

    //@@viewOn:render
    const attrs = Utils.VisualComponent.getAttrs(props, Css.main());
    const [count, setCount] = useState(0);
    let increase = () => {

      if (props.isOpen) {
        if (count < props.limit) {
          setCount((current) => current + 1)
          props.setSum((current) => current + 1)
        }
      }
      else {
        setCount(0)
      }
    }
    return (
        <Block 
          header={section.name} 
          card="full" 
          headerType="heading"
          level={2}
          borderRadius="expressive"
          actionList={[
            {
              icon: "mdi-pencil",
              onClick: () => handleUpdateSensor(sectionId, sensor.id, { ...sensor, isFlooded: true }),
              borderRadius: "full",
            }
          ]}
          >
          <TextWithIcon>
            <h1>{section.name}</h1>
            <IconButtonWrapper>
              <IconButton onClick={() => handleUpdateSensor(sectionId, sensor.id, { ...sensor, isFlooded: true })}>
                <EditIcon />
              </IconButton>
            </IconButtonWrapper>
          </TextWithIcon>
          <Grid justifyItems="start" templateColumns={{xs: "repeat(auto-fit, minmax(200px, 1fr))"}}>
            {section.sensors.map((sensor) => (
              <Sensor
                key={sensor.id}
                sensor={sensor}
                sectionId={section.id}
                handleUpdateSensor={handleUpdateSensor}
              />
            ))}
          </Grid>
        </Block>
    )
    //@@viewOff:render
  },
});

//@@viewOn:exports
export { Section };
export default Section;
//@@viewOff:exports
