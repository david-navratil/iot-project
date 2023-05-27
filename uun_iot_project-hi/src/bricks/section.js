//@@viewOn:imports
import { createVisualComponent, Utils, Content, useState, PropTypes } from "uu5g05";
import Config from "./config/config.js";
import { Grid, Block, Button } from "uu5g05-elements";
import React from 'react';
import Sensor from './sensor';
import EditIcon from "@mui/icons-material/Edit";
import { IconButton } from "@mui/material";
import styled from "styled-components";
import ConfirmationModal from "./confirmationModal.js";
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
    handleUpdateSensor: PropTypes.func.isRequired,
    handleDeleteSection: PropTypes.func.isRequired,
    handleUpdateSection: PropTypes.func.isRequired
  },
  //@@viewOff:propTypes

  //@@viewOn:defaultProps
  defaultProps: {},
  //@@viewOff:defaultProps

  render(props) {
    //@@viewOn:private
    const { children, section, handleUpdateSensor } = props;
    const [modalOpen, setModalOpen] = useState(false);
    const [modalEditOpen, setModalEditOpen] = useState(false);
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
    return (
        <Block 
          header={section.name} 
          card="full" 
          headerType="heading"
          level={2}
          borderRadius="expressive"
          colorScheme="positive"
          significance="distinct"
          actionList={[
            {
              icon: "mdi-pencil",
              onClick: () => handleUpdateSection(section.id),
              borderRadius: "full",
            },
            {
              icon: "mdi-delete",
              onClick: () => setModalOpen(true),
              borderRadius: "full",
            }
          ]}
          >
          <ConfirmationModal open={modalOpen} onClose={() => setModalOpen(false)} onSubmit={() => props.handleDeleteSection(section.id)} />
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
