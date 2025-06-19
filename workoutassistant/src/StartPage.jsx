import { BorderHorizontalTwoTone } from '@mui/icons-material';
import React, { Fragment, useState } from 'react';
import SessionsList from './Components/SessionsList';
import { Tabs, Tab } from '@mui/material';
import { TabContext, TabList, TabPanel } from '@mui/lab';
import LogList from './Components/LogList';


export default function Start () {

    const [value, setValue] = React.useState("1");
      
    const handleChange = (event, newValue) => {
        setValue(newValue);
    }

    return (
        <TabContext value={value}>
            <TabList onChange={handleChange}>
                <Tab value="1" label="Recent Sessions" sx={{ paddingTop: 2, ml: 'auto', minWidth: '400px' }}/>
                <Tab value="2" label="View Logs" sx={{ paddingTop: 2, mr: 'auto', minWidth: '400px' }}/>
            </TabList>
            <TabPanel value="1"><SessionsList/></TabPanel>
            <TabPanel value="2"><LogList/></TabPanel>
        </TabContext>
    );
}