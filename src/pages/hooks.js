import { useEffect, useState } from "react"
import { getUserInfo } from '../api';

const useUserInfo = (userName) => {
    const [userInfo, setUserInfo] = useState({})
    const sendReq = () => {
        getUserInfo({userName}).then((res) => {
            if (res.code === '200') {
                setUserInfo(res.data)
            }
        })
    }
    useEffect(() => {
        sendReq()
    }, [userName])
    return [userInfo]
}

export default useUserInfo;
