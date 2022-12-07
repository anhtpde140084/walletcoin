import Axios from "axios";

export const getProfile = async (setUser, id) => {
    try {
        const res = await Axios.get(
            `${process.env.REACT_APP_BASE_URL}/api/v1/user/${id}`
        );
        const newArr = [];
        newArr.push(res.data.data)
        if (res) {
            setUser(newArr);
        }
    } catch (error) {
        console.log(error);
    }
};