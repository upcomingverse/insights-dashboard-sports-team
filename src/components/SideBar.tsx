import { Link, useLocation } from "react-router-dom"
import { LayoutDashboard, Archive } from "lucide-react"

const routes = [
  {
    name: 'Dashboard',
    route: '/dashboard',
    icon: LayoutDashboard,
    iconProps: { size: 20, color: '#003049' }
  },
  {
    name: 'Vendors',
    route: '/vendors',
    icon: Archive,
    iconProps: { size: 20, color: '#003049' }
  },
  // {
  //   name: 'Products',
  //   route: '/products',
  //   icon: Archive,
  //   iconProps: { size: 20, color: '#003049' }
  // }
]

function handlePath(path: string) {
  switch (path) {
    case '/': return '';
    case '/dashboard': return 'Dashboard';
    case '/vendors': return 'Vendors';
    case '/products': return 'Products';
    default: return '';

  }
}

function SideBar({ isShow }: { isShow: boolean }) {
  const location = useLocation();

  return (
    <aside className={`${isShow ? 'w-[5%]' : 'w-[20%]'} min-w-[70px] bg-white shadow-md h-[100vh] duration-75`}>
      <ul>
        {routes.map((item, key) => <li
          className={`mb-8 p-4 rounded-sm ${handlePath(location.pathname) == item.name && 'bg-[#a8dadc]'}`}
          key={key}>
          <Link className="flex items-center gap-4 duration-75 hover:-translate-y-1"
            to={item.route}>
                <span className=" w-[40px] h-[40px] grid place-content-center ">{item.icon ? <item.icon {...item.iconProps} /> : ''}</span> <span className="font-bold max-[500px]:hidden">{!isShow && item.name}</span>
          </Link>
        </li>)}
      </ul>
    </aside>
  )
}

export default SideBar