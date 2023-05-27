/* eslint-disable no-unused-vars */
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
import Uu5Elements, { Button, Modal, Box, Line, Text, DateTime, Grid } from "uu5g05-elements";
import { useSubApp, useSystemData } from "uu_plus4u5g02";
import Plus4U5App, { withRoute } from "uu_plus4u5g02-app";
import Config from "./config/config.js";
import AboutCfg from "../config/about.js";
import RouteBar from "../core/route-bar.js";
import importLsi from "../lsi/import-lsi.js";
import { format } from "date-fns";
import Section from "../bricks/section.js";
import { PieChart, Pie, Tooltip, Legend, Cell, ResponsiveContainer } from 'recharts';
import { getSections } from '../services/api';
import Uu5Forms from "uu5g05-forms";
import SectionAddModal from "../bricks/sectionAddModal.js";
//@@viewOff:imports

//@@viewOn:constants
//@@viewOff:constants

//@@viewOn:css

//@@viewOff:css

//@@viewOn:helpers


const saveSection = (section) => {
  // Save the new section data
  console.log("Saving section:", section);
  // Implement the logic to save the section data to the backend or state management.
};

const deleteSensor = (sectionId, sensorId) => {
  // Delete the specified sensor
  console.log("Deleting sensor:", sensorId, "from section:", sectionId);
  // Implement the logic to delete the sensor from the backend or state management.
};

const updateSensor = (sectionId, sensorId, updatedSensorData) => {
  // Update the specified sensor with new data
  console.log("Updating sensor:", sensorId, "in section:", sectionId, "with data:", updatedSensorData);
  // Implement the logic to update the sensor data in the backend or state management.
};

const createSensor = (sectionId, newSensorData) => {
  // Create a new sensor in the specified section
  console.log("Creating sensor in section:", sectionId, "with data:", newSensorData);
  // Implement the logic to create a new sensor in the backend or state management.
};
//@@viewOff:helpers

let Dashboard = createVisualComponent({
  //@@viewOn:statics
  uu5Tag: Config.TAG + "Dashboard",
  //@@viewOff:statics

  //@@viewOn:propTypes
  propTypes: {},
  //@@viewOff:propTypes
  //@@viewOn:defaultProps
  defaultProps: {},
  //@@viewOff:defaultProps

  render(props) {
    //@@viewOn:private
    const sensorsJson = require("../assets/sensors.json");

    const [deleteAlertOpen, setDeleteAlertOpen] = useState(false);
    const [updateModalOpen, setUpdateModalOpen] = useState(false);
    const [selectedSensor, setSelectedSensor] = useState(null);

    let totalSections = 0;
    let totalSensors = 0;
    let totalFlooded = 0;

    sensorsJson.forEach((section) => {
      totalSections++;
      totalSensors += section.sensors.length;
      section.sensors.forEach((sensor) => {
        if (sensor.isFlooded) {
          totalFlooded++;
        }
      });
    });

    const nonFlooded = totalSensors - totalFlooded;
    const COLORS = ['red', 'green'];
    const pieData = [
      { name: 'Flooded', value: totalFlooded },
      { name: 'Not Flooded', value: nonFlooded },
    ];

    const handleUpdateSensor = (sectionId, sensorId, sensorData) => {
      setUpdateModalOpen(true);
      setSelectedSensor({ sectionId, sensorId, sensorData });
    };
    const handleCreateSection = () => {
      setUpdateModalOpen(true);
      setSelectedSensor({ sectionName });
    };


    const confirmUpdateSensor = (updatedSensorData) => {
      updateSensor(selectedSensor.sectionId, selectedSensor.sensorId, updatedSensorData);
      setUpdateModalOpen(false);
    };

    useEffect(() => {
      // Fetch sections when the component mounts
      getSections().then(data => {
        console.log(data);
      }).catch(error => {
        console.error("Error:", error);
      });
    }, []);
    const [modalOpen, setModalOpen] = useState(false);
    //@@viewOff:private

    //@@viewOn:interface

    //@@viewOff:interface

    //@@viewOn:render
    return (
      <div>
        <RouteBar />

        <Grid container spacing={2} templateColumns={{ xs: "100%", m: "50% 50%" }}>
          <Grid.Item style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
            <ResponsiveContainer width="99%" height={400}>
              <PieChart>
                <Pie
                  dataKey="value"
                  isAnimationActive={false}
                  data={pieData}
                  cx="50%"
                  cy="50%"
                  outerRadius="80%"
                  fill="#8884d8"
                  label
                >
                  {
                    pieData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))
                  }
                </Pie>
                <Tooltip />
                <Legend />
              </PieChart>
            </ResponsiveContainer>
          </Grid.Item>
          <Grid.Item style={{justifyContent: 'center', alignItems: 'center' }}>
            <Grid container templateColumns={{ xs: "50% 50%" }}>
              <Grid.Item>
                <Card>
                  <CardContent>
                    <Typography variant="body2" component="div">
                      Total Sections:
                    </Typography>
                    <Typography variant="h5" color="text.secondary">
                      {totalSections}
                    </Typography>
                  </CardContent>
                </Card>
              </Grid.Item>
              <Grid.Item>
                <Card>
                  <CardContent>
                    <Typography variant="body2" component="div">
                      Total Sensors:
                    </Typography>
                    <Typography variant="h5" color="text.secondary">
                      {totalSensors}
                    </Typography>
                  </CardContent>
                </Card>
              </Grid.Item>
              <Grid.Item>
                <Card>
                  <CardContent>
                    <Typography variant="body2" component="div">
                      Total Flooded Sensors:
                    </Typography>
                    <Typography variant="h5" color="text.secondary">
                      {totalFlooded}
                    </Typography>
                  </CardContent>
                </Card>
              </Grid.Item>
              <Grid.Item>
                <Card>
                  <CardContent>
                    <Typography variant="body2" component="div">
                      Total Not Flooded Sensors:
                    </Typography>
                    <Typography variant="h5" color="text.secondary">
                      {totalSensors - totalFlooded}
                    </Typography>
                  </CardContent>
                </Card>
              </Grid.Item> 
              </Grid>
          </Grid.Item>


        </Grid>

        <Grid container spacing={2}>
          {sensorsJson.map((section) => (
            <Section
              key={section.id}
              section={section}
              handleUpdateSensor={handleUpdateSensor}
            />
          ))}
          <Button onClick={() => setModalOpen(true)}>
            Add Section
          </Button>
          <SectionAddModal open={modalOpen} onClose={() => setModalOpen(false)} />
        </Grid>
      </div>
    );
  },
  //@@viewOff:render
});

Dashboard = withRoute(Dashboard);
//<FilterModal carDataObject = {carsJson}/>
//@@viewOn:exports
export { Dashboard };
export default Dashboard;
//@@viewOff:exports
