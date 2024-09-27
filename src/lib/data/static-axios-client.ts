import { ColumnSetting, DataSourceDto, FieldAddtionalInformation, FieldPCAlignment, SectionAdditionalInformation, SeriesDto } from "./axios-client";
//  this file contain adjuasted data to respect json files 



// SectionDto
// FieldDataType enum
// FieldDto
// FiledOptions interface 
// SectionType enum
// RouteStatus enum

export enum RouteStatus {
    Scheduled = "Scheduled",
    InProgress = "InProgress",
    Completed = "Completed",
    Pending = "Pending",
    Planned = "Planned",
    Refunded = "Refunded"
}

export enum SectionType {
    Normal = "Normal",
    Lines = "Lines",
    Table = "Table",
    Chart = "Chart",
    Cards = "Cards",
    Calendar = "Calendar",
    Columns = "Columns",
    Filter = "Filter",
    List = "List",
    Media = "Media",
    Taps = "Taps",

}

export enum FieldDataType {
    Unkown = "Unkown",
    String = "String",
    Number = "Number",
    Select = "Select",
    Link = "Link",
    Date = "Date",
    Time = "Time",
    Text = "Text",
    Price = "Price",
    Percent = "Percent",
    Attachment = "Attachment",
    Hidden = "Hidden",
    Label = "Label",
    Address = "Address",
    PriceLocalCurrency = "PriceLocalCurrency",
    PriceSystemCurrency = "PriceSystemCurrency",
    PriceLines = "PriceLines",
    PriceFromDocument = "PriceFromDocument",
    Checkbox = "Checkbox",
    MultipleDate = "MultipleDate",
    HTMLEditor = "HTMLEditor",
    CCValidity = "CCValidity",
    Property = "Property",
    Amount = "Amount",
    AmountFromDocument = "AmountFromDocument",
    ItemImage = "ItemImage",
    Quantity = "Quantity",
    Title = "Title",
    Signature = "Signature",
    Icon = "Icon",
    Button = "Button",
    Map = "Map",
    Paragraph = "Paragraph",
    Integer = "Integer",
    TimeAmount = "TimeAmount",
    Rate = "Rate",
}

export enum TapsTempleType {
    Unkown = "Unkown",
    Driver = "Driver",
    Route = "Route",
    
}

export interface ISectionDto {
    id?: string;
    localizations?: string | null;
    areas?: string | null;
    isSystem?: boolean;
    organizationId?: string;
    roles?: string | null;
    moduleId?: string | null;
    dataSourceId?: string | null;
    xmlTagName?: string | null;
    title?: string | null;
    type?: SectionType;
    sortOrder?: number | null;
    additionalIdentifier?: string | null;
    tabGroup?: string | null;
    icon?: string | null;
    disabled?: boolean | null;
    columnSettingsParsed?: ColumnSetting[] | null;
    additionalInformationParsed?: SectionAdditionalInformation;
    dataSource?: DataSourceDto;
    fields?: FieldDto[] | null;
    taps?: TapDto[] | null;

}

export class SectionDto implements ISectionDto {
    id?: string;
    localizations?: string | null;
    required?: boolean | null;
    creatable?: boolean | null;
    editable?: boolean | null;
    areas?: string | null;
    propertyName?: string | null;
    isSystem?: boolean;
    columns?: number;
    showColumns?: number;
    organizationId?: string;
    roles?: string | null;
    moduleId?: string | null;
    dataSourceId?: string | null;
    xmlTagName?: string | null;
    title?: string | null;
    type?: SectionType;
    sortOrder?: number | null;
    additionalIdentifier?: string | null;
    tabGroup?: string | null;
    icon?: string | null;
    disabled?: boolean | null;
    columnSettingsParsed?: ColumnSetting[] | null;
    additionalInformationParsed?: SectionAdditionalInformation;
    dataSource?: DataSourceDto;
    fields?: FieldDto[] | null;
    taps?: TapDto[] | null;
    static fromJS(data: any): SeriesDto {
        data = typeof data === "object" ? data : {};
        let result = new SeriesDto();
        result.init(data);
        return result;
    }

    constructor(data?: ISectionDto) {
        if (data) {
            for (var property in data) {
                if (data.hasOwnProperty(property))
                    (<any>this)[property] = (<any>data)[property];
            }
        }
    }

    init(_data?: any) {
        if (_data) {
            this.id = _data["id"];
            this.propertyName = _data["propertyName"];
            this.columns = _data["columns"]
            this.showColumns = _data["showColumns"]
            this.localizations = _data["localizations"];
            this.creatable = _data["creatable"];
            this.editable = _data["editable"];
            this.required = _data["required"];
            this.areas = _data["areas"];
            this.isSystem = _data["isSystem"];
            this.organizationId = _data["organizationId"];
            this.roles = _data["roles"];
            this.moduleId = _data["moduleId"];
            this.dataSourceId = _data["dataSourceId"];
            this.xmlTagName = _data["xmlTagName"];
            this.title = _data["title"];
            this.type = _data["type"];
            this.sortOrder = _data["sortOrder"];
            this.additionalIdentifier = _data["additionalIdentifier"];
            this.tabGroup = _data["tabGroup"];
            this.icon = _data["icon"];
            this.disabled = _data["disabled"];

            if (Array.isArray(_data["columnSettingsParsed"])) {
                this.columnSettingsParsed = [] as any;
                for (let item of _data["columnSettingsParsed"])
                    this.columnSettingsParsed!.push(ColumnSetting.fromJS(item));
            }
            if (Array.isArray(_data["taps"])) {
                this.taps = [] as any;
                for (let item of _data["taps"])
                    this.taps!.push(TapDto.fromJS(item));
            }

            this.additionalInformationParsed = _data["additionalInformationParsed"] ? SectionAdditionalInformation.fromJS(_data["additionalInformationParsed"]) : <any>null;
            this.dataSource = _data["dataSource"] ? DataSourceDto.fromJS(_data["dataSource"]) : <any>null;
            if (Array.isArray(_data["fields"])) {
                this.fields = [] as any;
                for (let item of _data["fields"])
                    this.fields!.push(FieldDto.fromJS(item));
            }
        }
    }
    toJSON(data?: any) {
        data = typeof data === "object" ? data : {};
        data["id"] = this.id;
        data["localizations"] = this.localizations;
        data["areas"] = this.areas;
        data["isSystem"] = this.isSystem;
        data["organizationId"] = this.organizationId;
        data["roles"] = this.roles;
        data["moduleId"] = this.moduleId;
        data["dataSourceId"] = this.dataSourceId;
        data["xmlTagName"] = this.xmlTagName;
        data["title"] = this.title;
        data["type"] = this.type;
        data["sortOrder"] = this.sortOrder;
        data["additionalIdentifier"] = this.additionalIdentifier;
        data["tabGroup"] = this.tabGroup;
        data["icon"] = this.icon;
        data["disabled"] = this.disabled;
        if (Array.isArray(this.columnSettingsParsed)) {
            data["columnSettingsParsed"] = [];
            for (let item of this.columnSettingsParsed)
                data["columnSettingsParsed"].push(item.toJSON());
        }
        data["additionalInformationParsed"] = this.additionalInformationParsed
            ? this.additionalInformationParsed.toJSON()
            : this.additionalInformationParsed;
        data["dataSource"] = this.dataSource
            ? this.dataSource.toJSON()
            : this.dataSource;
        if (Array.isArray(this.fields)) {
            data["fields"] = [];
            for (let item of this.fields) data["fields"].push(item.toJSON());
        }
        return data;
    }
}
export class TapDto implements ITapsDto {
    label?: string | null;
    searchableKey?: string | null;
    dataSource?: DataSourceDto | null;
    value?: number | null;
    template?: TapsTempleType;
    keyNameInUrlParameter?: string | null;
    constructor(data?: IFieldDto) {
        if (data) {
            for (var property in data) {
                if (data.hasOwnProperty(property))
                    (<any>this)[property] = (<any>data)[property];
            }
        }
    }

    init(_data?: any) {
        if (_data) {
            this.label = _data["label"];
            this.searchableKey = _data["searchableKey"];
            this.value = _data["value"];
            this.value = _data["keyNameInUrlParameter"];
            this.template = _data["template"];
            this.dataSource = _data["dataSource"] ? DataSourceDto.fromJS(_data["dataSource"]) : <any>null;
        }
    }


    static fromJS(data: any): TapDto {
        data = typeof data === 'object' ? data : {};
        let result = new TapDto();
        result.init(data);
        return result;
    }

}
export interface FiledOptions {
    value: string;
    label: string;
}

export class FieldDto implements IFieldDto {
    id?: string;
    localizations?: string | null;
    areas?: string | null;
    isSystem?: boolean;
    columns?: number;
    organizationId?: string;
    roles?: string | null;
    sectionId?: string | null;
    propertyName?: string | null;
    label?: string | null;
    options?: FiledOptions[] | null;
    dataType?: FieldDataType;
    sortOrder?: number | null;
    inTableSortOrder?: number | null;
    dataSourceId?: string | null;
    filterDataSourceId?: string | null;
    linkedModule?: string | null;
    linkedField?: string | null;
    conditions?: string | null;
    disabled?: boolean | null;
    creatable?: boolean | null;
    filterable?: boolean | null;
    sortable?: boolean | null;
    required?: boolean | null;
    readOnly?: boolean | null;
    multiple?: boolean | null;
    editable?: boolean | null;
    pcAlignment?: FieldPCAlignment;
    maxLength?: number | null;
    additionalInformationParsed?: FieldAddtionalInformation;
    dataSource?: DataSourceDto;
    filterDataSource?: DataSourceDto;

    constructor(data?: IFieldDto) {
        if (data) {
            for (var property in data) {
                if (data.hasOwnProperty(property))
                    (<any>this)[property] = (<any>data)[property];
            }
        }
    }

    init(_data?: any) {
        if (_data) {
            this.id = _data["id"];
            this.columns = _data["columns"];
            this.localizations = _data["localizations"];
            this.areas = _data["areas"];
            this.multiple = _data["multiple"];
            this.isSystem = _data["isSystem"];
            this.organizationId = _data["organizationId"];
            this.roles = _data["roles"];
            this.sectionId = _data["sectionId"];
            this.propertyName = _data["propertyName"];
            this.label = _data["label"];
            this.dataType = _data["dataType"];
            this.sortOrder = _data["sortOrder"];
            this.inTableSortOrder = _data["inTableSortOrder"];
            this.dataSourceId = _data["dataSourceId"];
            this.dataSource = _data["datasource"];
            this.filterDataSourceId = _data["filterDataSourceId"];
            this.linkedModule = _data["linkedModule"];
            this.linkedField = _data["linkedField"];
            this.conditions = _data["conditions"];
            this.disabled = _data["disabled"];
            this.creatable = _data["creatable"];
            this.filterable = _data["filterable"];
            this.required = _data["required"];
            this.readOnly = _data["readOnly"];
            this.options = _data["options"];

            this.editable = _data["editable"];
            this.pcAlignment = _data["pcAlignment"];
            this.maxLength = _data["maxLength"];
            this.additionalInformationParsed = _data["additionalInformationParsed"] ? FieldAddtionalInformation.fromJS(_data["additionalInformationParsed"]) : <any>null;
            this.dataSource = _data["dataSource"] ? DataSourceDto.fromJS(_data["dataSource"]) : <any>null;
            this.filterDataSource = _data["filterDataSource"] ? DataSourceDto.fromJS(_data["filterDataSource"]) : <any>null;
        }
    }

    static fromJS(data: any): FieldDto {

        data = typeof data === 'object' ? data : {};
        let result = new FieldDto();
        result.init(data);
        return result;
    }

    toJSON(data?: any) {
        data = typeof data === 'object' ? data : {};
        data["id"] = this.id;
        data["localizations"] = this.localizations;
        data["areas"] = this.areas;
        data["isSystem"] = this.isSystem;
        data["organizationId"] = this.organizationId;
        data["roles"] = this.roles;
        data["sectionId"] = this.sectionId;
        data["propertyName"] = this.propertyName;
        data["label"] = this.label;
        data["dataType"] = this.dataType;
        data["sortOrder"] = this.sortOrder;
        data["inTableSortOrder"] = this.inTableSortOrder;
        data["dataSourceId"] = this.dataSourceId;
        data["filterDataSourceId"] = this.filterDataSourceId;
        data["linkedModule"] = this.linkedModule;
        data["linkedField"] = this.linkedField;
        data["conditions"] = this.conditions;
        data["disabled"] = this.disabled;
        data["creatable"] = this.creatable;
        data["filterable"] = this.filterable;
        data["required"] = this.required;
        data["readOnly"] = this.readOnly;
        data["editable"] = this.editable;
        data["pcAlignment"] = this.pcAlignment;
        data["maxLength"] = this.maxLength;
        data["additionalInformationParsed"] = this.additionalInformationParsed ? this.additionalInformationParsed.toJSON() : this.additionalInformationParsed;
        data["dataSource"] = this.dataSource ? this.dataSource.toJSON() : this.dataSource;
        data["filterDataSource"] = this.filterDataSource ? this.filterDataSource.toJSON() : this.filterDataSource;
        return data;
    }

}
export interface ITapsDto {
    label?: string | null;
    searchableKey?: string | null;
    dataSource?: DataSourceDto | null;
    value?: number | null;
    template?: TapsTempleType;
    keyNameInUrlParameter?: string | null;

}


export interface IFieldDto {
    id?: string;
    localizations?: string | null;
    areas?: string | null;
    isSystem?: boolean;
    organizationId?: string;
    roles?: string | null;
    sectionId?: string | null;
    propertyName?: string | null;
    label?: string | null;
    dataType?: FieldDataType;
    sortOrder?: number | null;
    inTableSortOrder?: number | null;
    dataSourceId?: string | null;
    filterDataSourceId?: string | null;
    linkedModule?: string | null;
    linkedField?: string | null;
    conditions?: string | null;
    disabled?: boolean | null;
    creatable?: boolean | null;
    filterable?: boolean | null;
    required?: boolean | null;
    readOnly?: boolean | null;
    editable?: boolean | null;
    pcAlignment?: FieldPCAlignment;
    maxLength?: number | null;
    additionalInformationParsed?: FieldAddtionalInformation;
    dataSource?: DataSourceDto;
    filterDataSource?: DataSourceDto;
}
