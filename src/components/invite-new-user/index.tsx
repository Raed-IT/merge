"use client";
import { useState } from "react";
import { Box, TextField, Button, Grid, Select, InputLabel, Skeleton, FormControl, MenuItem } from "@mui/material";
import { useRouter } from "next/navigation";
import { useAuthorizationProfilesGETQuery, useInviteEmployeeMutation } from "@/lib/data/axios-client/Query";
import { useSnackbar } from "notistack";
import { AxiosError } from "axios";
import { AuthorizationProfileDto, EmployeeInvitationRequestDto } from "@/lib/data/axios-client";

export default function InviteNewUser({ onClose }: { onClose?: () => void }) {
  const [newUser, setNewUser] = useState({
    email: "",
    authorizationProfileId: "",
    firstName: "",
    lastName: "",
  });
  const [formCheck, setFormCheck] = useState(false);
  const { enqueueSnackbar } = useSnackbar();
  const router = useRouter();

  const { mutate, isPending } = useInviteEmployeeMutation();
  const { data: authorizationProfiles, isLoading: isLoadingProfiles } = useAuthorizationProfilesGETQuery();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setNewUser((prevUser) => ({
      ...prevUser,
      [name]: value,
    }));
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setFormCheck(true);

    if (e.currentTarget.checkValidity()) {
      const request = EmployeeInvitationRequestDto.fromJS(newUser);
      mutate(request, {
        onError: (error: unknown) => {
          if (error instanceof AxiosError) {
            const errMsg = error.response?.data.message || "An error occurred";
            enqueueSnackbar(errMsg, { variant: "error" });
          } else {
            enqueueSnackbar("An error occurred", { variant: "error" });
          }
        },
        onSuccess: (data) => {
          enqueueSnackbar("User invited successfully!", { variant: "success" });
          if (onClose) { onClose(); }
        },
      });
    }
  };

  return (
    <Box sx={{ marginTop: "1rem" }}>
      <form onSubmit={handleSubmit}>
        <Grid container spacing={1} sx={{ padding: "0rem" }}>
          <Grid item xs={12}>
            <TextField
              required
              fullWidth
              id="firstName"
              label="First Name"
              name="firstName"
              value={newUser.firstName}
              onChange={handleChange}
              autoComplete="given-name"
              size="small"
              error={formCheck && !newUser.firstName}
              helperText={formCheck && !newUser.firstName ? "First name is required" : ""}
              sx={{ marginBottom: ".3rem" }}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              required
              fullWidth
              id="lastName"
              label="Last Name"
              name="lastName"
              value={newUser.lastName}
              onChange={handleChange}
              autoComplete="family-name"
              size="small"
              error={formCheck && !newUser.lastName}
              helperText={formCheck && !newUser.lastName ? "Last name is required" : ""}
              sx={{ marginBottom: ".3rem" }}
            />
          </Grid>

          <Grid item xs={12}>
            <TextField
              required
              fullWidth
              id="email"
              label="Email"
              name="email"
              type="email"
              value={newUser.email}
              onChange={handleChange}
              autoComplete="email"
              size="small"
              error={formCheck && !newUser.email}
              helperText={formCheck && !newUser.email ? "Email is required" : ""}
              sx={{ marginBottom: ".3rem" }}
            />
          </Grid>
          <Grid item xs={12}>
            <FormControl fullWidth>
              <InputLabel id={`select-label`}>AuthorizationProfileId {isLoadingProfiles ? "loading.. " : ""}</InputLabel>
              {isLoadingProfiles ? (
                <Skeleton variant="rectangular" width="100%" height={58} sx={{ borderRadius: 1, bgcolor: "grey.extraLight" }} />
              ) : (
                <Select
                  labelId={`select-label`}
                  value={newUser.authorizationProfileId}
                  label={"AuthorizationProfileId"}
                  required={true}
                  onChange={(e) => {
                    setNewUser((prevUser) => ({
                      ...prevUser,
                      authorizationProfileId: e.target.value,
                    }));
                  }}
                >
                  {authorizationProfiles?.data
                    ? authorizationProfiles.data!.map((item: AuthorizationProfileDto, index: number) => {
                      return (
                        <MenuItem key={index} value={item.id}>
                          {item.name}
                        </MenuItem>
                      );
                    })
                    : null}
                </Select>
              )}
            </FormControl>
          </Grid>
          <Box sx={{ display: "flex", justifyContent: "flex-start", mt: 3, paddingLeft: "8px" }}>
            <Button type="submit" variant="contained" color="primary" sx={{ marginRight: "1rem" }} disabled={isPending}>
              Invite
            </Button>
            <Button onClick={onClose} color="primary" sx={{color:'#cb112d'}}>
              Close
            </Button>
          </Box>
        </Grid>
      </form>
    </Box>
  );
}
