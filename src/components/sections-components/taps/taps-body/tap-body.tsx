


import { Box } from "@mui/system";
import { TabPanel as BaseTabPanel } from '@mui/base/TabPanel';
import { SectionDto, TapDto } from "@/lib/data/static-axios-client";
import { useGlobalData } from "@/utils/api-global-hook/useGetGlobal";
import LoadingComponent from "@/components/loading";
import TabsList from "@/components/Dynamic-Tabs/shared/TabsList";
import TapTempleItem from "./templets";
type TapBodyComponent = {
    tap: TapDto,
    section: SectionDto,
    activeIndex: number,
}
export default function TapBodyComponent({ section, tap, activeIndex }: TapBodyComponent) {

    const { data: tapData, isLoading } = useGlobalData({
        dataSourceName: tap?.dataSource?.name ?? '',
        enabled: !!tap?.dataSource?.name,
    });

    return <Box>
        {isLoading
            ? <>Loading .... </>
            : <BaseTabPanel key={tap.value} value={tap?.value ?? 0} hidden={activeIndex !== tap.value}>
                {
                    tapData?.data?.map((record: any, index: number) => (
                        <TapTempleItem
                            key={index}
                            record={record}
                            tap={tap}
                        />
                    ))
                }
            </BaseTabPanel>
        }
    </Box>;
}