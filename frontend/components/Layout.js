import Header from './Header'

const Layout = ({children}) =>{
      return(
            <>
                  <Header/>
                        {children}
                  <h6>Footer</h6>

            </>
      )
}
export default Layout