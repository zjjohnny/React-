import { makeAutoObservable } from "mobx"
import commodityData from './commodity'
import NavbarData from "./NavbarData"
const store = () => { 
    return makeAutoObservable({
        commodityData,NavbarData
    })
    
}
export default store();