import '../../pages/AdminDashboard/AdminDashboard.css'

export const TextInput = ({
  label,
  name,
  register,
  required,
  type = 'text',
  error
}) => (
  <>
    <label>{label}</label>
    <input type={type} {...register(name || label.toLowerCase(), required)} />
    {error && <p className='error'>{error.message}</p>}
  </>
)

export const SelectInput = ({ label, register, options, error }) => (
  <>
    <label>{label}</label>
    <select {...register(label.toLowerCase())}>
      <option value=''>Select {label.toLowerCase()}</option>
      {options.map((opt) => (
        <option key={opt} value={opt}>
          {opt}
        </option>
      ))}
    </select>
    {error && <p className='error'>{error.message}</p>}
  </>
)

export const FileInput = ({ label, register, required, error }) => (
  <>
    <label>{label}</label>
    <input
      type='file'
      accept='image/*'
      {...register(label.toLowerCase(), required)}
    />
    {error && <p className='error'>{error.message}</p>}
  </>
)
