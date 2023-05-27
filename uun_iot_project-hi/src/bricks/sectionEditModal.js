import { createComponent, createVisualComponent, Utils, useState, PropTypes } from "uu5g05";
import Uu5Elements from "uu5g05-elements";
import Uu5Forms from "uu5g05-forms";
import Config from "./config/config.js";
import { UuDate } from "uu_i18ng01";
import { updateSection } from "../services/api.js";

const SectionEditModal = createVisualComponent({
  // define component details here...

  propTypes: {
    // the current name, and a function to update it
    currentName: PropTypes.string.isRequired,
    onUpdate: PropTypes.func.isRequired,
    
  },

  render(props) {
    const [selectedSensors, setSelectedSensors] = useState(props.currentSensors || []);
    const allSensors = props.sections.flatMap(section => section.sensors);
    const sectionNames = props.sections.flatMap(section => section.name);
    //form view
    return (
      <>
        <Uu5Forms.Form.Provider
          onSubmit={(e) => {
            if (!navigator.onLine) throw new Error("Demo submit error example.");
          
            // iterate over the names of the selected sensors and find the corresponding IDs
            const selectedSensorIds = selectedSensors.map(sensorName => {
              const sensor = allSensors.find(s => s.name === sensorName);
              return sensor ? sensor.id : null; // make sure to handle the case where the sensor is not found
            });
            if (props.sections.some(section => section.name.toLowerCase() === e.data.value.name.toLowerCase())) {
              // If so, show an error message
              alert(`Section with name ${e.data.value.name} already exists.`);
              return;
            }
          
            createSection(e.data.value.name, selectedSensorIds).then(() => props.onUpdate(e.data.value.name, selectedSensorIds));
            props.onClose();
          }}
        >
          <Uu5Elements.Modal
            {...props}
            header="Add section"
            info="Choose a name for a section. Best is location of the section."
            footer={
              <Uu5Elements.Grid
                templateColumns={{ xs: "repeat(2, 1fr)", s: "repeat(2, auto)" }}
                columnGap={Uu5Elements.UuGds.SpacingPalette.getValue(["fixed", "c"])}
                justifyContent={{ s: "end" }}
              >
                <Uu5Forms.CancelButton onClick={props.onClose} />
                <Uu5Forms.SubmitButton>Create</Uu5Forms.SubmitButton>
              </Uu5Elements.Grid>
            }
          >
            <Uu5Forms.Form.View>
            <Uu5Forms.FormText
  name="name"
  label="Name"
  placeholder="Name of the section"
  required
  validateOnChange
  onValidate={async (e) => {
    const name = e.data.value;

    if (sectionNames.includes(name)) {
      return {
        feedback: "error",
        message: {
          en: "The section name must be unique."
        },
      };
    }
  }}
/>
              <Uu5Forms.TextSelect
              name="Sensors"
              label="Select multiple sensors"
              multiple
                itemList={props.sections.flatMap(section =>
                  section.sensors.map(sensor =>
                    ({ value: sensor.name, children: `${sensor.name} (current section: ${section.name})` })
                  )
                )}
                value={selectedSensors}
                onChange={(e) => {
                  //console.log("onChange");
                  setSelectedSensors(e.data.value);
                  //console.log(selectedSensors);
                  // TODO save value to state
                }}> 
                </Uu5Forms.TextSelect>
            </Uu5Forms.Form.View>

          </Uu5Elements.Modal>
        </Uu5Forms.Form.Provider>
      </>
    );
  },
});
export { SectionEditModal };
export default SectionEditModal;