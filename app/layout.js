
import Member from '../components/Membership'
import Navbar from '../components/Navbar'
import {LoanApplicationForm} from '../components/Form'


export default function RootLayout() {
  return (
    <html lang="en">
      <body>
        <Navbar />
        <Member />
    
      </body>
   
    </html>
  );
}