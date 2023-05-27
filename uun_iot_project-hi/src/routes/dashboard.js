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
import Uu5Elements, { Button, Modal, Box, Line, Text, DateTime, Grid, Block } from "uu5g05-elements";
import { useSubApp, useSystemData } from "uu_plus4u5g02";
import Plus4U5App, { withRoute } from "uu_plus4u5g02-app";
import Config from "./config/config.js";
import AboutCfg from "../config/about.js";
import RouteBar from "../core/route-bar.js";
import importLsi from "../lsi/import-lsi.js";
import { format } from "date-fns";
import Section from "../bricks/section.js";
import { PieChart, Pie, Tooltip, Legend, Cell, ResponsiveContainer } from 'recharts';
import { getSections, getSensors, getAlerts, createSection, deleteSection, updateSection } from '../services/api';
import Uu5Forms from "uu5g05-forms";
import SectionAddModal from "../bricks/sectionAddModal.js";
import SectionEditModal from "../bricks/sectionEditModal.js";
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


const updateSensor = (sectionId, sensorId, updatedSensorData) => {
  // Update the specified sensor with new data
  console.log("Updating sensor:", sensorId, "in section:", sectionId, "with data:", updatedSensorData);
  // Implement the logic to update the sensor data in the backend or state management.
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

    const [deleteAlertOpen, setDeleteAlertOpen] = useState(false);
    const [updateModalOpen, setUpdateModalOpen] = useState(false);
    const [modalOpen, setModalOpen] = useState(false);
    const [modalUpdateSectionOpen, setModalUpdateSectionOpen] = useState(false);
    const [sectionUpdateId, setSectionUpdateId] = useState("");
    const [alertModalOpen, setAlertModalOpen] = useState(false);
    const [selectedAlert, setSelectedAlert] = useState(null);
    const [selectedSensor, setSelectedSensor] = useState(null);
    const [sections, setSections] = useState([]);
    const [sensors, setSensors] = useState([]);
    const [unassignedSensors, setUnassignedSensors] = useState([]);
    const [totalSections, setTotalSections] = useState(0);
    const [totalSensors, setTotalSensors] = useState(0);
    const [totalFlooded, setTotalFlooded] = useState(0);
    const [alerts, setAlerts] = useState([]);
    const FETCH_INTERVAL = 90000;
    const nonFlooded = totalSensors - totalFlooded;
    const COLORS = ['red', 'green'];
    const pieData = [
      { name: 'Flooded', value: totalFlooded },
      { name: 'Not Flooded', value: nonFlooded },
    ];
    const [update, setUpdate] = useState(false);

    const handleUpdateSection = async (sectionId) => {
      // Assume that newSensors is an array of sensor objects that should replace
      // the current sensors in the section with name = sectionName
      setSectionUpdateId(sectionId);
      setModalUpdateSectionOpen(true);
      // Find the section that needs to be updated
      const sectionToUpdate = sections.find(section => section.name === sectionName);
      if (!sectionToUpdate) {
        console.error(`Section with name ${sectionName} not found.`);
        return;
      }

      // Replace the sensors in this section
      sectionToUpdate.sensors = newSensors;

      // Update the sections state with the new data
      setSections([...sections]);
    };
    const handleUpdatedSection = async (sectionId) => {

      const sectionToUpdate = sections.find(section => section.name === sectionName);
      if (!sectionToUpdate) {
        console.error(`Section with name ${sectionName} not found.`);
        return;
      }

      // Replace the sensors in this section
      sectionToUpdate.sensors = newSensors;

      // Update the sections state with the new data
      setSections([...sections]);
    };

    const handleUpdateSensor = (sectionId, sensorId, sensorData) => {
      setUpdateModalOpen(true);
      setSelectedSensor({ sectionId, sensorId, sensorData });
    };
    const handleCreateSection = (newSectionName, newSectionSensorIds) => {
      // Assumes newSectionSensors is an array of sensor objects to add to the new section
      const newSectionSensors = sensors.filter(sensor => newSectionSensorIds.includes(sensor.id));
      // Ensure the new sensors are not in any other section
      const updatedSections = sections.map(section => {
        section.sensors = section.sensors.filter(sensor => !newSectionSensorIds.some(newSensor => newSensor === sensor.id));
        if (section.name != "Unassigned") {section.sensorIds = section.sensorIds.filter(sensor => !newSectionSensorIds.some(newSensor => newSensor === sensor));}
        if (section.name != "Unassigned") {updateSection(section.id, section.name, section.sensorIds);}
        return section;
      });

      // Add the new section to the sections list
      const newSection = {
        id: Utils.String.generateId(),
        name: newSectionName,
        sensors: newSectionSensors,
        sensorIds: newSectionSensorIds,
      };

      updatedSections.push(newSection);

      // Update the sections state
      setSections(updatedSections);

      setUpdateModalOpen(false);
    };
    const handleDeleteSection = async (sectionId) => {
      await deleteSection(sectionId);
      const updatedSections = sections.filter(section => section.id !== sectionId);
      setSections(updatedSections);
    };
    const handleOpenAlertModal = (alert) => {
      setSelectedAlert(alert);
      setAlertModalOpen(true);
    };


    const confirmUpdateSensor = (updatedSensorData) => {
      updateSensor(selectedSensor.sectionId, selectedSensor.sensorId, updatedSensorData);
      setUpdateModalOpen(false);
    };
    useEffect(() => {
      const fetchData = async () => {
        try {
          const [sectionData, sensorsData, alertsData] = await Promise.all([getSections(), getSensors(), getAlerts()]);

          // Mapping sensors and alerts


          const updatedSensors = sensorsData.itemList.map(sensor => {
            const sensorAlerts = alertsData.itemList.filter(alert => alert.sensorId === sensor.id);

            const isFlooded = sensorAlerts.some(alert => alert.status === true);
            return { ...sensor, isFlooded, alerts: sensorAlerts };
          });

          const updatedSections = sectionData.itemList.map(section => {
            const sectionSensors = updatedSensors.filter(sensor => section.sensorIds.includes(sensor.id));
            return { ...section, sensors: sectionSensors };
          });
          const unassignedSensors = updatedSensors.filter(sensor => !updatedSections.flatMap(section => section.sensorIds).includes(sensor.id));
          const unassignedSection = {
            id: Utils.String.generateId(),
            name: "Unassigned",
            sensors: unassignedSensors,
          };
          updatedSections.push(unassignedSection);
          setSections(updatedSections);
          setSensors(updatedSensors);
          setAlerts(alertsData.itemList);

          setUnassignedSensors(unassignedSensors);
          console.log(updatedSections);
          // Update totals
          setTotalSections(updatedSections.length);
          setTotalSensors(updatedSensors.length);
          setTotalFlooded(updatedSensors.filter(sensor => sensor.isFlooded).length);

        } catch (error) {
          console.error("Error:", error);
        }
      };

      // Call the async function
      fetchData();
      const intervalId = setInterval(fetchData, FETCH_INTERVAL);
      return () => clearInterval(intervalId);
    }, []);


    //@@viewOff:private

    //@@viewOn:interface

    //@@viewOff:interface

    //@@viewOn:render
    return (
      <div>
        <RouteBar />
        <h1></h1>
        <div style={{ paddingLeft: "2%", paddingRight: "2%" }}>
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
            <Grid.Item style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
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
                        {nonFlooded}
                      </Typography>
                    </CardContent>
                  </Card>
                </Grid.Item>
              </Grid>
            </Grid.Item>


          </Grid>
          <Block
            header={"Sections"}
            card="full"
            headerType="heading"
            level={2}
            //borderRadius="expressive"
            //colorScheme="positive"

            //significance="distinct"
            actionList={[
              {
                icon: "mdi-plus",
                onClick: () => setModalOpen(true),
                borderRadius: "full",
              }
            ]}
          >
            <SectionAddModal currentSensors={[{ value: "" }]} sections={sections} open={modalOpen} onClose={() => setModalOpen(false)} onUpdate={handleCreateSection} />
            <SectionEditModal open={modalUpdateSectionOpen} sectionId={sectionUpdateId} sections={sections} onClose={() => setModalUpdateSectionOpen(false)} onUpdate={handleUpdatedSection}/>
            <Grid container spacing={2} templateColumns={{ xs: "repeat(auto-fit, minmax(45%, 49%))" }}>
              {sections.map((section) => (
                <Section
                  key={section.id}
                  section={section}
                  handleUpdateSensor={handleUpdateSensor}
                  handleDeleteSection={handleDeleteSection}
                  handleUpdateSection={handleUpdateSection}
                />
              ))}
            </Grid>
          </Block>
        </div>
      </div>
    );
  },
  //@@viewOff:render
});

Dashboard = withRoute(Dashboard);
//@@viewOn:exports
export { Dashboard };
export default Dashboard;
//@@viewOff:exports
