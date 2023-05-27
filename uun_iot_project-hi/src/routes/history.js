//@@viewOn:imports
import {
  Utils,
  createVisualComponent,
  Environment,
  Lsi,
  DynamicLibraryComponent,
  useSession,
  useDynamicLibraryComponent,
  useState,
  useEffect
} from "uu5g05";
import Uu5Elements from "uu5g05-elements";
import { useSubApp, useSystemData } from "uu_plus4u5g02";
import Plus4U5App, { withRoute } from "uu_plus4u5g02-app";
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip } from 'recharts';

import Config from "./config/config.js";
import AboutCfg from "../config/about.js";
import RouteBar from "../core/route-bar.js";
import importLsi from "../lsi/import-lsi.js";
//import HistoryBox from "../bricks/history-box.js";
//@@viewOff:imports

//@@viewOn:constants
//@@viewOff:constants

//@@viewOn:css
const Css = {
  content: () => Config.Css.css`
    margin: 0 auto;
    max-width: 920px;

    .plus4u5-app-history > .uu5-bricks-header,
    .plus4u5-app-licence > .uu5-bricks-header,
    .plus4u5-app-authors > .uu5-bricks-header,
    .plus4u5-app-technologies > .uu5-bricks-header {
      border-bottom: 0;
    }

    .plus4u5-app-authors > .uu5-bricks-header {
      margin: 20px 0 10px 0;
      text-align: center;
    }

    > *:last-child {
      padding-bottom: 56px;
    }
  `,
  technologies: () => Config.Css.css({ maxWidth: 480 }),
  logos: () => Config.Css.css({ textAlign: "center", marginTop: 56 }),
  common: () =>
    Config.Css.css({
      maxWidth: 480,
      margin: "12px auto 56px",

      "& > *": {
        borderTop: "1px solid rgba(0, 0, 0, 0.12)",
        padding: "9px 0 12px",
        textAlign: "center",
        color: "#828282",
        "&:last-child": {
          borderBottom: "1px solid rgba(0, 0, 0, 0.12)",
        },
      },
    }),
  technologiesLicenseRow: () =>
    Config.Css.css({
      display: "grid",
      gridTemplateColumns: "minmax(0, 12fr)",
      marginTop: 40,
      padding: "0 8px",
      gap: "0 16px",
      borderTop: "1px solid rgba(0,0,0,.12)",
      ...Utils.Style.getMinMediaQueries("l", {
        gridTemplateColumns: "minmax(0, 8fr) minmax(0, 4fr)",
      }),
    }),
  license: () => Config.Css.css({ width: "auto" }),
};
//@@viewOff:css

//@@viewOn:helpers
//@@viewOff:helpers

  let History = createVisualComponent({
  //@@viewOn:statics
  uu5Tag: Config.TAG + "History",
  //@@viewOff:statics

  //@@viewOn:propTypes
  propTypes: {},
  //@@viewOff:propTypes

  //@@viewOn:defaultProps
  defaultProps: {},
  //@@viewOff:defaultProps

  render(props) {
    //@@viewOn:private
    function createMockData() {
      const sensorIds = [1234, 1235, 1236, 1237]; // Add as many sensor IDs as needed
      const startDate = new Date("2023-01-01T00:00:00");
      const endDate = new Date("2023-12-31T23:59:59");
    
      let data = [];
    
      for (let d = startDate; d <= endDate; d.setDate(d.getDate() + 1)) {
        let entry = { time: new Date(d) };
        
        sensorIds.forEach(id => {
          entry[`sensor${id}`] = Math.round(Math.random()); // Randomly assign a flooded state (0 or 1)
        });
    
        data.push(entry);
      }
    
      return data;
    }
    
    // Then, you can use this function to create your mock data:
    const data = createMockData();
    //@@viewOff:private

    //@@viewOn:interface
    //@@viewOff:interface

    //@@viewOn:render
    
    const attrs = Utils.VisualComponent.getAttrs(props);
    return (
      <div {...attrs}>
        <RouteBar />
        <UU5.Bricks.Container>
        <AreaChart
        width={500}
        height={400}
        data={data}
        margin={{ top: 10, right: 30, left: 0, bottom: 0 }}
      >
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="time" />
        <YAxis />
        <Tooltip />
        {/* Map each sensor to an Area in the chart */}
        {Object.keys(data[0] || {}).filter(key => key !== 'time').map(sensor => (
          <Area type="monotone" dataKey={sensor} stackId="1" stroke="#8884d8" fill="#8884d8" />
        ))}
      </AreaChart>
    </UU5.Bricks.Container>
      </div>
    );
  },
  //@@viewOff:render
});

History = withRoute(History);

//@@viewOn:exports
export { History };
export default History;
//@@viewOff:exports
