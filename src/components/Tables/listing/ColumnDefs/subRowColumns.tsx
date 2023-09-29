import { GridActionsCellItem, GridColDef} from '@mui/x-data-grid'

import { EditableColumn } from 'src/components/Shared'
import Icon from 'src/@core/components/icon'

import yup from 'src/@core/utils/customized-yup'

const number = yup.number().min(0).required()
const email = yup.string().email().required()

const validator = (schema: yup.AnySchema, value: any)  => {
  try{
    schema.validateSync(value)
    return false
  }
  catch(e){
    return true
  }
}

const subRowColumns = (setVip: (vip: boolean) => void, editable = true): GridColDef[] => [
    {
      field: 'bathrooms',
      headerName: 'Baños',
      editable,
      sortable: false,
      filterable: false,
      headerAlign: 'left',
      width: 100,
      preProcessEditCellProps: (params) => ({ ...params.props, error: validator(number, params.props.value)}),
    },
    {
      field: 'rooms',
      headerName: 'Habitaciones',
      headerAlign: 'left',
      editable,
      filterable: false,
      sortable: false,
      width: 150,
      preProcessEditCellProps: (params) => ({ ...params.props, error: validator(number, params.props.value)}),
    },
    {
      field: 'adSite',
      headerName: 'Publicado en',
      headerAlign: 'left',
      filterable: false,
      sortable: false,
      editable,
      renderEditCell: (props) => <EditableColumn  {...props}/>,
      width: 250,
    },
    {
      field: 'adDate',
      type: 'date',
      headerAlign: 'left',
      headerName: 'Fecha Anuncio',
      filterable: false,
      sortable: false,
      width: 150,
    },
    {
      field: 'adOwner',
      headerName: 'Nombre propietario',
      headerAlign: 'left',
      filterable: false,
      sortable: false,
      editable,
      width: 250,
    },
    {
      field: 'email',
      headerName: 'Email',
      headerAlign: 'left',
      filterable: false,
      sortable: false,
      editable,
      renderEditCell: (props) => <EditableColumn  {...props}/>,
      preProcessEditCellProps: (params) => ({...params, error: validator(email, params.props.value)}),
      width: 250,
    },
    {
      field: 'user',
      headerName: 'Usuario',
      headerAlign: 'left',
      filterable: false,
      sortable: false,
      width: 150,
    },
    {
      type: 'actions',
      field: 'vip',
      width: 50,
      renderHeader: () => <></>,
      getActions: ({row: {vip}, id, ...props}) => [
        <GridActionsCellItem
          key='vip'
          label='VIP'
          color={'warning'}
          icon={<Icon width={24} icon={`tabler:star${vip ? '-filled' : ''}`} />}
          onClick={() => {setVip(!vip)}}
        />
      ]
    }
  ]

export default subRowColumns
