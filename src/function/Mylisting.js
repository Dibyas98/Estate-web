import axios from "axios";
import { apicall } from "./apiweb";

export const FetchApi = async () => {
    try {
        const tok = JSON.parse(localStorage.getItem('persist:root'))
        const response = await axios.get(`${apicall}api/listing`,
            {

                headers: {
                    access_token: JSON.parse(tok.user).currentUser.token
                }
            }
        )
        return await response.data.list
    } catch (error) {
        console.log(error);
    }
}