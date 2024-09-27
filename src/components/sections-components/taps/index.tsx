import { FormProps } from "@/components/helper/form/with-form";
import { SectionDto, TapDto } from "@/lib/data/static-axios-client";
import { Tabs as BaseTabs, TabPanel as Tabs } from '@mui/base';

import { Box } from "@mui/system";
import { TabsList, Tab, ScrollableBox } from "./styel";
import { useState } from "react";
import { TabPanel as BaseTabPanel } from '@mui/base/TabPanel';
import { TapsBodyComponent } from "./taps-body";

type TapsSectionComponentProps = {
    formProps: FormProps,
    section: SectionDto
};

export function TapsSectionComponent({ section, formProps }: TapsSectionComponentProps) {
    const [activeIndex, setActiveIndex] = useState(1);
    const handleTabChange = (event: React.SyntheticEvent | null, index: number) => {
        setActiveIndex(index);

    }

    return <Box>
        <BaseTabs value={activeIndex} onChange={(e, index) => handleTabChange(e, index as number)}>
            <TabsList sx={{ justifyContent: 'center', p: 1 }}>
                {section?.taps?.map((tab: TapDto) => (
                    <Tab key={tab.value} value={tab?.value ?? 0}>
                        {tab.label}
                    </Tab>
                ))}
            </TabsList>

           <TapsBodyComponent section={section} activeIndex={activeIndex} />
           
        </BaseTabs>
    </Box>
}