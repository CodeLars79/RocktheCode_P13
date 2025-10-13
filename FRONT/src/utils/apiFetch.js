const BASE_URL = 'http://localhost:3000/api/v1'

export const apiFetch = async (endpoint, options = {}, token = null) => {
  const isFormData = options.body instanceof FormData

  const headers = {
    ...(options.headers || {}),
    ...(token ? { Authorization: `Bearer ${token}` } : {}),

    ...(!isFormData ? { 'Content-Type': 'application/json' } : {})
  }

  const url = `${BASE_URL}${endpoint}`

  try {
    const response = await fetch(url, { ...options, headers })

    if (!response.ok) {
      let errorMessage = 'An error occurred'
      try {
        const errorData = await response.json()
        errorMessage = errorData.message || errorMessage
      } catch {
        errorMessage = await response.text()
      }
      throw new Error(errorMessage)
    }

    const contentType = response.headers.get('content-type')
    if (contentType && contentType.includes('application/json')) {
      return response.json()
    }
    return response.text()
  } catch (error) {
    console.error('Fetch error:', error)
    throw error
  }
}
