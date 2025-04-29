import Navbar from '../components/Navbar'
import Member from '../components/Membership';  
// import Loan from '../components/Form'


export default function RootLayout() {
  return (
    <html lang="en">
      <body>
        <Navbar />
        <Member />
        {/* <Loan /> */}
    
      </body>
   
    </html>
  );
}