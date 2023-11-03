import '../src/Assets/Styles/App.css';
import { BrowserRouter, Route } from 'react-router-dom';
import Home from './Pages/Home';
import Home2 from './Pages/Home2';
import Addmovie from './Components/Movie/Addmovie';
import Allmovies from './Components/Movie/Allmovies';
import AddHall from './Components/Hall/AddHall';
import ViewOne from './Components/Movie/ViewOne';
import Addshow from './Components/Show/Addshow';
import Booking from './Components/Show/Booking';
import Qr from './Components/Qr/Qr';
import QrRead from './Components/Qr/QrRead';
import Cart from './Components/Show/Cart';
import Login from './Components/User/login';
import Register from './Components/User/register';
import Profile from './Components/User/profile';
import Mybookings from './Components/User/Mybookings';
import AdminLogin from './Components/Admin/AdminLogin';
import AdminDashboard from './Components/Admin/AdminDashboard';
import AllMovies from './Components/Admin/AllMovies';
import AllHalls from './Components/Admin/AllHalls';
import AllShows from './Components/Admin/AllShows';
import EditShow from './Components/Admin/EditShow';
import EditMovie from './Components/Admin/EditMovie';
import EditHall from './Components/Admin/EditHall';
import Allusers from './Components/Admin/Allusers';
import AllBookings from './Components/Admin/AllBookings';
import Update from './Components/User/update';
import AddCategory from './Components/Admin/AllCategory';
import AllCategory from './Components/Admin/AllCategory';
import Addcategories from './Components/Admin/Addcategories';
import Addadmin from './Components/Admin/Addadmin';
import Adduser from './Components/Admin/Adduser';
import Adminprofile from './Components/Admin/Adminprofile';
import AdminEdit from './Components/Admin/AdminEdit';
import { GoogleOAuthProvider } from '@react-oauth/google';

function App() {
  return (
    <GoogleOAuthProvider clientId="887186048227-e660fitjd4931igsu0sbbdhjt2e5b6dr.apps.googleusercontent.com">
      <BrowserRouter>
        <Route path='/' exact component={Home} />
        <Route path='/home' exact component={Home2} />
        <Route path='/addmovie' exact component={Addmovie} />
        <Route path='/all' exact component={Allmovies} />
        <Route path='/addhall' exact component={AddHall} />
        <Route path='/view/:id' exact component={ViewOne} />
        <Route path='/addshow' exact component={Addshow} />
        <Route path='/booking/:id' exact component={Booking} />
        <Route path='/qr' exact component={Qr} />
        <Route path='/qrread' exact component={QrRead} />
        <Route path='/cart' exact component={Cart} />
        <Route path='/login' exact component={Login} />
        <Route path='/register' exact component={Register} />
        <Route path='/profile' exact component={Profile} />
        <Route path='/mybookings' exact component={Mybookings} />
        <Route path='/updateuser/:id' exact component={Update} />

        <Route path='/admin' exact component={AdminLogin} />
        <Route path='/dashboard' exact component={AdminDashboard} />
        <Route path='/allmovies' exact component={AllMovies} />
        <Route path='/allhalls' exact component={AllHalls} />
        <Route path='/allshow' exact component={AllShows} />
        <Route path='/updateshow/:id' exact component={EditShow} />
        <Route path='/updatemovie/:id' exact component={EditMovie} />
        <Route path='/updatehall/:id' exact component={EditHall} />
        <Route path='/users' exact component={Allusers} />
        <Route path='/bookings' exact component={AllBookings} />
        <Route path='/addcategory' exact component={Addcategories} />
        <Route path='/allcategory' exact component={AllCategory} />
        <Route path='/addadmin' exact component={Addadmin} />
        <Route path='/adduser' exact component={Adduser} />
        <Route path='/aprofile' exact component={Adminprofile} />
        <Route path='/adedit/:id' exact component={AdminEdit} />



      </BrowserRouter>
    </GoogleOAuthProvider>

  );
}

export default App;
