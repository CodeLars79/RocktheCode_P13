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
    <input
      type={type}
      className={error ? 'error-field' : ''}
      {...register(name || label.toLowerCase(), required)}
    />
    {error && <p className='error'>{error.message}</p>}
  </>
)

export const SelectInput = ({ label, register, options, required, error }) => (
  <>
    <label>{label}</label>
    <select
      className={error ? 'error-field' : ''}
      {...register(label.toLowerCase(), required)}
    >
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
      className={error ? 'error-field' : ''}
      {...register(label.toLowerCase(), required)}
    />
    {error && <p className='error'>{error.message}</p>}
  </>
)
