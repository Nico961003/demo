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
        }
      ]
    },
    {
      legend: 'Caracteristicas',
      fields: [
        {
          type: 'checklist',
          label: 'Agregar rol(es)',
          model: 'roles',
          multi: true,
          required: true,
          listBox: false,
          values: [
            {
              name: 'HTML5',
              value: 'HTML5-123'
            },
            {
              name: 'Javascript',
              value: 'Javascript-123'
            },
            {
              name: 'CSS3',
              value: 'CSS3-123'
            },
            {
              name: 'CoffeeScript',
              value: 'CoffeeScript-123'
            },
            {
              name: 'AngularJS',
              value: 'AngularJS-123'
            },
            {
              name: 'ReactJS',
              value: 'ReactJS-123'
            },
            {
              name: 'VueJS',
              value: 'VueJS-123'
            }
          ]
        },
        {
          type: 'checklist',
          label: 'Estatus',
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
