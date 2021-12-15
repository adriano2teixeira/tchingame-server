import axios from "axios";

const DokanApi = axios.create({ baseURL: "https://tchingame.com/wp-json/dokan/v1"})

export default DokanApi