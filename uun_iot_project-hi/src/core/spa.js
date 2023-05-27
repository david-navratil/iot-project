//@@viewOn:imports
import { createVisualComponent, Utils } from "uu5g05";
import Uu5Elements from "uu5g05-elements";
import Plus4U5 from "uu_plus4u5g02";
import Plus4U5App from "uu_plus4u5g02-app";

import Config from "./config/config.js";
import Dashboard from "../routes/dashboard.js";
import History from "../routes/history.js";
//@@viewOff:imports

//@@viewOn:constants
const About = Utils.Component.lazy(() => import("../routes/about.js"));
const InitAppWorkspace = Utils.Component.lazy(() => import("../routes/init-app-workspace.js"));
const ControlPanel = Utils.Component.lazy(() => import("../routes/control-panel.js"));

const ROUTE_MAP = {
  "": { redirect: "dashboard" },
  about: (props) => <About {...props} />,
  dashboard: (props) => <Dashboard {...props} />,
  history: (props) => <History {...props} />,
  "sys/uuAppWorkspace/initUve": (props) => <InitAppWorkspace {...props} />,
  controlPanel: (props) => <ControlPanel {...props} />,
  "*": () => (
    <Uu5Elements.Text category="story" segment="heading" type="h1">
      Not Found
    </Uu5Elements.Text>
  ),
};
const themes = {
  light: {
    backgroundColor: "#f1f1f1",
    color: "black",
  },
  dark: {
    backgroundColor: "#121212",
    color: "white",
  },
};

const getThemeCss = (theme) => {
  const colors = themes[theme];

  return Config.Css.css({
    display: "flex",
    alignItems: "stretch",
    backgroundColor: colors.backgroundColor,
    color: colors.color,
    height: "80px",
    padding: 10,
    margin: "10px 20px 20px 10px",
  });
};
//@@viewOff:constants

//@@viewOn:css
//@@viewOff:css

//@@viewOn:helpers
//@@viewOff:helpers

const Spa = createVisualComponent({
  //@@viewOn:statics
  uu5Tag: Config.TAG + "Spa",
  //@@viewOff:statics

  //@@viewOn:propTypes
  propTypes: {},
  //@@viewOff:propTypes

  //@@viewOn:defaultProps
  defaultProps: {},
  //@@viewOff:defaultProps

  render() {
    //@@viewOn:private  
    //@@viewOff:private

    //@@viewOn:interface
    //@@viewOff:interface

    //@@viewOn:render
    return (
      <Plus4U5.SpaProvider initialLanguageList={["en", "cs"]}>
        <Uu5Elements.ModalBus>
          <Plus4U5App.Spa routeMap={ROUTE_MAP} />
        </Uu5Elements.ModalBus>
      </Plus4U5.SpaProvider>
    );
    //@@viewOff:render
  },
});

//@@viewOn:exports
export { Spa };
export default Spa;
//@@viewOff:exports
