import TeacherLayout from "@/components/layouts/TeacherLayout";
import { Tab, Tabs, TextField, Typography } from "@mui/material";
import { Box } from "@mui/system";
import React, { useState } from "react";

export default function Settings() {
   const [value, setValue] = useState(0);
   const handleChange = (event: React.SyntheticEvent, newValue: number) => {
      setValue(newValue);
   };

   interface TabPanelProps {
      children?: React.ReactNode;
      index: number;
      value: number;
   }

   function TabPanel(props: TabPanelProps) {
      const { children, value, index, ...other } = props;

      return (
         <div role="tabpanel" hidden={value !== index} id={`simple-tabpanel-${index}`} aria-labelledby={`simple-tab-${index}`} {...other}>
            {value === index && (
               <Box sx={{ p: 3 }}>
                  <Typography>{children}</Typography>
               </Box>
            )}
         </div>
      );
   }

   function a11yProps(index: number) {
      return {
         id: `simple-tab-${index}`,
         "aria-controls": `simple-tabpanel-${index}`,
      };
   }

   return (
      <TeacherLayout>
         <h2 className="mb-6 text-[28px] font-bold" data-testid="dashboard-heading">
            Settings
         </h2>
         <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
            <Tabs value={value} textColor="inherit" onChange={handleChange} aria-label="basic tabs example">
               <Tab
                  label="Change Password"
                  sx={{
                     textTransform: "capitalize",
                     fontSize: "1.3rem",
                     color: "black",
                     outlineColor: "purple",
                     fontWeight: "fontWeightBold",
                  }}
                  {...a11yProps(0)}
               />
               <Tab
                  label="Change Email"
                  sx={{
                     textTransform: "capitalize",
                     fontSize: "1.3rem",
                     color: "black",
                     outlineColor: "purple",
                     fontWeight: "fontWeightBold",
                  }}
                  {...a11yProps(1)}
               />
            </Tabs>
         </Box>
         <TabPanel value={value} index={0}>
            <div className="sm:w-[80%]">
               <div>
                  <h3 className="mt-5 mb-2 text-xl font-bold">Current password</h3>
                  <TextField id="outlined-basic" fullWidth label="Current Password" variant="outlined" />
               </div>
               <div>
                  <h3 className="mt-5 mb-2 text-xl font-bold">New password</h3>
                  <TextField id="outlined-basic" fullWidth label="New Password" variant="outlined" />
               </div>
               <div>
                  <h3 className="mt-5 mb-2 text-xl font-bold">New password</h3>
                  <TextField id="outlined-basic" fullWidth label="New Password" variant="outlined" />
               </div>
               <div className="mt-5 flex flex-col items-center gap-4 sm:flex-row">
                  <button className="w-full rounded-lg bg-[#c6c4c8] px-8 py-4 font-bold text-[#2073fa]">Cancel</button>
                  <button className="w-full rounded-lg bg-[#2073fa] px-8 py-4 font-bold text-white">Update password</button>
               </div>
            </div>
         </TabPanel>

         <TabPanel value={value} index={1}>
            <div className="sm:w-[80%]">
               <div>
                  <h3 className="mt-5 mb-2 text-xl font-bold">Current email</h3>
                  <TextField id="outlined-basic" fullWidth label="Current Email" variant="outlined" />
               </div>
               <div>
                  <h3 className="mt-5 mb-2 text-xl font-bold">New Email</h3>
                  <TextField id="outlined-basic" fullWidth label="New Email" variant="outlined" />
               </div>
               <div className="mt-5 flex flex-col items-center gap-4 sm:flex-row">
                  <button className="w-full rounded-lg bg-[#c6c4c8]  px-8 py-4 font-bold text-[#2073fa]">Cancel</button>
                  <button className="w-full rounded-lg bg-[#2073fa]  px-8 py-4 font-bold text-white">Update Email</button>
               </div>
            </div>
         </TabPanel>
      </TeacherLayout>
   );
}
