import { createComponent, createVisualComponent, useState, PropTypes } from "uu5g05";
import Uu5Elements from "uu5g05-elements";
import Uu5Forms from "uu5g05-forms";
import { updateSensor } from "../services/api.js";

const SensorEditModal = createVisualComponent({
  // define component details here...

  propTypes: {
    // the current name, and a function to update it
    sensorId: PropTypes.string.isRequired,
    onUpdate: PropTypes.func.isRequired,
    allSensors: PropTypes.array.isRequired,
  },

  render(props) {
    //form view
    return (
      <>
        <Uu5Forms.Form.Provider
          onSubmit={(e) => {
            if (!navigator.onLine) throw new Error("Demo submit error example.");

            if (props.allSensors.some(sensor => sensor.name.toLowerCase() === e.data.value.name.toLowerCase())) {
              // If so, show an error message
              alert(`Sensor with name ${e.data.value.name} already exists.`);
              return;
            }

            updateSensor(props.sensorId,e.data.value.name).then(() => props.onUpdate(props.sensorId,e.data.value.name));
            props.onClose();
          }}
        >
          <Uu5Elements.Modal
            {...props}
            header="Edit Sensor"
            info="Choose a new name for the sensor."
            footer={
              <Uu5Elements.Grid
                templateColumns={{ xs: "repeat(2, 1fr)", s: "repeat(2, auto)" }}
                columnGap={Uu5Elements.UuGds.SpacingPalette.getValue(["fixed", "c"])}
                justifyContent={{ s: "end" }}
              >
                <Uu5Forms.CancelButton onClick={props.onClose} />
                <Uu5Forms.SubmitButton>Update</Uu5Forms.SubmitButton>
              </Uu5Elements.Grid>
            }
          >
            <Uu5Forms.Form.View>
              <Uu5Forms.FormText
                name="name"
                label="Name"
                placeholder="New name of the sensor"
                required
                validateOnChange
                onValidate={async (e) => {
                  const name = e.data.value;

                  if (props.allSensors.some(sensor => sensor.name === name)) {
                    return {
                      feedback: "error",
                      message: {
                        en: "The sensor name must be unique."
                      },
                    };
                  }
                }}
              />
            </Uu5Forms.Form.View>
          </Uu5Elements.Modal>
        </Uu5Forms.Form.Provider>
      </>
    );
  },
});
export { SensorEditModal };
export default SensorEditModal;
