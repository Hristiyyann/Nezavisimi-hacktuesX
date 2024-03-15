import Navbar from "components/Navbar/Navbar";

type NavbarContextProps = {
    children: JSX.Element;
}

function NavbarContext({ children }: NavbarContextProps) {
    return (
        <div style = {{ display: 'flex', flexDirection: 'column' }}>
            <Navbar/>

            {children}
        </div>
    )
}

export default NavbarContext;