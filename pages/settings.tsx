import TeacherLayout from '@/components/Teachers/TeacherLayout';
import { Tab, Tabs, TextField, Typography } from '@mui/material';
import { Box } from '@mui/system';
import React, { useState } from 'react';
import { GeneralNav, Sidebar } from '../components';

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
      <div
        role="tabpanel"
        hidden={value !== index}
        id={`simple-tabpanel-${index}`}
        aria-labelledby={`simple-tab-${index}`}
        {...other}
      >
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
      'aria-controls': `simple-tabpanel-${index}`,
    };
  }

  return (
    <TeacherLayout>
      <h2 className="text-[28px] font-bold mb-6" data-testid="dashboard-heading">
        Settings
      </h2>
      <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
        <Tabs
          value={value}
          textColor="inherit"
          onChange={handleChange}
          aria-label="basic tabs example"
        >
          <Tab
            label="Change Password"
            sx={{
              textTransform: 'capitalize',
              fontSize: '1.3rem',
              color: 'black',
              outlineColor: 'purple',
              fontWeight: 'fontWeightBold',
            }}
            {...a11yProps(0)}
          />
          <Tab
            label="Change Email"
            sx={{
              textTransform: 'capitalize',
              fontSize: '1.3rem',
              color: 'black',
              outlineColor: 'purple',
              fontWeight: 'fontWeightBold',
            }}
            {...a11yProps(1)}
          />
        </Tabs>
      </Box>
      <TabPanel value={value} index={0}>
        <div className="sm:w-[80%]">
          <div>
            <h3 className="mt-5 font-bold text-xl mb-2">Current password</h3>
            <TextField id="outlined-basic" fullWidth label="Current Password" variant="outlined" />
          </div>
          <div>
            <h3 className="mt-5 font-bold text-xl mb-2">New password</h3>
            <TextField id="outlined-basic" fullWidth label="New Password" variant="outlined" />
          </div>
          <div>
            <h3 className="mt-5 font-bold text-xl mb-2">New password</h3>
            <TextField id="outlined-basic" fullWidth label="New Password" variant="outlined" />
          </div>
          <div className="flex mt-5 items-center gap-4 sm:flex-row flex-col">
            <button className="px-8 py-4 w-full text-[#2073fa] rounded-lg font-bold bg-[#c6c4c8]">
              Cancel
            </button>
            <button className="px-8 py-4 w-full text-white rounded-lg font-bold bg-[#2073fa]">
              Update password
            </button>
          </div>
        </div>
      </TabPanel>

      <TabPanel value={value} index={1}>
        <div className="sm:w-[80%]">
          <div>
            <h3 className="mt-5 font-bold text-xl mb-2">Current email</h3>
            <TextField id="outlined-basic" fullWidth label="Current Email" variant="outlined" />
          </div>
          <div>
            <h3 className="mt-5 font-bold text-xl mb-2">New Email</h3>
            <TextField id="outlined-basic" fullWidth label="New Email" variant="outlined" />
          </div>
          <div className="flex mt-5 items-center gap-4 sm:flex-row flex-col">
            <button className="w-full px-8 py-4  text-[#2073fa] rounded-lg font-bold bg-[#c6c4c8]">
              Cancel
            </button>
            <button className="w-full px-8 py-4  text-white rounded-lg font-bold bg-[#2073fa]">
              Update Email
            </button>
          </div>
        </div>
      </TabPanel>
    </TeacherLayout>
  );
}
