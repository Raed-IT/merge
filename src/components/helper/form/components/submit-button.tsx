import { LoadingButton } from "@mui/lab";

export default function SubmitFormButtonComponent({ isPending, disabled }: { isPending: boolean, disabled?: boolean }) {
    return <LoadingButton loading={isPending} disabled={disabled} type='submit' form="form" variant='contained' sx={{ textTransform: "none", fontWeight: '500', m: 0 }}   > Save </LoadingButton>
}