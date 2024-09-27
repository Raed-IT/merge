"use client";

import React, { useState } from "react";
import { Box, Typography, Button, Dialog, DialogTitle, DialogContent, DialogActions } from "@mui/material";
import { DataGrid, GridColDef, GridRenderCellParams, GridPaginationModel } from "@mui/x-data-grid";
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";
import DeleteIcon from "@mui/icons-material/Delete";
import PersonAddIcon from "@mui/icons-material/PersonAdd";
import { useRouter, useParams } from "next/navigation";
import { useOrganizationUsersQuery } from "@/lib/data/axios-client/Query";
import InviteNewUser from "../invite-new-user";

const RenderCustomCell = (params: GridRenderCellParams) => {
  const paramss = useParams();
  const appId = paramss && "appId" in paramss ? (paramss.appId as string) : null;

  const { row, field } = params;
  const router = useRouter();

  switch (field) {
    case "companySize":
      return <Typography>{row.companySize}</Typography>;
    case "country":
      return <Typography>{row.country}</Typography>;
    case "localization":
      return <Typography>{row.localization}</Typography>;
    case "actions":
      return (
        <Button onClick={() => router.push(`/apps/${appId}/users/edit/${row.id}`)} sx={{ minWidth: 0 }}>
          <MoreHorizIcon sx={{ color: "#707070" }} />
        </Button>
      );
    default:
      return <Typography>{row[field]}</Typography>;
  }
};

const UsersTable = () => {
  const { data, isLoading, isError: error } = useOrganizationUsersQuery();
  const [openInviteModal, setOpenInviteModal] = useState(false); // حالة التحكم بالنافذة المنبثقة
  const [paginationModel, setPaginationModel] = useState<GridPaginationModel>({
    page: 0,
    pageSize: 10,
  });

  const router = useRouter();

  const handleDelete = () => {
    console.log("Deleting selected users");
  };

  const handleOpenInvite = () => {
    setOpenInviteModal(true);
  };

  const handleCloseInvite = () => {
    setOpenInviteModal(false);
  };

  if (isLoading) {
    return <Typography>Loading...</Typography>;
  }

  if (error) {
    const errorMessage = typeof error === "object" && error !== null && "message" in error ? (error as any).message : "An unknown error occurred";
    return <Typography>Error: {errorMessage}</Typography>;
  }

  const columns: GridColDef[] = [
    { field: "id", headerName: "ID", width: 200, renderCell: RenderCustomCell },
    { field: "role", headerName: "Role", width: 200, renderCell: RenderCustomCell },
    { field: "email", headerName: "Email", width: 200, renderCell: RenderCustomCell },
    { field: "firstName", headerName: "First Name", width: 200, renderCell: RenderCustomCell },
    { field: "lastName", headerName: "Last Name", width: 200, renderCell: RenderCustomCell },
    { field: "isActive", headerName: "Is Active", width: 200, renderCell: RenderCustomCell },
    { field: "actions", headerName: "Actions", width: 200, renderCell: RenderCustomCell },
  ];

  return (
    <Box sx={{ height: 600, width: "100%" }}>
      <Box sx={{ display: "flex", justifyContent: "end", mb: 2 }}>
        <Button onClick={handleOpenInvite} variant="contained" startIcon={<PersonAddIcon />} sx={{ mr: 2 }}>
          Invite User
        </Button>
        <Button onClick={handleDelete} variant="contained" startIcon={<DeleteIcon />} color="error">
          Delete Selected Users
        </Button>
      </Box>
      <DataGrid
        rows={data ? data.map((row, index) => ({ ...row, id: row?.email || index })) : []}
        columns={columns}
        pageSizeOptions={[10, 30, 50]} 
        pagination
        paginationModel={paginationModel} 
        onPaginationModelChange={(model) => setPaginationModel(model)} 
        checkboxSelection
        disableRowSelectionOnClick
      />
      <Dialog open={openInviteModal} onClose={handleCloseInvite} maxWidth="sm" fullWidth>
        <DialogTitle>Invite User</DialogTitle>
        <DialogContent>
          <InviteNewUser onClose={handleCloseInvite} />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseInvite} color="primary">
            Close
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default UsersTable;
