import config from '~/config';
import CreateRoom from '~/page/CreateRoom/CreateRoom';
import Home from '~/page/Home/Home';
import Room from '~/page/Room/Room';
import RoomList from '~/page/RoomList/RoomList';
import SignIn from '~/page/SignIn/SignIn';
import SignUp from '~/page/SignUp/SignUp';
import User from '~/page/User/User';
import Exam from '~/page/Exam/Exam';

const publicRoutes = [
    { path: config.routes.home, component: Home },
    { path: config.routes.signIn, component: SignIn },
    { path: config.routes.signUp, component: SignUp },
    { path: config.routes.createRoom, component: CreateRoom },
    { path: config.routes.room, component: Room },
    { path: config.routes.user, component: User },
    { path: config.routes.roomList, component: RoomList },
    { path: config.routes.exam, component: Exam },
];
const privateRoutes = [];
export { publicRoutes, privateRoutes };
