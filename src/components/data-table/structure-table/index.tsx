import {
  Box, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, TablePagination, Checkbox, IconButton, CircularProgress, TableSortLabel,
  Menu,
  ListItemIcon,
  MenuItem,
  Typography
} from '@mui/material';
import { useEffect, useState, useCallback, ChangeEvent, MouseEvent } from 'react';
import MoreHorizOutlinedIcon from '@mui/icons-material/MoreHorizOutlined';
import TableSelectedActions from '../selected-actions';
import { FilterCondition, ModuleDto, SectionDto } from '@/lib/data/axios-client';
import CardDataTable from '../../dynamic-card';
import TableHeaderComponent from '../headers';
import { GridColDef } from '@mui/x-data-grid';
import EditCalendarIcon from '@mui/icons-material/EditCalendar';
import PrintIcon from '@mui/icons-material/Print';
import LinkIcon from '@mui/icons-material/Link';
import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import FolderCopyIcon from '@mui/icons-material/FolderCopy';
import SendIcon from '@mui/icons-material/Send';
import { maxHeight } from '@mui/system';

const iconMap = {
  PrintIcon, LinkIcon, ContentCopyIcon, FolderCopyIcon, SendIcon,
};

type Column = {
  field: string;
  headerName: string;
  sortable: boolean;
};

type Props = {
  onApplyFilters?: (filters: FilterCondition[]) => void;
  columns: Column[];
  rows?: any[];
  header: React.ReactNode;
  loading: boolean;
  onCellClick?: (cell: any) => void;
  module?: ModuleDto;
  section?: SectionDto;
  defaultSelectedCell?: any[];
  onSelectedCellsChange?: (cells: any[]) => void;
  onPaginationModelChange?: (data: any) => void;
  totalRecordsCount?: number;
  onSortChange?: (field: string, direction: 'asc' | 'desc') => void;
  showHeader?: boolean;
  disabled?: boolean;
  renderCustomCell?: (row: any, columnKey: string) => React.ReactNode;
  isFetching?: boolean;
  heightTabel?: number;
};

type SortConfig = {
  field: string;
  direction: 'asc' | 'desc';
};

export type ColumnType = {
  isVisible: boolean;
  column: GridColDef;
};

export function DataTableComponent({
  totalRecordsCount, columns, rows = [], header, isFetching, disabled, loading, showHeader, onApplyFilters, onCellClick, defaultSelectedCell, module, onSelectedCellsChange, onPaginationModelChange, onSortChange, renderCustomCell, heightTabel
}: Props) {
  // chek useState
  const [paginationModel, setPaginationModel] = useState({
    page: 0,
    pageSize: 10,
  });

  const [openColumns, setOpenColumns] = useState(columns.map(col => ({ column: col, isVisible: true })));
  const [selectionModel, setSelectionModel] = useState<number[]>(defaultSelectedCell ?? []);
  const [isShowTableComponent, setIsShowTableComponent] = useState(true);
  const [sortConfig, setSortConfig] = useState<SortConfig>({ field: '', direction: 'asc' });
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [currentRowActions, setCurrentRowActions] = useState<any[]>([]);
  const [selectedCardIds, setSelectedCardIds] = useState<Set<number>>(new Set(defaultSelectedCell ?? []));

console.log(selectionModel);

  const handleCardSelectionChange = (selectedIds: Set<number>) => {
    setSelectedCardIds(selectedIds);
  };

  const handleMenuOpen = (event: MouseEvent<HTMLElement>, actions: any[]) => {
    setAnchorEl(event.currentTarget);
    setCurrentRowActions(actions);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
    setCurrentRowActions([]);
  };

  useEffect(() => {
    const searchParams = new URLSearchParams(window.location.search);
    const pageNumber = searchParams.get('pageNumber');
    const pageSize = searchParams.get('pageSize');

    setPaginationModel({
      page: pageNumber ? parseInt(pageNumber, 10) - 1 : 0,
      pageSize: pageSize ? parseInt(pageSize, 10) : 10,
    });
  }, []);

  useEffect(() => {
    if (onSortChange && sortConfig.field) {
      onSortChange(sortConfig.field, sortConfig.direction);
    }
  }, [sortConfig, onSortChange]);

  const handleSort = useCallback((field: string) => {
    setSortConfig(prevConfig => ({
      field,
      direction: prevConfig.field === field ? (prevConfig.direction === 'asc' ? 'desc' : 'asc') : 'asc',
    }));
  }, []);

  const updateURLSearchParams = (page: number, pageSize: number) => {
    const searchParams = new URLSearchParams(window.location.search);
    searchParams.set('pageNumber', (page + 1).toString());
    searchParams.set('pageSize', pageSize.toString());

    const newUrl = `${window.location.pathname}?${searchParams.toString()}`;
    window.history.replaceState(null, '', newUrl);
  };

  const setPage = (newPage: number) => {
    setPaginationModel(prev => ({ ...prev, page: newPage }));
    updateURLSearchParams(newPage, paginationModel.pageSize);

    if (onPaginationModelChange) {
      onPaginationModelChange({ page: newPage, pageSize: paginationModel.pageSize });
    }
  };

  const setRowsPerPage = (newPageSize: number) => {
    setPaginationModel(prev => ({ ...prev, pageSize: newPageSize }));
    updateURLSearchParams(paginationModel.page, newPageSize);

    if (onPaginationModelChange) {
      onPaginationModelChange({ page: paginationModel.page, pageSize: newPageSize });
    }
  };

  const isSelected = (id: number) => selectionModel.includes(id);

  const handleSelectAllClick = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.checked) {
      setSelectionModel(rows.map((row) => row.id));
      onSelectedCellsChange?.(rows.map((row) => row.id))
    } else {
      setSelectionModel([]);
      onSelectedCellsChange?.([])
    }
  };

  const handleCheckboxClick = (event: ChangeEvent<HTMLInputElement>, id: number) => {
    event.stopPropagation();
    setSelectionModel(prevSelection =>
      prevSelection.includes(id)
        ? prevSelection.filter((item) => item !== id)
        : [...prevSelection, id]
    );
    // sync selectionModel with onSelectedCellsChange
    selectionModel.includes(id)
      ? onSelectedCellsChange?.(selectionModel.filter(item => item !== id))
      : onSelectedCellsChange?.([...selectionModel, id]);
  };

  const handleToggleColumns = useCallback((column: ColumnType) => {
    setOpenColumns(prevColumns =>
      prevColumns.map(col =>
        col.column.field === column.column.field ? { ...col, isVisible: !col.isVisible } : col
      )
    );
  }, []);

  const triggerShowTable = useCallback(() => {
    setIsShowTableComponent(prev => !prev);
  }, []);

  return (
    <Box sx={{ height: loading ? "calc(100dvh - 400px)" : 'auto', width: '100%' }}>
      {showHeader && header}
      <TableHeaderComponent
        onApplyFilters={onApplyFilters}
        columns={openColumns}
        handleToggleColumns={handleToggleColumns}
        triggerShowTable={triggerShowTable}
        isShowTableComponent={isShowTableComponent}
        isLoading={loading}
      />
      {selectionModel.length > 0 && (
        <TableSelectedActions numSelected={selectionModel.length} module={module} />
      )}
      {loading ? (
        <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100%' }}>
          <CircularProgress />
        </Box>
      ) : isShowTableComponent ? (
        <TableContainer component={Paper} sx={{ maxHeight: `${heightTabel}vh` }}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell padding="checkbox" sx={{ borderBottom: '1px solid #ddd' }}>
                  <Checkbox
                    indeterminate={selectionModel.length > 0 && selectionModel.length < rows.length}
                    checked={rows.length > 0 && selectionModel.length === rows.length}
                    onChange={handleSelectAllClick}
                  />
                </TableCell>
                {openColumns.filter(col => col.isVisible).map((column) => (
                  <TableCell key={column.column.field} sx={{ borderBottom: '1px solid #ddd' }}>
                    {column.column.sortable ? (
                      <TableSortLabel
                        active={sortConfig.field === column.column.field}
                        direction={sortConfig.field === column.column.field ? sortConfig.direction : 'asc'}
                        onClick={() => handleSort(column.column.field)}
                      >
                        {column.column.headerName}
                      </TableSortLabel>
                    ) : (
                      <span>{column.column.headerName}</span>
                    )}
                  </TableCell>
                ))}

                <TableCell sx={{ borderBottom: '1px solid #ddd' }}></TableCell>
              </TableRow>
            </TableHead>
            <TableBody sx={{ backgroundColor: '#ffffff' }}>
              {rows.map((row) => (
                <TableRow
                  key={row.id}
                  onClick={(e: any) => {
                    if (e.target.type !== "checkbox") {
                      onCellClick?.(row);
                    }
                  }}
                  selected={isSelected(row.id)}
                  sx={{ position: 'relative' }}
                >
                  <TableCell padding="checkbox" sx={{ borderBottom: '1px solid #ddd' }}>
                    <Checkbox
                      checked={isSelected(row.id)}
                      onChange={(event: ChangeEvent<HTMLInputElement>) => handleCheckboxClick(event, row.id)}
                    />
                  </TableCell>
                  {openColumns.filter(col => col.isVisible).map((column) => (
                    <TableCell key={column.column.field} sx={{ borderBottom: '1px solid #ddd', cursor: "pointer" }}>
                      {renderCustomCell ? renderCustomCell(row, column.column.field) : row[column.column.field]}
                    </TableCell>
                  ))}
                  <TableCell onClick={(e) => e.stopPropagation()} sx={{ borderBottom: '1px solid #ddd' }}>
                    <IconButton onClick={(event) => handleMenuOpen(event, module?.actions ?? [])}>
                      <MoreHorizOutlinedIcon />
                    </IconButton>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
          <TablePagination
            component="div"
            disabled={isFetching || disabled}
            count={totalRecordsCount || rows.length}
            page={paginationModel.page}
            rowsPerPageOptions={[10, 25, 50, 100, 200]}
            onPageChange={(e, newPage) => setPage(newPage)}
            rowsPerPage={paginationModel.pageSize}
            onRowsPerPageChange={(e) => setRowsPerPage(parseInt(e.target.value, 10))}
          />
        </TableContainer>
      ) : (
        <CardDataTable
          rows={rows}
          fields={columns.map((col) => ({
            fieldName: col.field
          }))}
          onChangeSelection={(ids) => setSelectionModel(Array.from(ids))}
        />
      )}
      <Menu
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={handleMenuClose}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'center',
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'center',
        }}
      >
        {currentRowActions.length > 0 ? (
          currentRowActions.map((action) => {
            const IconComponent = action.icon ? iconMap[action.icon as keyof typeof iconMap] : null;
            return (
              <MenuItem key={action.id || action.name} onClick={handleMenuClose}>
                {IconComponent && <ListItemIcon><IconComponent /></ListItemIcon>}
                <Typography>{action.name}</Typography>
              </MenuItem>
            );
          })
        ) : (
          <MenuItem onClick={handleMenuClose}>
            <ListItemIcon><EditCalendarIcon /></ListItemIcon>
            <Typography>Edit</Typography>
          </MenuItem>
        )}
      </Menu>
    </Box>

  );
}