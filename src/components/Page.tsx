import { SideBar } from "./index"
import RoutePage from "./RoutePage"

function Page({isShow}:{isShow: boolean}) {

    return (
        <main className="flex">
            <SideBar isShow={isShow} />
            <RoutePage isShow={isShow} />
        </main>
    )
}

export default Page