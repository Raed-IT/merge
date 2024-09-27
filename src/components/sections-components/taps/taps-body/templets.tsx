import { TapDto, TapsTempleType } from "@/lib/data/static-axios-client"
import DriverTemple from "./templates/template"
import RouteTemple from "./templates/route-temple"

type TapTempleItemProps = {
    record: any,
    tap: TapDto,
}
export default function TapTempleItem(props: TapTempleItemProps) {
    const { tap } = props;

    if (tap.template === TapsTempleType.Driver as string) {
        return <DriverTemple />
    }

    if (tap.template === TapsTempleType.Route as string) {
        return <RouteTemple {...props} />
    }

    return <> Unkown </>;
}

