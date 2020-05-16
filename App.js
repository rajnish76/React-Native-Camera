import {createAppContainer} from 'react-navigation';
import {createStackNavigator} from 'react-navigation-stack';
import cameraScreen from './screens/cameraScreen';
import images from './screens/images';

const App = createStackNavigator({
  cameraScreen,
  images,
});
export default createAppContainer(App);
