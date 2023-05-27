import { createComponent, createVisualComponent, Utils, useState,PropTypes } from "uu5g05";
import Uu5Elements from "uu5g05-elements";
import Uu5Forms from "uu5g05-forms";
import Config from "./config/config.js";
import { UuDate } from "uu_i18ng01";

const SectionAddModal = createVisualComponent({
  // define component details here...

  propTypes: {
    // the current name, and a function to update it
    currentName: PropTypes.string.isRequired,
    onUpdate: PropTypes.func.isRequired,
  },

  render(props) {
    const [isOpen, setIsOpen] = useState(false);

    const handleSubmit = ({ component, values }) => {
      onUpdate(values.name);
      setIsOpen(false);
    };

    const handleCancel = () => setIsOpen(false);
    //form view
    return (
      <>
        <Uu5Forms.Form.Provider
              onSubmit={(e) => {
                if (!navigator.onLine) throw new Error("Demo submit error example.");
                alert("Submitted with values:\n" + JSON.stringify(e.data.value, null, 2));
                props.onClose();
              }}
            >
              <Uu5Elements.Modal
                {...props}
                header="Edit section name"
                info="Choose a name for a section. Best is location of the section."
                footer={
                  <Uu5Elements.Grid
                    templateColumns={{ xs: "repeat(2, 1fr)", s: "repeat(2, auto)" }}
                    columnGap={Uu5Elements.UuGds.SpacingPalette.getValue(["fixed", "c"])}
                    justifyContent={{ s: "end" }}
                  >
                    <Uu5Forms.CancelButton onClick={props.onClose} />
                    <Uu5Forms.SubmitButton>Edit</Uu5Forms.SubmitButton>
                  </Uu5Elements.Grid>
                }
              >
                <Uu5Forms.Form.View>
                <Uu5Forms.FormText name="name" label="Name" placeholder="Name and surname" required />
                </Uu5Forms.Form.View>
               
              </Uu5Elements.Modal>
            </Uu5Forms.Form.Provider>
      </>
    );
  },
});
export { SectionAddModal };
export default SectionAddModal;