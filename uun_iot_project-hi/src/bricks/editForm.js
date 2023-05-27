import { createComponent, createVisualComponent, Utils, useState } from "uu5g05";
      import Uu5Elements from "uu5g05-elements";
      import Uu5Forms from "uu5g05-forms";
      import { Config, wait } from "uu5g05-dev";
      import { UuDate } from "uu_i18ng01";

const EditForm = createVisualComponent({
  // define component details here...

  propTypes: {
    // the current name, and a function to update it
    currentName: PropTypes.string.isRequired,
    onUpdate: PropTypes.func.isRequired,
  },

  render({ currentName, onUpdate }) {
    const [isOpen, setIsOpen] = useState(false);

    const handleSubmit = ({ component, values }) => {
      onUpdate(values.name);
      setIsOpen(false);
    };

    const handleCancel = () => setIsOpen(false);

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
                header="Buy a T-shirt"
                info="Buy a Red Monster T-shirt in a limited edition and win one of interesting presents."
                footer={
                  <Uu5Elements.Grid
                    templateColumns={{ xs: "repeat(2, 1fr)", s: "repeat(2, auto)" }}
                    columnGap={Uu5Elements.UuGds.SpacingPalette.getValue(["fixed", "c"])}
                    justifyContent={{ s: "end" }}
                  >
                    <Uu5Forms.CancelButton onClick={props.onClose} />
                    <Uu5Forms.SubmitButton>Buy</Uu5Forms.SubmitButton>
                  </Uu5Elements.Grid>
                }
              >
                <Uu5Forms.Form.View>
                  <div
                    className={Config.Css.css({
                      display: "grid",
                      rowGap: 8,
                      columnGap: 32,
                      gridAutoFlow: "column",
                      gridTemplateRows: "repeat(4, auto)",
                      //gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
                      marginBottom: 8,
                    })}
                  >
                    <div>
                      <Uu5Forms.FormRadios
                        name="sex"
                        label="Gender"
                        itemList={[
                          { value: "man", label: "For Man" },
                          { value: "woman", label: "For Woman" },
                        ]}
                        required
                      />
                    </div>

                    <div>
                      <Uu5Forms.FormSwitchSelect
                        name="size"
                        label="Size"
                        initialValue="M"
                        itemList={[{ value: "S" }, { value: "M" }, { value: "L" }, { value: "XL" }, { value: "XXL" }]}
                      />
                    </div>

                    <div>
                      <Uu5Forms.FormNumber
                        name="count"
                        label="Item count"
                        required
                        min={1}
                        initialValue={1}
                        message="Item count is limited by current stock reserve."
                        onValidate={async (e) => {
                          const { value } = e.data;
                          const { maxAvailable } = await Calls.getItemAvailability();
                          if (value > maxAvailable) {
                            return {
                              messageParams: [maxAvailable],
                              message: {
                                en: "Unfortunately, only %d items are currently available.",
                              },
                            };
                          }
                        }}
                      />
                    </div>

                    <div className={Config.Css.css({ display: "grid", rowGap: 8 })}>
                      <Uu5Forms.FormSelect
                        name="destination"
                        label="Destination"
                        initialValue="prague"
                        itemList={[
                          { value: "prague", children: "Prague" },
                          { value: "plzen", children: "Plzeň" },
                          { value: "hk", children: "Hradec Králové" },
                          { value: "brno", children: "Brno" },
                          { value: "bratislava", children: "Bratislava" },
                          { value: "kosice", children: "Košice" },
                          { value: "kyiv", children: "Kyiv" },
                          { value: "ternopil", children: "Ternopil" },
                        ]}
                      />

                      <Uu5Forms.FormDate
                        name="deliveryDate"
                        label="Preferred delivery date"
                        min={deliveryDateMin.toIsoString()}
                      />
                    </div>

                    <div>
                      <Uu5Forms.FormText name="name" label="Name" placeholder="Name and surname" required />
                    </div>
                    <div>
                      <Uu5Forms.FormText
                        name="phone"
                        label="Phone"
                        iconLeft="uugds-phone"
                        prefix="+420"
                        type="tel"
                        required
                      />
                    </div>
                    <div>
                      <Uu5Forms.FormEmail name="email" label="E-mail" required />
                    </div>
                    <div>
                      <Uu5Forms.FormTextArea name="desc" label="Notes" />
                    </div>
                  </div>

                  <Uu5Forms.FormCheckbox
                    name="conditions"
                    label={
                      <>
                        I agree to <Uu5Elements.Link>Terms and conditions</Uu5Elements.Link>
                      </>
                    }
                    required
                  />
                </Uu5Forms.Form.View>
              </Uu5Elements.Modal>
            </Uu5Forms.Form.Provider>
      </>
    );
  },
});
export { EditForm };
export default EditForm;