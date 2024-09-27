"use client";
import React, { useState, useEffect } from 'react';

import { TextField, InputAdornment, Box } from '@mui/material';
import { SearchOutlined } from '@mui/icons-material';
import DynamicTabs from './Tab/DynamicTabs';
import DynamicList from './Tab/DynamicList';
import TabsList from './shared/TabsList';
import TabDefault from './shared/Tab';
import { TabPanel as BaseTabPanel } from '@mui/base/TabPanel';

/* EXAMPLE USING CODE DYNAMIC TAB */

function TabDynamis({ routesData, higthTab }: { routesData: any[], higthTab: number }) {
    const [itemSearchQuery, setItemSearchQuery] = useState('');
    const [activeTab, setActiveTab] = useState(0);

    const filterItems = (items: any[], searchField: string) => {
        if (!items || !Array.isArray(items)) {
            console.log("Invalid itemsData", items);
            return [];
        }
        if (!itemSearchQuery) {
            return items;
        }

        return items.filter((item: any) => {
            if (!item[searchField]) {
                console.log(`Missing field: ${searchField} in item`, item);
                return false;
            }
            return item[searchField].toLowerCase().includes(itemSearchQuery.toLowerCase());
        });
    };

    const tabsConfig = [
        {
            label: 'Drivers',
            value: 0,
            searchField: 'driver', 
            content: (filteredItems: any[]) => (
                <>
                    {filteredItems.length > 0 ? (
                        <DynamicList
                            items={filteredItems}
                            onSelectItem={(item) => console.log('Selected Driver:', item)}
                            renderItem={(item) => (
                                <TabsList item={item} selectedId={''} setSelectedId={() => { }} />
                            )}
                        />
                    ) : (
                        <Box>No Drivers Found</Box>
                    )}
                </>
            ),
        },
       /*  {
            label: 'Routes',
            value: 1,
            searchField: 'name', 
            content: (filteredItems: any[]) => (
                <>
                    {filteredItems.length > 0 ? (
                        <DynamicList
                            items={filteredItems}
                            onSelectItem={(item) => console.log('Selected Item:', item)}
                            renderItem={(item) => (
                                <TabDefault item={item} />
                            )}
                        />
                    ) : (
                        <Box>No Items Found</Box>
                    )}
                </>
            ),
        }, */
    ];

    const currentTabConfig = tabsConfig[activeTab];
    const filteredItems = filterItems(routesData, currentTabConfig.searchField);

    return (
        <>
            <DynamicTabs
                tabs={tabsConfig.map((tab, index) => ({
                    label: tab.label,
                    value: index,
                    content: (
                        <>
                            <Box paddingBottom={1} sx={{ pl: 1, pr: 1 }}>
                                <TextField
                                    fullWidth
                                    size="small"
                                    variant="outlined"
                                    value={itemSearchQuery}
                                    onChange={e => setItemSearchQuery(e.target.value)}
                                    placeholder={`Search ${tab.label}`}
                                    InputProps={{
                                        startAdornment: (
                                            <InputAdornment position="start">
                                                <SearchOutlined />
                                            </InputAdornment>
                                        ),
                                    }}
                                />
                            </Box>
                            {tab.content(filteredItems)}
                        </>
                    ),
                }))}
                onTabChange={(newValue: number) => setActiveTab(newValue)}
                higthTab={higthTab}
            />
        </>
    );
}

export default TabDynamis;
