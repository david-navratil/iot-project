//@@viewOn:imports
import styled from "styled-components";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import { Icon, IconButton, Card, CardContent, Typography } from "@mui/material";
import WaterIcon from "@mui/icons-material/Water";
import PlaceIcon from "@mui/icons-material/Place";
import CalendarTodayIcon from "@mui/icons-material/CalendarToday";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import {
  Utils,
  createVisualComponent,
  Environment,
  Lsi,
  DynamicLibraryComponent,
  useSession,
  useDynamicLibraryComponent,
  useState,
  useEffect,
  TextField,
  Alert,
  RichIcon,
} from "uu5g05";
import UU5 from "uu5g04";
import "uu5g04-bricks";
import "uu5g04-forms";
import Uu5Elements, { Button, Modal, Box, Line, Text, DateTime, Grid, Block } from "uu5g05-elements";
import { useSubApp, useSystemData } from "uu_plus4u5g02";
import Plus4U5App, { withRoute } from "uu_plus4u5g02-app";
import Config from "./config/config.js";
import AboutCfg from "../config/about.js";
import RouteBar from "../core/route-bar.js";
import importLsi from "../lsi/import-lsi.js";
import { format } from "date-fns";
import Section from "../bricks/section.js";
import { PieChart, Pie, Tooltip, Legend, Cell, ResponsiveContainer, AreaChart, CartesianGrid, XAxis, YAxis, Area } from 'recharts';
import { getSections, getSensors, getAlerts, createSection, deleteSection, updateSection, alertCheck } from '../services/api';
import Uu5Forms from "uu5g05-forms";
import SectionAddModal from "../bricks/sectionAddModal.js";
import SectionEditModal from "../bricks/sectionEditModal.js";
import SensorEditModal from "../bricks/sensorEditModal.js";
import AlertModal from "../bricks/alertModal.js";
import { parseISO } from 'date-fns'; // to format the dates
import _ from 'lodash'; // for grouping and counting data
import { getAlertHistory} from "../services/api";
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
    const [data, setData] = useState([]);

    useEffect(() => {
      async function fetchData() {
        const response = await getAlertHistory();
        const sensorsResponse = await getSensors();
        let groupedData = _.groupBy(response.itemList, item => format(new Date(item.checkTime), 'yyyy-MM-dd'));
        let processedData = _.map(groupedData, (values, key) => ({
          time: key,
          count: _.filter(values, 'status').length
        }));

        let mostFloodedSensorGroup = _.maxBy(_.values(groupedData), 'length');
    let mostFloodedSensorId = mostFloodedSensorGroup ? mostFloodedSensorGroup[0].sensorId : null;
    let mostFloodedSensor = null;
    if (mostFloodedSensorId) {
      const sensor = sensorsResponse.itemList.find(sensor => sensor.id === mostFloodedSensorId); // find the sensor from the list
      mostFloodedSensor = sensor ? sensor.name : null; // if sensor is found, get the name
    }

    setData({
      chartData: processedData,
      totalAlerts: response.itemList.length,
      mostFloodedSensor: mostFloodedSensor
    });
      }

      fetchData();
    }, []);

    // Then, you can use this function to create your mock data:
    //@@viewOff:private

    //@@viewOn:interface
    const { chartData, totalAlerts, mostFloodedSensor } = data;
    //@@viewOff:interface

    //@@viewOn:render

    const attrs = Utils.VisualComponent.getAttrs(props);
    return (
      <div style={{ paddingLeft: "2%", paddingRight: "2%" }}>
        <RouteBar />
        <UU5.Bricks.Container>

          <Block
            header={"Summary"}
            card="full"
            headerType="heading"
            level={2}
            //borderRadius="expressive"
            colorScheme="positive"

            significance="distinct"
          >              
            <Grid container spacing={2} templateColumns={{ xs: "100%", m: "50% 50%" }}>
              <Grid.Item style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
              <ResponsiveContainer width="90%" height={400}>
              <AreaChart

                data={chartData}
                margin={{ top: 10, right: 30, left: 0, bottom: 0 }}
              >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="time" tickFormatter={tick => format(parseISO(tick), 'MMM d')} />
                <YAxis />
                <Tooltip />
                <Area type="monotone" dataKey="count" stackId="1" stroke="#8884d8" fill="#8884d8" />
              </AreaChart>
            </ResponsiveContainer>
              </Grid.Item>
              <Grid.Item style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                <Grid container templateColumns={{ xs: "repeat(auto-fit, minmax(500, 600))" }}>
                  <Grid.Item>
                    <Card>
                      <CardContent>
                        <Typography variant="body2" component="div">
                          Total Alerts:
                        </Typography>
                        <Typography variant="h5" color="text.secondary">
                          {totalAlerts}
                        </Typography>
                      </CardContent>
                    </Card>
                  </Grid.Item>
                  <Grid.Item>
                    <Card>
                      <CardContent>
                        <Typography variant="body2" component="div">
                          Most flooded sensor
                        </Typography>
                        <Typography variant="h5" color="text.secondary">
                          {mostFloodedSensor}
                        </Typography>
                      </CardContent>
                    </Card>
                  </Grid.Item>
                </Grid>
              </Grid.Item>


            </Grid>
          </Block>
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
