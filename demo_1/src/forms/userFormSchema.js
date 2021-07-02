import VueFormGenerator from 'vue-form-generator'

export default {
  groups: [
    {
      legend: 'Información personal',
      fields: [
        {
          type: 'input',
          inputType: 'text',
          label: 'Nombre(s)',
          model: 'first_name',
          placeholder: 'Nombre(s)',
          required: true,
          validator: ['string', 'required']
        },
        {
          type: 'input',
          inputType: 'text',
          label: 'Apellido(s)',
          model: 'last_name',
          placeholder: 'Apellido(s)',
          required: true,
          validator: ['string', 'required']
        },
        {
          type: 'input',
          inputType: 'email',
          label: 'Correo electronico',
          model: 'email',
          placeholder: 'Correo electronico',
          required: true,
          validator: VueFormGenerator.validators.email
        },
        {
          type: 'select',
          label: 'Verificar e-mail',
          model: 'status',
          values: [
            {id: '0', name: 'Verificar'},
            {id: 'disable', name: 'No Verificar'}
          ],
          selectOptions: {
            noneSelectedText: 'Selecciona uno'
          },
          required: true,
          validator: ['string', 'required']
        },
        {
          type: 'select',
          label: 'Estatus',
          model: 'status',
          selectedValue: 'Activo',
          values: [
            {id: 'active', name: 'Activo', selected: 'selected'},
            {id: 'disable', name: 'Inactivo'}
          ],
          selectOptions: {
            selectedValue: 'Activo',
            noneSelectedText: 'Selecciona uno'
          },
          required: true,
          validator: ['string', 'required']
        }
      ]
    },
    {
      legend: 'Acciones',
      fields: [
        {
          type: 'checklist',
          label: 'Agregar grupo(s)',
          model: 'groups',
          multi: true,
          required: true,
          multiSelect: true,
          values: ['Javascript', 'AngularJS', 'ReactJS', 'VueJS']
        },
        {
          type: 'checklist',
          label: 'Acciones después del login',
          model: 'actions',
          multi: true,
          required: true,
          multiSelect: true,
          values: ['Javascript', 'AngularJS', 'ReactJS', 'VueJS']
        }
      ]
    },
    {
      legend: 'Credenciales',
      fields: [
        {
          type: 'input',
          inputType: 'text',
          label: 'Username',
          model: 'username',
          placeholder: 'Nombre de usuario',
          required: true,
          validator: ['string', 'required']
        },
        {
          type: 'input',
          inputType: 'password',
          label: 'Password',
          model: 'password',
          placeholder: 'Contraseña',
          required: true,
          validator: ['strongPassword', 'required']
        }
      ]
    }
  ]
}
