const API_BASE_URL = import.meta.env.PROD 
    ? window.location.origin 
    : 'http://localhost:4000'

export { API_BASE_URL }