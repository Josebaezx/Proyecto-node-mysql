const zod = require('zod')

const clienteSchema = zod.object({
  nombre: zod
    .string({
      invalid_type_error: '',
      required_error: ''
    }),
  apellido: zod
    .string(),
  direccion: zod
    .string(),
  telefono: zod
    .number()
    .int()
    .positive()
    .min(999999)
    .max(9999999999),
  email: zod
    .string()
    .min(1, { message: 'This field has to be filled.' })
    .email('This is not a valid email.'),
  nacimiento: zod
    .date(),
  preferencias: zod
    .array(zod
      .enum(['WIKSKY', 'VINO', 'CERVEZA', 'LICOR']), {
      required_error: 'Preferencias es requerido.',
      invalid_type_error:
      'La preferencia debe ser un array de Enums Preferencias'
    })
})

function validateClientes (object) {
  return clienteSchema.safeParse(object)
}

module.exports = {
  validateClientes
}

//   const {
//     nombre,
//     apellido,
//     direccion,
//     telefono,
//     email,
//     nacimiento,
//     preferencias,
//   } = req.body;
