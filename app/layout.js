
import Member from '../components/Membership'
import Navbar from '../components/Navbar'


export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <Navbar />
        <Member />
        { children }
    
      </body>
    </html>
  );
}