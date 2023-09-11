import { GridColDef} from '@mui/x-data-grid'

import { StatusSelect } from '../components'
import listingOptionColumn from 'src/components/Shared/ListingOptionsColumn'
import { EditableColumn } from 'src/components/Shared'

type optionActions = {
  openCommentsModal: (id: string, comments: string) => void
  openEmailModal: (email: string) => void
  route: string
}

const NAN_VALIDATION = 'El valor debe ser un numero'

const listingColumns = ({openEmailModal, openCommentsModal, route}: optionActions): GridColDef[] => {
  return [
    {
      field: 'operation',
      headerName: 'Operacion',
      filterable: false,
      width: 120,
    },
    {
      field: 'category',
      headerName: 'Categoría',
      filterable: false,
      width: 100,
    },
    {
      field: 'title',
      headerName: 'Título',
      filterable: false,
      editable: true,
      renderEditCell: (props) => <EditableColumn  {...props}/>,
      width: 280
    },
    {
      field: 'price',
      type: 'number',
      headerName: 'Precio',
      filterable: false,
      editable: true,
      renderEditCell: (props) => <EditableColumn msg={NAN_VALIDATION} {...props}/>,
      preProcessEditCellProps: (params) => ({ ...params.props, error: Number.isNaN(params.props.value)}),
      width: 100
    },
    {
      field: 'meters',
      type: 'number',
      headerName: 'Metros 2',
      filterable: false,
      editable: true,
      renderEditCell: (props) => <EditableColumn msg={NAN_VALIDATION} {...props}/>,
      preProcessEditCellProps: (params) => ({ ...params.props, error: Number.isNaN(params.props.value)}),
      width: 100,
    },
    {
      field: 'sqrMtrPrice',
      headerName: 'Precio M2',
      filterable: false,
      valueGetter: ({row: { sqrMtrPrice, price}}) => {
        return price * sqrMtrPrice
      },
      width: 120,
    },
    {
      field: 'phone',
      type: 'number',
      headerName: 'Teléfono',
      filterable: false,
      editable: true,
      // preProcessEditCellProps: (params) => ({}),
      renderEditCell: (props) => <EditableColumn {...props}/>,
      width: 100,
    },
    {
      field: 'status',
      headerName: 'Estado',
      filterable: false,
      editable: true,
      width: 140,
      renderCell: (props) => <StatusSelect {...props}/>,
      renderEditCell: (props) => <StatusSelect {...props}/>,
    },
    {
      type: 'actions',
      field: 'options',
      headerName: 'Opciones',
      headerAlign: 'left',
      width: 260,
      getActions: (row) => listingOptionColumn({...row, listingSite: route, openEmailModal, openCommentsModal})
    }
  ]
}

export default listingColumns
