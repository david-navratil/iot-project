import { createComponent, createVisualComponent, Utils, useState,PropTypes } from "uu5g05";
import Uu5Elements, {Button} from "uu5g05-elements";
import Uu5Forms from "uu5g05-forms";
import Config from "./config/config.js";
import { UuDate } from "uu_i18ng01";


const AlertModal = createVisualComponent({
  // define component details here...

  propTypes: {
    // the current name, and a function to update it
    currentName: PropTypes.string.isRequired,
    onUpdate: PropTypes.func.isRequired,
    onSubmit: PropTypes.func.isRequired,
  },

  render(props) {
    //form view
    return (
      <>

              <Uu5Elements.Modal
                {...props}
                header="Confirmation"
                info="Confirm that you saw the alert."
                footer={
                  <Uu5Elements.Grid
                    templateColumns={{ xs: "repeat(2, 1fr)", s: "repeat(2, auto)" }}
                    columnGap={Uu5Elements.UuGds.SpacingPalette.getValue(["fixed", "c"])}
                    justifyContent={{ s: "end" }}
                  >
                    <Button onClick={props.onClose}>Cancel</Button>
                    <Button onClick={props.onSubmit} significance="highlighted" colorScheme="negative">Confirm</Button>
                  </Uu5Elements.Grid>
                }
                children="A sensor dedected water. Please investigate."
              >
               
              </Uu5Elements.Modal>

      </>
    );
  },
});
export { AlertModal };
export default AlertModal;