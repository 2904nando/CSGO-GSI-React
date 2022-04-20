async function Fetch(resource, options = {}) {

    const response = await fetch(resource)

    const responseJson = await response.json()

    return responseJson
  }

  export default Fetch;