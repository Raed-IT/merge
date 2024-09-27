import { Grid } from '@mui/material';
import { SectionDto } from '@/lib/data/axios-client';
import { FieldComponentValue, GlobalDataType } from '@/types';
import SectionComponent from './section-component';

type SectionComponentProps = {
    sections: SectionDto[],
    columns?: number,
    formData: FieldComponentValue[],
    data?: GlobalDataType | undefined,
    onFinishLoading?: () => void,
    setValue: (value: FieldComponentValue) => void,
    formCheck: boolean,
    disabledFields?: boolean,
    sectionsType?: SectionType,
    isEditRecord?: boolean,
    isLoadData?: boolean,
    isOpen?: boolean,
    onClose?: () => void, // Add this handler
}

export enum SectionType {
    creatable, editable, all
}

const SectionsComponent = ({
    sections,
    onFinishLoading,
    setValue,
    formData,
    data,
    isLoadData,
    isEditRecord,
    formCheck,
    disabledFields,
    sectionsType = SectionType.creatable,
    isOpen,
    onClose
}: SectionComponentProps) => {    
    return (
        <Grid container spacing={2} justifyContent={{ xs: "center", md: 'space-between' }}>
            {sections.filter((section) => {
                if (sectionsType === SectionType.creatable) {
                    return !!section.creatable;
                }
                if (sectionsType === SectionType.editable) {
                    return !!section.editable;
                }
                return true;
            }).map((section: SectionDto, index: number) => (
                <SectionComponent
                    isLoadData={isLoadData}
                    isEditRecord={isEditRecord}
                    data={data}
                    disabledFields={disabledFields}
                    formCheck={formCheck}
                    onFinishLoading={onFinishLoading}
                    formData={formData}
                    key={section.id}
                    section={section}
                    setValue={setValue}
                />
            ))}
        </Grid>
    );
}

export default SectionsComponent;
