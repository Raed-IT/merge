import { ScrollableBox } from '../styel';
import { SectionDto, TapDto } from '@/lib/data/static-axios-client';
import TapBodyComponent from './tap-body';

type TapsBodyComponent = {
    section: SectionDto,
    activeIndex: number,

}

export function TapsBodyComponent({ section, activeIndex }: TapsBodyComponent) {

    return (
        <ScrollableBox sx={{ height: `70vh` }}>
            {
                section?.taps?.map((tab: TapDto, index) => (
                    <TapBodyComponent key={index} section={section} activeIndex={activeIndex} tap={tab} />
                ))
            }
        </ScrollableBox>
    )
}