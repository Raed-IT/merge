import { FieldDto, SectionDto } from "./lib/data/axios-client"
import { FieldType } from "./utils/enums/filtd-type-enum"

export type registerUserDataType = {
    firstName: string | null
    lastName: string | null
    userEmail: string | null
    password: string | null
}

export type registerOrgDataType = {
    orgName: string | null
    companySize: string | null
    countryCode: string | null
    orgLocalization: string | null
    currency: string | null
    identifier: string | null
    position: string | null
}
export type FieldComponentValue = {
    error?: string | undefined | null,
    value: any,
    name: string
}


export type  GlobalDataType={
    [key: string]: any;
} | undefined;